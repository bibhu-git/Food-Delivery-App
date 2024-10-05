import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './pages/Home.jsx'
import Footer from './Components/Footer.jsx'
import LoginPopup from './Components/LoginPopup.jsx'
import {Routes,Route} from 'react-router-dom'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify.jsx'
import MyOrder from './pages/MyOrder.jsx'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <div className='relative'>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : ''}
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App
