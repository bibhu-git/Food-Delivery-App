import React, { useContext,useEffect } from 'react'
import { storeContext } from '../Components/StoreContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Cart = () => {
    const { food_list, cartData, removeFromCart, getTotalCartAmount,url } = useContext(storeContext);
    const navigate = useNavigate();
    useEffect(() => {
        
        if (Object.keys(cartData).length === 0) {
            toast.info('Cart is empty');
            navigate('/');
        }
    }, [cartData]);
    return (
        <div className='min-h-96 py-20 px-24'>
            <div className='cart-item-title text-gray-400 my-4'>
                <span>Items</span>
                <span>Title</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Remove</span>
            </div>
            <div className='pt-4'>
                {food_list.map((item, index) => (
                    cartData[item._id] > 0 && <div key={index}>
                        <hr />
                        <div className='cart-item-title my-2'>
                            <img className='w-10' src={`${url}/image/${item.image}`} alt="" />
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <span>{cartData[item._id]}</span>
                            <span>{item.price * cartData[item._id]}</span>
                            <span className='cursor-pointer' onClick={() => removeFromCart(item._id)}>x</span>
                        </div>
                        <hr />
                    </div>
                ))

                }
            </div>
            <div className='my-14 mt-20 flex justify-between items-center flex-wrap-reverse gap-5'>
                <div className='w-1/2 space-y-2'>
                    <h2 className='text-2xl font-semibold my-2'>Cart Totals</h2>
                    <div className='flex justify-between'>
                        <p>Subtotal</p>
                        <span>${getTotalCartAmount()}</span>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Delivery Fee</p>
                        <span>$2</span>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p className='font-semibold text-lg'>Total</p>
                        <span>${getTotalCartAmount() + 2}</span>
                    </div>
                    <div className='pt-2'>
                    <Link to={'/order'} className='py-2 px-4 rounded-sm bg-orange-500 text-white'>PROCEED TO CHECKOUT</Link>
                    </div>
                </div>
                <div>
                    <p className='text-lg'>If you have a promo code. Enter it here </p>
                    <div className='flex gap-2 mt-2'>
                        <input className='border p-2 w-72' type="text" placeholder='promo code' />
                        <button className='p-2 text-white bg-black'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
