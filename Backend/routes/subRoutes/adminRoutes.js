import express from 'express';
import { adminLogin, searchAdmins } from '../../controllers/adminController.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

router.get('/searchAdmins', searchAdmins);


export default router;
