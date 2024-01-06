import express from 'express';
import { approveMembershipRequest, membershipRenewRequest, updateMemberRenewalDocumentStatus, updradeMemberSubscpiptionRequest } from '../../controllers/changeMembershipController.js';


const router = express.Router();

// Routes
router.post('/renewRequest', membershipRenewRequest);

router.put('/changeRenewStatus/:id', updateMemberRenewalDocumentStatus);

router.put('/upgradeMembershipRequest', updradeMemberSubscpiptionRequest);

router.put('/approveMembershipRequest', approveMembershipRequest);



export default router;