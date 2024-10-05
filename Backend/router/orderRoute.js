import express from 'express'
import { changeStaus, listOrder, placeOrder, userOrders, verifyOrder } from '../Controller/orderController.js';
import authMiddleware from '../Middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.get('/orders',authMiddleware,userOrders);
orderRouter.get('/list',listOrder);
orderRouter.post('/status',changeStaus);

export default orderRouter;