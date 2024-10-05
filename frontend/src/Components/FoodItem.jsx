import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { storeContext } from './StoreContextProvider';

const FoodItem = ({ id, category, description, image, name, price }) => {
    
    const {addToCart,removeFromCart,cartData,url} = useContext(storeContext);

    return (
        <div className='shadow-md rounded-xl'>
           <div className='relative'>
           <img src={`${url}/image/${image}`} alt="" />
           {!cartData[id] ?  <img onClick={() => addToCart(id)} className='absolute bottom-3 right-3' src={assets.add_icon_white} alt="" />
           : <div className='flex gap-3 items-center bg-white rounded-full p-2 absolute bottom-3 right-3'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <span className='font-semibold'>{cartData[id]}</span>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>

           }
           </div>
            <div className='p-3 space-y-3'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl'>{name}</h3>
                    <img className='h-5 w-16' src={assets.rating_starts} alt="" />
                </div>
                <p>{description}</p>
                <span className='font-semibold text-xl text-orange-500'>${price}</span>
            </div>
        </div>
    )
}

export default FoodItem
