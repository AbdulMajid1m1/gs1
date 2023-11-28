import express from 'express';
import { createUser, deleteUser, getUserDetails, updateUser } from '../../controllers/usersController.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUserDetails);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
