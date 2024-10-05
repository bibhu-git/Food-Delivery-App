import userModel from "../model/userModel.js";
import validator from "validator";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not exists" })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" })
        }
        const token = generateToken(user._id);
        res.json({success: true, message: "Login Successful 😎", token: token})
    } catch (error) {
        console.log("Error in login "+error)
        res.json({success: false, message: "Error"})
    }

}
const Signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" })
        }
        if (password.length < 3) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashPassword
        })

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.json({ success: true, message: "Signup Successful 🥳", token: token })
    } catch (error) {
        console.log("Error in signup " + error);
        res.json({ success: false, message: "Error" })
    }

}

export { Login, Signup }