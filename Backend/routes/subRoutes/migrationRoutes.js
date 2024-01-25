
import express from 'express';
import { exportMembersToExcel, getMembershipHistory, getgs1DbYearlyReport, getgs1NewDbYearlyReport, migrateUser, searchMembers } from '../../controllers/migrationController.js';

const router = express.Router();

router.get('/user/search', searchMembers);

router.get('/membershipHistory', getMembershipHistory);

router.post("/migrateUser", migrateUser)

router.get('/exportMembers', exportMembersToExcel);

router.get('/getgs1DbYearlyReport', getgs1DbYearlyReport);

router.get('/getgs1NewDbYearlyReport', getgs1NewDbYearlyReport);



export default router;