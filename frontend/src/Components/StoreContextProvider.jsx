import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

export const storeContext = createContext();

const StoreContextProvider = (props) => {
  const [cartData, setCartData] = useState({});
  const url = 'http://localhost:3000';
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
          await loadCartData(savedToken);
        }
        await fetchFoodList();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []); // Removed `token` dependency

  const addToCart = useCallback(async (itemId) => {
    setCartData((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        const response = await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        console.log(response.data);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  }, [token]);

  const removeFromCart = useCallback(async (itemId) => {
    setCartData((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 0),
    }));

    if (token) {
      try {
        const response = await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        console.log(response.data);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  }, [token]);

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + '/api/cart/get', { headers: { token } });
      if (response.data.success) {
        setCartData(response.data.cartData);
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartData) {
      if (cartData[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartData[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + '/api/food/list');
      if (response.data.success) {
        setFoodList(response.data.foodList);
      }
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  // Memoizing context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    cartData,
    url,
    token,
    setToken
  }), [food_list, cartData, token]);

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
