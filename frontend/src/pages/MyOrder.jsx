import React, { useContext, useEffect, useState } from 'react';
import { storeContext } from '../Components/StoreContextProvider';
import axios from 'axios';
import { assets } from '../assets/assets';
const MyOrder = () => {
  const { token, url } = useContext(storeContext);
  const [data, setData] = useState([])
  const fetchOrder = async () => {
    try {

      if (token && url) {
        const response = await axios.get(`${url}/api/order/orders`, { headers: { token } });
        console.log(response.data)
        if (response.data.success) {
          setData(response.data.data)
        }
        else {
          console.log("Error in fetching data " + response.data.messaage)
        }

      } else {
        console.error('Token or URL is missing');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const trackOrder = async () => {
    await fetchOrder();
  }

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return <div className='my-10 mx-20 space-y-2'>
    {data.map((order, index) => (
      <div className='order-display border border-orange-500 px-4' key={index}>
        <img src={assets.parcel_icon} alt="" />
        <p>{order.items.map((food, index) => {
          if (index === order.items.length - 1) {
            return  food.name + "x" + food.quantity
          }
          else{
            return  food.name + "x" + food.quantity + ","
          }
        })

        }</p>
        <p>${order.amount}.00</p>
        <p>items:{order.items.length}</p>
        <p ><span className='text-orange-500 mx-1'>&#x25cf;</span>{order.status}</p>
        <button onClick={fetchOrder} className='w-28 py-2 px-3  bg-red-300 rounded-md'>Track Order</button>
      </div>
    ))

    }
  </div>;
};

export default MyOrder;
