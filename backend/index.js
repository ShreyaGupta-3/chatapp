import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import cors from "cors";
import { app, server } from './SocketIO/server.js';


dotenv.config();

// middlewares
app.use(cors());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// connect to mongodb
mongoose.connect("mongodb://0.0.0.0:27017/chatnow").then(e=> console.log("MongoDB Connected"))

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})