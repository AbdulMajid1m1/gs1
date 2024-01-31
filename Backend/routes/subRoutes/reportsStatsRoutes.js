import express from 'express';
import { getAdminActivityReport, getAllAdminsActivityReport, getMemberActivityReport, getProductKpiReports } from '../../controllers/reportsStatsControllers.js';
import { adminAuth, checkPermission } from '../../middlewares/auth.js';
const router = express.Router();


router.post('/kpi', adminAuth, checkPermission(["finance_kpi"]), getProductKpiReports);

router.post('/gs1Admin', adminAuth, checkPermission(["admin_activity"]), getAdminActivityReport);

router.post('/allgs1Admin', adminAuth, checkPermission(["admin_activity"]), getAllAdminsActivityReport);

router.post('/gs1member', adminAuth, checkPermission(["member_activity"]), getMemberActivityReport);

export default router;


