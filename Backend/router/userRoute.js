import express from 'express';
import { Login,Signup } from '../Controller/userController.js';

const UserRouter = express.Router();

UserRouter.post('/signup',Signup);
UserRouter.post('/login',Login);

export default UserRouter;