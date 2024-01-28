import express from 'express';
import { getAdminActivityReport, getMemberActivityReport, getProductKpiReports } from '../../controllers/reportsStatsControllers.js';
const router = express.Router();


router.post('/kpi', getProductKpiReports);

router.post('/gs1Admin', getAdminActivityReport);

router.post('/gs1member', getMemberActivityReport);

export default router;