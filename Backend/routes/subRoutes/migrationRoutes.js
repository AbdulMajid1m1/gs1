
import express from 'express';
import { exportMembersToExcel, getMembershipHistory, getgs1DbYearlyReport, migrateUser, searchMembers } from '../../controllers/migrationController.js';

const router = express.Router();

router.get('/user/search', searchMembers);

router.get('/membershipHistory', getMembershipHistory);

router.post("/migrateUser", migrateUser)

router.get('/exportMembers', exportMembersToExcel);

router.get('/getgs1DbYearlyReport', getgs1DbYearlyReport);


export default router;