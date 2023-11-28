import express from "express";
import crsRoutes from './subRoutes/crsRoutes.js';
import userRoutes from './subRoutes/usersRoutes.js';
import crDocumentsRoutes from './subRoutes/crDocumentsRoutes.js';



const router = express.Router();



router.use('/crs', crsRoutes);

router.use('/users', userRoutes);

router.use('/crDocuments', crDocumentsRoutes);

export default router;
