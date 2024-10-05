import React, { useContext } from 'react'
import { storeContext } from '../Components/StoreContextProvider'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const PlaceOrder = () => {
    const { getTotalCartAmount, cartData, food_list, url, token } = useContext(storeContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const OnSubmit = async (data) => {
        console.log(token)
        let orderItem = [];
        let orderData;
        food_list.map((item) => {
            if (cartData[item._id] > 0) {
                const itemInfo = item;
                itemInfo['quantity'] = cartData[item._id]
                orderItem.push(itemInfo)
            }
            orderData = {
                address: data,
                items: orderItem,
                amount: getTotalCartAmount()
            }
        })
        const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
        console.log(response.data);
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(OnSubmit)} className='my-20 mx-14 flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl my-4 font-semibold'>Delivery Information</h2>
                    <div className='space-y-2'>
                        <div className='flex gap-2'>
                            <input {...register('firstname')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='First name' />
                            <input {...register('lastname')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='Last name' />
                        </div>
                        <input {...register('email')} required className='border rounded-md w-full p-2 focus:outline-none' type="text" placeholder='Email address' />
                        <input {...register('street')} required className='border rounded-md w-full p-2 focus:outline-none' type="text" placeholder='Street' />
                        <div className='flex gap-2'>
                            <input {...register('city')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='City' />
                            <input {...register('state')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='State' />
                        </div>
                        <div className='flex gap-2'>
                            <input {...register('zipcode')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='Zip code' />
                            <input {...register('country')} required className='border rounded-md p-2 focus:outline-none' type="text" placeholder='Country' />
                        </div>
                        <input {...register('phone')} required className='border w-full rounded-md p-2 focus:outline-none' type="text" placeholder='Phone' />
                    </div>
                </div>
                <div className='w-1/3 space-y-2'>
                    <h2 className='text-2xl font-semibold'>Cart Totals</h2>
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
                        <p className='font-semibold'>Total</p>
                        <span>${getTotalCartAmount() + 2}</span>
                    </div>
                    <div>
                        <button className='py-2 px-4 rounded-sm bg-orange-500 text-white'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PlaceOrder
