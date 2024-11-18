import createTokenAndSaveCookie from "../jwt/generateToken.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "User already registered" });
        }

        // const saltRound = 10;
        // const salt = bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password, 10)

        const createdUser = await new User({
            fullname: fullname, email: email, password: hashPassword,
        })
        await createdUser.save();
        if (createdUser) {
            createTokenAndSaveCookie(createdUser._id, res);
            res.status(201).json({
                message: "User created successfully", user: {
                    _id: createdUser._id,
                    fullname: createdUser.fullname,
                    email: createdUser.email,

                }
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ error: "Invalid user credential" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,

            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
};

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUser },
        }).select("-password");
        return res.status(201).json(filteredUsers);
    } catch (error) {
        console.log("Error in allUsers controller:" + error);

    }
};