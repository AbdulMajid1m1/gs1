import express from 'express';
import { createUser, deleteUser, getCarts, getCrInfo, getUserDetails, getUsersTempDetails, memberLogin, searchUsers, updateCartReceipt, updateUser, updateUserStatus } from '../../controllers/usersController.js';
import { upload } from '../../configs/multerConfig.js';
import { generateGTIN13 } from '../../utils/functions/barcodesGenerator.js';

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
userRouter.get('/search', searchUsers);

userRouter.post('/updateUserStatus', updateUserStatus);

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


userRouter.post('/receiptUpload', upload([
    {
        name: 'receipt',
        path: 'public/uploads/documents/MemberRegRecipent',
    },
]), updateCartReceipt);


userRouter.post("/check", (req, res) => {
    const { id } = req.body
    const user = generateGTIN13(id)
    res.send(user)
})






export default userRouter;
