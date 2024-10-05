import OrderModel from "../model/orderModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv'
import userModel from "../model/userModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const placeOrder = async (req, res) => {
    try {
        const frontend_url = 'http://localhost:5173'
        const { userId, address, amount, items } = req.body;
        if (!userId || !address || !amount || !items) {
            return res.json({ success: false, message: "Missing required field" })
        }

        const newOrder = new OrderModel({
            userId,
            address,
            amount,
            items
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        const line_item = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_item.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        return res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log("Error in placeOrder "+error)
        res.json({success: false, message: "Error"})
    }
}

const verifyOrder = async (req,res) => {
    try {
        const {success,orderId} = req.body;
        if(success)
        {
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log("Error in verifyOrder "+error)
        res.json({success:false,message:"Error"})
    }
}
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        console.log(req.body)
        const orders = await OrderModel.find({userId:userId})
        console.log(orders);
        res.json({success:true,data:orders})
    } catch (error) {
        console.log("Error in userOrders "+error)
        res.json({success:false,message:"Error"})
    }
}
const listOrder = async (req,res) => {
    try {
        const orders = await OrderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log("Error in listOrder "+error)
    }
}

const changeStaus = async (req,res) => {
    try {
        const {orderId,status} = req.body;
        if(orderId && status)
        {
            await OrderModel.findByIdAndUpdate(orderId,{status:status})
        }
        else{
           return res.json({success:false,message:"Required field is missing"})
        }
        res.json({success:true,message:"Status Changed"})
    } catch (error) {
        console.log("Error in changeStatus "+error)
        res.json({success:false,message:"Error"})
    }
}
export {placeOrder,verifyOrder,userOrders,listOrder,changeStaus}