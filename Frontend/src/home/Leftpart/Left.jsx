import React from 'react'
import Search from './Search';
import Users from './Users';
import Logout from './Logout'

function left() {
  return (
    <>
    <div className='bg-black text-gray-300 w-full'>
      <Search/>
      <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(84vh - 10vh"}}>
      <Users/>
      </div>
     
      <Logout/>
    </div>
    </>
  )
}

export default left