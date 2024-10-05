import express from 'express';
import { ConnectDB } from './Config/DBConnect.js';
import UserRouter from './router/userRoute.js';
import cors from 'cors'
import dotenv from 'dotenv'
import cartRouter from './router/cartRoute.js';
import foodRouter from './router/foodRoute.js';
import orderRouter from './router/orderRoute.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

//Database Connection
ConnectDB();
app.use(cors());
app.use('/image',express.static('uploads'));
app.use(express.json());
app.use('/api/user', UserRouter);
app.use('/api/cart', cartRouter);
app.use('/api/food',foodRouter);
app.use('/api/order',orderRouter);
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Example app listen on port: http://localhost:${port}`)
})