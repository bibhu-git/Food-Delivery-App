import React from 'react'
import { assets } from '../assets/assets' 
const Navbar = () => {
  return (
    <div className='h-16 px-10 flex justify-between items-center border-b'>
      <img className='h-14' src={assets.logo} alt="" />
      <img className='h-10' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
