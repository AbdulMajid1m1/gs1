import express from 'express';
import { addAdmin, adminLogin, assignAdminToUser, searchAdmins } from '../../controllers/adminController.js';
import { superAdminAuth } from '../../middlewares/auth.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

router.get('/searchAdmins', searchAdmins);


router.post('/assignAdmin', superAdminAuth, assignAdminToUser);

// Add admin user route with validation
router.post('/addAdmin', superAdminAuth, addAdmin);

export default router;
