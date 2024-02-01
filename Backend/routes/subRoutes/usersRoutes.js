import express from 'express';
import { createSubUser, createUser, deleteUser, getAdminStatsCounts, getCarts, getCartsDetails, getCrInfo, getExpiredMembers, getNewlyRegisteredUsers, getRegisteredMembers, getRejectedUserDetails, getUserDetails, getUsersTempDetails, getUsersWithExpiringGcpThisYear, memberLogin, searchUsers, sendInvoiceToUser, updateCartReceipt, updateUser, updateUserStatus } from '../../controllers/usersController.js';
import { upload } from '../../configs/multerConfig.js';
import { generateGTIN13 } from '../../utils/functions/barcodesGenerator.js';
import { adminAuth, checkPermission, generalAuth } from '../../middlewares/auth.js';

const userRouter = express.Router();

// userRouter.post('/', createUser);
userRouter.post('/', createUser);

userRouter.get('/', getUserDetails);

userRouter.get('/allUser', adminAuth, checkPermission(["members"]), getRegisteredMembers);

userRouter.get('/rejected', adminAuth, checkPermission(["members"]), getRejectedUserDetails);

userRouter.get('/rejectedCarts', getCartsDetails);


userRouter.post('/sendInvoice', adminAuth, sendInvoiceToUser);

userRouter.get('/adminStatsCounts', getAdminStatsCounts);

userRouter.get('/new', adminAuth, checkPermission(["members"]), getNewlyRegisteredUsers);

userRouter.get('/getByGcpExpiry', adminAuth, checkPermission(["members"]), getUsersWithExpiringGcpThisYear);

userRouter.get('/getExpirtedMembers', adminAuth, checkPermission(["members"]), getExpiredMembers);

userRouter.get('/search', generalAuth, checkPermission(["members"]), searchUsers);

userRouter.post('/subuser', generalAuth, createSubUser);

userRouter.post('/updateUserStatus', updateUserStatus);

userRouter.put('/:userId', generalAuth, upload([
    {
        name: 'document',
        path: 'public/uploads/documents/MemberRegDocs',
    },
    {
        name: 'image',
        path: 'public/uploads/images/MemberRegImages',
    },
]), generalAuth, updateUser);
userRouter.delete('/:id', generalAuth, deleteUser);

userRouter.get('/temp', generalAuth, getUsersTempDetails);

userRouter.get('/getCrInfoByEmail', getCrInfo);

userRouter.post('/memberLogin', memberLogin);

// carts routes

userRouter.get('/cart', generalAuth, generalAuth, getCarts);


userRouter.post('/receiptUpload', generalAuth, upload([
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
