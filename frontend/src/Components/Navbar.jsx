import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom';
import { storeContext } from './StoreContextProvider.jsx';
import {toast} from 'react-toastify'
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const {getTotalCartAmount,token,setToken} = useContext(storeContext);
  const Logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    toast.success("Logout Successful")
  }
  return (
    <div className='flex justify-between px-10 lg:px-20 h-16 items-center'>
      <div>
        <RouterLink to={'/'}><img className='w-32 lg:w-40' src={assets.logo} alt="" /></RouterLink>
      </div>
      <ul className='flex gap-5 lg:gap-8 font-semibold items-center'>
        <li className={`cursor-pointer p-px ${menu === 'home' ? 'border-b-2 border-black' : ''}`}><ScrollLink onClick={() => setMenu('home')} to='/home' duration={500} smooth={true}>home</ScrollLink></li>
        <li className={`cursor-pointer ${menu === 'menu' ? 'border-b-2 border-black' : ''}`}><ScrollLink onClick={() => setMenu('menu')} to='menu' duration={500} smooth={true}>menu</ScrollLink></li>
        <li className={`cursor-pointer ${menu === 'mobileApp' ? 'border-b-2 border-black' : ''}`}><ScrollLink onClick={() => setMenu('mobileApp')} to='mobileApp' duration={500} smooth={true}>mobile-app</ScrollLink></li>
        <li className={`cursor-pointer ${menu === 'contactUs' ? 'border-b-2 border-black' : ''}`}><ScrollLink onClick={() => setMenu('contactUs')} to='contactUs' duration={500} smooth={true}>contact us</ScrollLink></li>
      </ul>
      <div className='flex gap-5 lg:gap-7 items-center'>
        <img className='h-8' src={assets.search_icon} alt="" />
        <div className='relative'>
          <RouterLink to={'/cart'}><img className='h-8' src={assets.basket_icon} alt="" /></RouterLink>
          {getTotalCartAmount() !== 0
            ? <div className='h-3 w-3 bg-orange-500 rounded-full absolute top-[-7px] right-[-7px]'></div>
            : ''
          }
        </div>
        <div>
          {token
          ? <div className='relative group'>
            <img className='py-1' src={assets.profile_icon}/>
            <div className='bg-white hidden group-hover:flex absolute w-24 flex-col gap-2 border-2 border-orange-500 p-2'>
              <RouterLink to={'/myorder'} className='flex gap-1'>
                <img className='w-6' src={assets.bag_icon} alt="" />
                <span>Orders</span>
              </RouterLink>
              <hr />
              <div onClick={Logout} className='flex gap-1'>
                <img className='w-6' src={assets.logout_icon} alt="" />
                <span>Logout</span>
              </div>
            </div>
          </div>
          : <button onClick={() => setShowLogin(true)} className='py-2 px-4 rounded-2xl border hover:bg-orange-500 hover:text-white'>Sign in</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
