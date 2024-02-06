import express from 'express';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';
import { getGtinProductDetailsFromGlobalDb, getGtinProductDetailsFromLocalDb } from '../../controllers/foreignGtinController.js';

const router = express.Router();

router.get('/getGtinProductDetailsFromLocalDb', getGtinProductDetailsFromLocalDb);

router.get('/getGtinProductDetailsFromGlobalDb', getGtinProductDetailsFromGlobalDb);




export default router;