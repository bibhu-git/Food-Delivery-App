import React, { useContext, useState } from 'react'
import { assets } from '../../../../FoodDelivery/Frontend/src/assets/assets'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { storeContext } from './StoreContextProvider'
import {toast} from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const [inputType, setInputType] = useState('Login');
    const {url,setToken} = useContext(storeContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();
    
    const OnLoginSubmit = async (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }
            const response = await axios.post(url+'/api/user/login',userInfo);
            console.log(response.data);
            if(response.data.success)
            {
                setShowLogin(false);
                toast.success("Login Successful")
                localStorage.setItem('token',response.data.token)
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("Error in login " +error)
        }
    }
    const OnSignupSubmit = async (data) => {
        try {
            const userInfo = {
                username: data.name,
                email: data.email,
                password: data.password
            }
            const response = await axios.post(url+'/api/user/signup',userInfo);
            if(response.data.success)
            {
                setShowLogin(false);
                toast.success("Signup Successful")
                localStorage.setItem('token',response.data.token)
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("Error in Signup " +error)
        }
    }
    return (
        <div className='absolute w-screen h-screen flex items-center justify-center'>
            <div className='w-80 relative max-h-96 min-h-72 rounded-lg bg-white text-center'>
                <h2 className='text-2xl font-semibold mt-2'>{inputType == 'Login' ? 'Login' : 'Sign up'}</h2>
                <img onClick={() => setShowLogin(false)} className='absolute cursor-pointer right-4 top-4' src={assets.cross_icon} alt="" />
                <form onSubmit={handleSubmit(inputType === 'Login' ? OnLoginSubmit : OnSignupSubmit )} className='my-6'>
                    <div className='space-y-4'>
                        {inputType == "Login" ? '' : <input {...register('name')} required type="text" className='border rounded-lg py-2 px-3 w-[85%] outline-none' placeholder='Your name' />}
                        <input {...register('email')} type="text" required className='border rounded-lg py-2 px-3 w-[85%] outline-none' placeholder='Your email' />
                        <input {...register('password')} type="text" required className='border rounded-lg py-2 px-3 w-[85%] outline-none' placeholder='Password' />
                    </div>
                    <button className='py-1 my-4 w-[85%] bg-orange-500 text-white rounded-lg'>{inputType == 'Login' ? 'Login' : 'Create account'}</button>
                    {inputType == 'Login' ? ''
                        : <div className='text-left flex items-center gap-2 px-4 my-2'>
                            <input required type="checkbox" />
                            <span className='text-sm'>By continuing, i agree to the terms of use & privacy policy.</span>
                        </div>
                    }
                    <p>{inputType == 'Login' ? 'Create a new account?' : 'Already have an account?'}
                        {inputType == 'Login'
                            ? <span onClick={() => setInputType('Signup')} className='font-semibold text-blue-500 cursor-pointer'>Click here</span>
                            : <span onClick={() => setInputType('Login')} className='font-semibold text-blue-500 cursor-pointer'>Login here</span>
                        }
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPopup
