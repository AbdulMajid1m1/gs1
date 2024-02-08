import express from 'express';
import { searchGpc, searchSchemaGpc } from '../../controllers/gpcController.js';

const router = express.Router();
// Routes
router.get('/search', searchGpc);
router.get('/schemaGpc', searchSchemaGpc)



export default router;