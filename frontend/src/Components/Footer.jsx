import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='text-lg relative py-9 px-16 bg-[#1e293b] text-[#d1d5db] h-[27rem] lg:h-96 '>
            <div className='flex justify-between '>
                <div className='w-[40%] space-y-6'>
                    <img src={assets.logo} alt="" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae voluptatibus accusamus veritatis eveniet enim sed facilis earum. Deserunt totam dolor numquam, rem quaerat .
                    </p>
                    <div className='flex gap-3'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div >
                    <span className='text-xl font-semibold'>Company</span>
                    <ul className='space-y-2 mt-3'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <p>Privacy policy</p>
                    </ul>
                </div>
                <div >
                    <span className='text-xl font-semibold'>GET IN TOUCH</span>
                    <ul className='space-y-2 mt-3'>
                        <li>+1 222-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <div className='absolute bottom-3 left-0 right-0 mx-12'>
            <hr className='my-3'/>
            <p className='text-center'>Copyright 2024 @tomato.com - All Right Reserverd.</p>
            </div>
        </div>
    )
}

export default Footer
