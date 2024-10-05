import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify';
const Add = () => {
 const url = 'http://localhost:3000'
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [image,setImage] = useState(false);
  const OnSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name',data.name)
    formData.append('description',data.description)
    formData.append('category',data.category)
    formData.append('price',data.price)
    formData.append('image',image)
    try {
      const response = await axios.post(url+'/api/food/add',formData)
      toast.success("Food Added")
      reset();
      setImage(false);
    } catch (error) {
      console.log("Error in addFood "+error)
      toast.error("Error")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(OnSubmit)} className='py-4 px-8 flex flex-col gap-4'>
      <div>
        <span className='font-semibold'>Upload Image</span>
        <label htmlFor="image">
        <img className='w-44 mt-1' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
        </label>
        <input type="file" id='image' hidden required onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      <div>
        <p>Product name</p>
        <input {...register('name')} required className='border outline-none py-1 mt-1 px-2 w-64 rounded-sm' type="text" placeholder='Type here'/>
      </div>
      <div>
        <p>Product description</p>
        <textarea {...register('description')} required className='border outline-none mt-1 h-28 w-64 resize-none' placeholder='Write content here'></textarea>
      </div>
      <div className='flex gap-5'>
        <div>
          <p>Product Category</p>
          <select {...register('category')} className='border py-1 px-2 mt-1'>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desert">Desert</option>
            <option value="Sandwitch">Sandwitch</option>
            <option value="Cake">Cake</option>
            <option value="PureVeg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div>
          <p>Product Price</p>
          <input required {...register('price')} className='border py-1 px-2 mt-1 outline-none' type="text" placeholder='$20'/>
        </div>
      </div>
      <button className='bg-black w-32 rounded-lg text-white font-semibold py-2 px-4'>Add</button>
      </form>
      
    </div>
  )
}

export default Add
