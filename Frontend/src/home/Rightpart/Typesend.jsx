import React, { useState } from 'react'
import { IoSend } from "react-icons/io5"
import useSendMessage from '../../context/useSendMessage.js'

function Typesend() {
  const [message,setMessage]=useState("")
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit=async(e)=>{
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="flex h-[8vh]  bg-gray-800">
        <div className="w-[70%] mx-4">
          <input type="text" placeholder="Type here" 
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className=" rounded-md outline-none px-4 py-2 mt-2 w-full bg-slate-700" />
        </div>
        <button>
          <IoSend className="text-5xl p-2 hover:bg-slate-700 rounded-full duration-300 cursor-pointer" />
        </button>
      </div>
      </form>
    </>
  )
}

export default Typesend