import express from 'express';
import { addAdmin, adminLogin, assignAdminToUser, deleteAdmin, getAllAdmins, searchAdmins, updateAdmin } from '../../controllers/adminController.js';
import { superAdminAuth } from '../../middlewares/auth.js';
import { upload } from '../../configs/multerConfig.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

router.get('/getAdmins', superAdminAuth, getAllAdmins);

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

router.put('/updateAdmin/:adminId', superAdminAuth, updateAdmin);

export default router;
