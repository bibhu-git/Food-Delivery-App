import express from 'express'
import { addFood, listFood, removeFood } from '../Controller/foodController.js'
import multer from 'multer';

const foodRouter = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage: storage});
foodRouter.post('/add',upload.single("image"),addFood);
foodRouter.post('/remove',removeFood);
foodRouter.get('/list',listFood)


export default foodRouter;