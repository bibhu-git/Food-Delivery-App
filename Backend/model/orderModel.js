import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'Food Processing'
    },
    address: {
        type: Object,
        required: true
    }
})

const OrderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default OrderModel;