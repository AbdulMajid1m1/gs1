import express from 'express';
import { approveDowngradeMembershipRequest, approveMembershipRequest, downgradeMemberSubscriptionRequest, membershipRenewRequest, getInvoiceDetailsForUpgradeSubscription, updateMemberRenewalDocumentStatus, upgradeMemberSubscriptionRequest, addAdditionalProductsRequest, approveAdditionalProductsRequest, addAdditionalGlnRequest, approveAdditionalGlnRequest, getAddGlnCarts, getUpgradeMembershipCarts } from '../../controllers/changeMembershipController.js';
import { adminAuth, generalAuth } from '../../middlewares/auth.js';


const router = express.Router();

// Routes
// Route for getting upgrade membership carts
router.get('/upgradeMembershipCarts', getUpgradeMembershipCarts);

// Route for getting add GLN carts
router.get('/addGlnCarts', getAddGlnCarts);

router.post('/renewRequest', generalAuth, membershipRenewRequest);

router.post('/getInvoiceDetailsForUpgradeSubscription', getInvoiceDetailsForUpgradeSubscription);

router.put('/changeRenewStatus/:id', adminAuth, updateMemberRenewalDocumentStatus);

router.put('/upgradeMembershipRequest', generalAuth, upgradeMemberSubscriptionRequest);

router.post('/addAdditionalProductsRequest', generalAuth, addAdditionalProductsRequest);

router.post('/addAdditionalGlnRequest', generalAuth, addAdditionalGlnRequest);

router.put('/approveAdditionalGlnRequest', adminAuth, approveAdditionalGlnRequest);

router.put('/approveAdditionalProductsRequest', adminAuth, approveAdditionalProductsRequest);

router.put('/approveMembershipRequest', adminAuth, approveMembershipRequest);

router.put('/downgradeMemberSubscriptionRequest', generalAuth, downgradeMemberSubscriptionRequest);

router.put('/approveDowngradeMembershipRequest', adminAuth, approveDowngradeMembershipRequest);






export default router;














