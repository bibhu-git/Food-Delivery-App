import React from 'react'
import Navbar from './Components/Navbar'
import Slidebar from './Components/Slidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
          <Slidebar />
        <div className='w-[80%] overflow-y-scroll'>
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/' element={<Order />} />
          </Routes>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
