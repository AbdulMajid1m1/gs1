import express from 'express';
import { searchGpc } from '../../controllers/gpcController.js';

const router = express.Router();
// Routes
router.get('/search', searchGpc);



export default router;