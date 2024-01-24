
import express from 'express';
import { exportMembersToExcel, getMembershipHistory, migrateUser, searchMembers } from '../../controllers/migrationController.js';

const router = express.Router();

router.get('/user/search', searchMembers);

router.get('/membershipHistory', getMembershipHistory);

router.post("/migrateUser", migrateUser)

router.get('/exportMembers', exportMembersToExcel);


export default router;