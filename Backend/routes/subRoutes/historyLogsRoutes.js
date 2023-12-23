// Assuming you have a userRouter.js or similar
import express from 'express';
import { getMemberHistoryLogs } from '../../controllers/historylogsController.js'

const router = express.Router();


// Add a route for member history logs
router.get('/memberLogs', getMemberHistoryLogs);

export default router;
