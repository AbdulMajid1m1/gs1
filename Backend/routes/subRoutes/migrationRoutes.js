
import express from 'express';
import { getMembershipHistory, migrateUser, searchMembers } from '../../controllers/migrationController.js';

const router = express.Router();

router.get('/user/search', searchMembers);

router.get('/membershipHistory', getMembershipHistory);

router.post("/migrateUser", migrateUser)




export default router;