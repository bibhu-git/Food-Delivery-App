import React from 'react'
import { assets } from '../assets/assets'
import {NavLink} from 'react-router-dom'
const Slidebar = () => {
  return (
    <div className='w-[24%] lg:w-[18%] py-10 pl-5 lg:pl-14 h-[90vh] flex flex-col gap-3 border-2 border-l-0'>
      <NavLink to={'/add'}  className='flex gap-3 p-2 border'>
        <img src={assets.add_icon} alt="" />
        <span>Add Item</span>
      </NavLink>
      <NavLink to={'/list'} className='flex gap-3 p-2 border'>
        <img src={assets.order_icon} alt="" />
        <span>List Item</span>
      </NavLink>
      <NavLink to={'/'} className='flex gap-3 p-2 border'>
        <img src={assets.order_icon} alt="" />
        <span>Order</span>
      </NavLink>
    </div>
  )
}

export default Slidebar
