import express from 'express';
import { adminLogin, assignAdminToUser, searchAdmins } from '../../controllers/adminController.js';
import { superAdminAuth } from '../../middlewares/auth.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

router.get('/searchAdmins', searchAdmins);


router.post('/assign-admin', superAdminAuth, assignAdminToUser);

export default router;
