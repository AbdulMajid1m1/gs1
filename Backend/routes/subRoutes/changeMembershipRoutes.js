import express from 'express';
import { approveDowngradeMembershipRequest, approveMembershipRequest, downgradeMemberSubscriptionRequest, membershipRenewRequest, getInvoiceDetailsForUpgradeSubscription, updateMemberRenewalDocumentStatus, upgradeMemberSubscriptionRequest, addAdditionalProductsRequest, approveAdditionalProductsRequest, addAdditionalGlnRequest, approveAdditionalGlnRequest, getAddGlnCarts, getUpgradeMembershipCarts, addMultipleOtherProductSubscriptionsAndGenerateInvoice, approveAdditionalOtherProductsSubscriptionRequest } from '../../controllers/changeMembershipController.js';
import { adminAuth, generalAuth } from '../../middlewares/auth.js';


const router = express.Router();

// Routes
// Route for getting upgrade membership carts
router.get('/upgradeMembershipCarts', getUpgradeMembershipCarts);

// Route for getting add GLN carts
router.get('/addGlnCarts', getAddGlnCarts);

router.post('/renewRequest', generalAuth, membershipRenewRequest);

router.post('/getInvoiceDetailsForUpgradeSubscription', getInvoiceDetailsForUpgradeSubscription);

router.put('/changeRenewStatus/:id', adminAuth, updateMemberRenewalDocumentStatus); //done

router.put('/upgradeMembershipRequest', generalAuth, upgradeMemberSubscriptionRequest);

router.post('/addAdditionalProductsRequest', generalAuth, addAdditionalProductsRequest);

router.post('/addAdditionalGlnRequest', generalAuth, addAdditionalGlnRequest);

router.put('/approveAdditionalGlnRequest', adminAuth, approveAdditionalGlnRequest); //done

router.put('/approveAdditionalProductsRequest', adminAuth, approveAdditionalProductsRequest); //done

router.put('/approveMembershipRequest', adminAuth, approveMembershipRequest); //done

router.put('/downgradeMemberSubscriptionRequest', generalAuth, downgradeMemberSubscriptionRequest);

router.put('/approveDowngradeMembershipRequest', adminAuth, approveDowngradeMembershipRequest); //done


router.post('/addMultipleOtherProductSubscriptionsAndGenerateInvoice', addMultipleOtherProductSubscriptionsAndGenerateInvoice);


router.put("/approveAdditionalOtherProductsSubscriptionRequest", approveAdditionalOtherProductsSubscriptionRequest); //done


export default router;














