import FoodModel from "../model/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    try {
        const image_filename = `${req.file.filename}`;

        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category || !image_filename) {
            return res.json({ success: false, message: "A field is missing" })
        }
        const newFood = new FoodModel({
            image: image_filename,
            name,
            description,
            price,
            category
        })

        await newFood.save();
        res.json({ success: true, message: "Food added" })
    } catch (error) {
        console.log("Error in addFood " + error)
        res.json({ success: false, message: "Error" })
    }
}
const listFood = async (req, res) => {
    try {
        const foods = await FoodModel.find({})
        if (foods) {
            res.json({ success: true, foodList: foods })
        }
    } catch (error) {
        console.log("Error in listFood " + error)
        res.json({ success: false, message: "Error" })
    }
}

const removeFood = async (req, res) => {
    try {
        const id = req.body.id;
        const food = await FoodModel.findById(id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await FoodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food removed" })


    } catch (error) {
        console.log("Error in foodRemoved " + error);
        res.json({ success: false, message: "Error" })
    }
}


export { addFood, removeFood, listFood }