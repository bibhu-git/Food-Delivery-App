import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
const List = () => {
  const url = 'http://localhost:3000'
  const [data, setData] = useState([]);
  const LoadData = async () => {
    try {
      const response = await axios.get(url + '/api/food/list')
      if (response.data.success) {
        setData(response.data.foodList)
      }
      else {
        alert("Error in fetching foodlist")
      }
    } catch (error) {
      console.log("Error in loadData " + error)
    }
  }
  const removeFood = async (id) => {
    const response = await axios.post(url+'/api/food/remove',{id});
    if(response.data.success)
    {
      toast.success("Food removed")
    }
    else{
      toast.error("Error")
    }
    LoadData();
  }
  useEffect(() => {
    LoadData();
  }, [])
  return (
    <div className='my-5 mx-10'>
      <p className='font-semibold my-3 text-xl'>All Food List</p>
      <div className='list-food p-2 text-gray-400'>
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span>Action</span>
      </div>
      <div>
        {data.map((item, index) => {
          return <div key={index} className='list-food border'>
            <img className='w-16 p-2' src={url + `/image/${item.image}`} alt="" />
            <span>{item.name}</span>
            <span>{item.category}</span>
            <span>{item.price}</span>
            <span className='cursor-pointer' onClick={() => removeFood(item._id)}>X</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default List
