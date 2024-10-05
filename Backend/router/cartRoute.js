import express from 'express'
import { addToCart, getCartData, removeFromCart } from '../Controller/cartController.js';
import authMiddleware from '../Middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware, addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.get('/get',authMiddleware,getCartData);

export default cartRouter;