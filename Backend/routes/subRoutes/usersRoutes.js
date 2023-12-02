import express from 'express';
import { createUser, deleteUser, getUserDetails, updateUser } from '../../controllers/usersController.js';
import { upload } from '../../configs/multerConfig.js';

const userRouter = express.Router();

// userRouter.post('/', createUser);
userRouter.post('/', upload([
    {
        name: 'document',
        path: 'public/uploads/documents/MemberRegDocs',
    },
    {
        name: 'image',
        path: 'public/uploads/images/MemberRegImages',

    },
]), createUser);
userRouter.get('/', getUserDetails);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
