import express from 'express';
import { approveDowngradeMembershipRequest, approveMembershipRequest, downgradeMemberSubscriptionRequest, membershipRenewRequest, getInvoiceDetailsForUpgradeSubscription, updateMemberRenewalDocumentStatus, upgradeMemberSubscriptionRequest, addAdditionalProductsRequest, approveAdditionalProductsRequest, addAdditionalGlnRequest, approveAdditionalGlnRequest, getAddGlnCarts, getUpgradeMembershipCarts } from '../../controllers/changeMembershipController.js';


const router = express.Router();

// Routes
// Route for getting upgrade membership carts
router.get('/upgradeMembershipCarts', getUpgradeMembershipCarts);

// Route for getting add GLN carts
router.get('/addGlnCarts', getAddGlnCarts);


router.post('/renewRequest', membershipRenewRequest);

router.post('/getInvoiceDetailsForUpgradeSubscription', getInvoiceDetailsForUpgradeSubscription);

router.put('/changeRenewStatus/:id', updateMemberRenewalDocumentStatus);

router.put('/upgradeMembershipRequest', upgradeMemberSubscriptionRequest);

router.post('/addAdditionalProductsRequest', addAdditionalProductsRequest);

router.post('/addAdditionalGlnRequest', addAdditionalGlnRequest);

router.put('/approveAdditionalGlnRequest', approveAdditionalGlnRequest);

router.put('/approveAdditionalProductsRequest', approveAdditionalProductsRequest);

router.put('/approveMembershipRequest', approveMembershipRequest);

router.put('/downgradeMemberSubscriptionRequest', downgradeMemberSubscriptionRequest);

router.put('/approveDowngradeMembershipRequest', approveDowngradeMembershipRequest);






export default router;














