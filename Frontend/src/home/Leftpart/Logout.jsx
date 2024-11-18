import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi"
import axios from 'axios';
import Cookies from "js-cookie"
import toast from 'react-hot-toast';

function Logout() {
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatNow");
      Cookies.remove("jwt")
      setLoading(false)
      toast.success("Logged out successfully")
      window.location.reload();
    } catch (error) {
      console.log("Error in loading", error);
      toast.error("Error in logged out")
    }
  }
  return (
    <>
      <div className="h-[10vh]">

        <BiLogOutCircle className='text-5xl ml-2 mt-1 p-2 text-white hover:bg-slate-700 rounded-full duration-300 cursor-pointer' onClick={handleLogout} />

      </div>
    </>
  )
}

export default Logout