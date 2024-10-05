import React, { useState } from 'react'
import ExploreMenu from '../Components/ExploreMenu'
import FoodDisplay from '../Components/FoodDisplay.jsx'
import Header from '../Components/Header.jsx'
import AppDownload from '../Components/AppDownload.jsx'

const Home = () => {
    const [category,setCategory] = useState("All");
    return (
        <div id='home'>
            <div className='px-14 lg:px-24'>
                <Header/>
                <ExploreMenu category={category} setCategory={setCategory}/>
                <FoodDisplay category={category}/>
                <AppDownload/>
            </div>
        </div>
    )
}

export default Home
