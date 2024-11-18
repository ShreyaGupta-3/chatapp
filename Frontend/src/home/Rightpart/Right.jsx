import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend';
import useConversation from '../../zustand/useConversation.js';
import { CiMenuFries} from "react-icons/ci";
import { useAuth } from './../../context/AuthProvider.jsx';

function right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null)
  }, [setSelectedConversation])
  return (
    <>
      <div className=' bg-slate-900 text-gray-300 w-full'>
        <div>
          {!selectedConversation ? (<NoChatSelected />) : (<>
            <Chatuser />
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(92vh - 8vh)" }}>
              <Messages />
            </div>
            <Typesend />

          </>)}
        </div>
      </div>


    </>
  )
}

export default right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="relative">
        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden absolute left-5">
          <CiMenuFries className="text-white text-xl"/>
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">  Welcome {" "}<span className="font-semibold text-xl">{authUser.user.fullname}</span><br />
            No Chat selected, please start conversation by selecting anyone to your contacts
          </h1>
        </div>
      </div>
    </>
  )
}