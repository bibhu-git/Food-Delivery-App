import React, { useState } from 'react'
import { menu_list } from '../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
    
    return (
        <div id='menu' className='py-6 space-y-4'>
            <h2 className='text-3xl font-semibold'>Explore our menu</h2>
            <p className='w-full lg:w-3/4'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your varvins and elevate your dining experience. One delicious meal at a time.</p>
            <div className='flex gap-3 justify-between overflow-x-auto'>
                {menu_list.map((item, index) => (
                    <div key={index} onClick={() => setCategory((prev) => prev === item.menu_name ? "All" : item.menu_name)} >
                        <img className={`w-24 ${category === item.menu_name ? 'border-4 rounded-full border-orange-500' : ''}`} src={item.menu_image} alt="" />
                        <p className='text-center'>{item.menu_name}</p>
                    </div>
                ))

                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
