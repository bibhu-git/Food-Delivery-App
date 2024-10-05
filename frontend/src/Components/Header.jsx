import React from 'react'
import { Link } from 'react-scroll'
const Header = () => {
    return (
        <div className='h-[90vh] flex items-center'>
            <div className='h-[92%] text-white p-10 lg:p-14 flex items-end hero-img'>
                <div className='w-[50%] space-y-3 lg:space-y-5'>
                    <h1 className='text-5xl lg:text-6xl font-bold'>Order your favourite food here</h1>
                    <p className='text-[17px] lg:text-lg'>Choose from a divese menu featuring a delectable array of dishes crafted with the finest ingredients adn culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience. One delicious meal at a time.</p>
                    <div>
                        <Link to='menu' duration={500} smooth={true} className='py-2 cursor-pointer px-2 rounded-xl border w-28 hover:bg-orange-600'>View Menu</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
