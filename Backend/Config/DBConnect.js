import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
       await mongoose.connect('mongodb+srv://Bibhu:Bibhu123@cluster0.kjnc1zx.mongodb.net/practice')
       console.log("MongoDB Connected..")
    } catch (error) {
        console.log("Error in MongoDB Connection "+error);
    }
}