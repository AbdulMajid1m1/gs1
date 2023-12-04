import express from 'express';
import { adminLogin } from '../../controllers/adminController.js';


const router = express.Router();

// Admin user login endpoint
router.post('/login', adminLogin);

export default router;
