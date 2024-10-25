import React from 'react'
import Sidebar from '../components/Layout/Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <Outlet />
        
    </div>
  )
}

export default Body