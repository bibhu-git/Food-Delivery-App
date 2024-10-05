import React, { useContext } from 'react'
import FoodItem from './FoodItem'
import { storeContext } from './StoreContextProvider'

const FoodDisplay = ({ category }) => {
    const {food_list} = useContext(storeContext);
    return (
        <div>
            <h2 className='text-2xl font-semibold'>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => (
                    (category === "All" || category === item.category) && <div key={index}>
                        <FoodItem id={item._id} category={item.category} description={item.description} image={item.image} name={item.name} price={item.price} />
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default FoodDisplay
