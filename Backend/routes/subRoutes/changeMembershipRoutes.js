import express from 'express';
import { approveDowngradeMembershipRequest, approveMembershipRequest, downgradeMemberSubscriptionRequest, membershipRenewRequest, updateMemberRenewalDocumentStatus, updradeMemberSubscpiptionRequest } from '../../controllers/changeMembershipController.js';


const router = express.Router();

// Routes
router.post('/renewRequest', membershipRenewRequest);

router.put('/changeRenewStatus/:id', updateMemberRenewalDocumentStatus);

router.put('/upgradeMembershipRequest', updradeMemberSubscpiptionRequest);

router.put('/approveMembershipRequest', approveMembershipRequest);

router.put('/downgradeMemberSubscriptionRequest', downgradeMemberSubscriptionRequest);

router.put('/approveDowngradeMembershipRequest', approveDowngradeMembershipRequest);




export default router;