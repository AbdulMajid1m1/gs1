import React from 'react'
import SideBar from '../sidebar/page'

const page = () => {
  return (
    <div>
        <SideBar />
        <div className="p-3 h-full sm:ml-72">
            Dashboard
        </div>
    </div>
  )
}

export default page