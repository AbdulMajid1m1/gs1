import express from 'express';  
import { membershipRenewRequest } from '../../controllers/changeMembershipController.js';


const router = express.Router();

// Routes
router.post('/renewRequest', membershipRenewRequest);



export default router;