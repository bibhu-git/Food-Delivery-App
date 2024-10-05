import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div id='mobileApp' className='w-[70%] lg:w-[40%] m-auto my-28'>
      <h2 className='text-center text-4xl font-semibold'>For Better Experience Download Tomato App</h2>
      <div className='flex gap-3 mt-5 justify-center'>
        <img className='h-10' src={assets.play_store} alt="" />
        <img className='h-10' src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
