import express from 'express';
import { getProductKpiReports } from '../../controllers/reportsStatsControllers.js';
const router = express.Router();


router.post('/kpi', getProductKpiReports);

export default router;