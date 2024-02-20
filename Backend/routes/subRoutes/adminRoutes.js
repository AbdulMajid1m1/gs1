import express from 'express';
import { addAdmin, adminLogin, assignAdminToUser, deleteAdmin, generateAdminOtp, getAdmin, getAllAdmins, searchAdmins, setAdminCredentials, updateAdmin, verifyAdminOtp } from '../../controllers/adminController.js';
import { superAdminAuth } from '../../middlewares/auth.js';
import { upload } from '../../configs/multerConfig.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

router.get('/getAdmins', superAdminAuth, getAllAdmins);

router.get('/getAdminById', superAdminAuth, getAdmin);

router.get('/searchAdmins', searchAdmins);


router.post('/assignAdmin', superAdminAuth, assignAdminToUser);

// Add admin user route with validation
router.post('/addAdmin', superAdminAuth,
    upload([
        {
            name: 'profilePicture',
            path: 'public/uploads/documents/adminProfilePictures',
        },
    ]),
    addAdmin);


router.delete("/deleteAdmin", superAdminAuth, deleteAdmin);

// Update admin user route with validation
router.put('/updateAdmin/:adminId', superAdminAuth,
    upload([
        {
            name: 'profilePicture',
            path: 'public/uploads/documents/adminProfilePictures',
        },
    ]),
    updateAdmin);



// mobile login APIS for authenticator

router.post('/generateOtp', generateAdminOtp);
router.post('/verifyOtp', verifyAdminOtp);
router.post('/setAdminCredentials', setAdminCredentials);

export default router;
