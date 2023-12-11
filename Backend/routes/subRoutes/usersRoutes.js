import express from 'express';
import { createUser, deleteUser, getCarts, getCrInfo, getUserDetails, getUsersTempDetails, memberLogin, updateUser } from '../../controllers/usersController.js';
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

userRouter.put('/:userId', upload([
    {
        name: 'document',
        path: 'public/uploads/documents/MemberRegDocs',
    },
    {
        name: 'image',
        path: 'public/uploads/images/MemberRegImages',
    },
]), updateUser);
userRouter.delete('/:id', deleteUser);

userRouter.get('/temp', getUsersTempDetails);

userRouter.get('/getCrInfoByEmail', getCrInfo);

userRouter.post('/memberLogin', memberLogin);

// carts routes

userRouter.get('/cart', getCarts);






export default userRouter;
