
import express from 'express';
import { getMembershipHistory, searchMembers } from '../../controllers/migrationController.js';

const router = express.Router();

router.get('/user/search', searchMembers);
router.get('/membershipHistory', getMembershipHistory);


export default router;