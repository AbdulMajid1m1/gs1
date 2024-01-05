import express from 'express';
import { membershipRenewRequest, updateMemberRenewalDocumentStatus } from '../../controllers/changeMembershipController.js';


const router = express.Router();

// Routes
router.post('/renewRequest', membershipRenewRequest);

router.put('/changeRenewStatus/:id', updateMemberRenewalDocumentStatus);



export default router;