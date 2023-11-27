import express from "express";
import crsRoutes from './subRoutes/crsRoutes.js';



const router = express.Router();



router.use('/crs', crsRoutes);

export default router;
