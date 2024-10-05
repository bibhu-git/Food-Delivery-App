import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'

const Order = () => {
  const url = 'http://localhost:3000'
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setData(response.data.data);
    }
    else {
      alert("Error")
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const statusHandler = async (e,orderId) => {
    const status = e.target.value;
    const response = await axios.post(url+'/api/order/status',{status,orderId});
    if(response.data.success)
    {
      await fetchData();
    }
  }
  
  return (
    <div className='my-4 mx-10'>
      <p className='text-xl font-semibold my-3'>Order Page</p>
      <div className='flex flex-col gap-4'>
        {data.map((order, index) => {
          return <div className='list-order  py-2 px-5' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='font-semibold'>{order.items.map((item, index) => {
                if (index == order.items.length -1) {
                  return item.name + "x" + item.quantity
                }
                else {
                  return item.name + "x" + item.quantity + ","
                }
              })
              }
              </p>
              <p className='my-1'>{order.address.firstname + " " + order.address.lastname}</p>
              <p>{order.address.street},</p>
              <p>{order.address.city + "," + order.address.state + "," + order.address.country + ","}</p>
              <p>{order.address.zipcode},</p>
              <p>{order.address.phone}</p>

            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>

            <select onChange={(e) => statusHandler(e,order._id)} value={order.status} className='border outline-none border-orange-500 bg-red-200 p-1'>
              <option>Food Processing</option>
              <option>Out For Delivery</option>
              <option>Delivered</option>
            </select>

          </div>
        })}
      </div>
    </div>
  )
}

export default Order
