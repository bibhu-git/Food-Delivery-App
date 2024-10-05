import React, { useContext, useEffect } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { storeContext } from '../Components/StoreContextProvider'

const Verify = () => {
    const {url} = useContext(storeContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const verifyPayment = async () => {
        const response = await axios.post(url+'/api/order/verify',{success,orderId})
        if(response.data.success)
        {
            navigate('/myorder')
        }
        else{
            alert("Error")
            navigate('/')
        }
    }
    useEffect(() => {
        verifyPayment();
    },[])
  return (
    <div className='h-96 flex items-center justify-center'>
      <div className='w-20 h-20 place-items-center border-b-2 border-black rounded-full animate-spin '>

      </div>
    </div>
  )
}

export default Verify
