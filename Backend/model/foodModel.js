import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}
})

const FoodModel = mongoose.models.food || mongoose.model('food',foodSchema);
export default FoodModel;
