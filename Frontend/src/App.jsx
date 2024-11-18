import React from 'react';
import Right from "./home/Rightpart/Right";
import Left from "./home/Leftpart/Left";
import Signup from './components/Signup';
import { useAuth } from './context/AuthProvider';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './components/Login';
import { Toaster } from "react-hot-toast";


function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (

    <>
      <Routes>
        <Route path="/" element={
          authUser ? (
            // <div className='flex h-screen'>
            //   <Left />
            //   <Right />
            // </div>
            <div className="drawer lg:drawer-open">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col items-center justify-center">
                <Right />
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-black text-base-content min-h-full w-80 ">
                  <Left />
                </ul>
              </div>
            </div>
          ) : (<Navigate to={"/login"} />
          )
        } />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App