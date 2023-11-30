import express from "express";
import crsRoutes from './subRoutes/crsRoutes.js';
import userRoutes from './subRoutes/usersRoutes.js';
import crDocumentsRoutes from './subRoutes/crDocumentsRoutes.js';
import attributesRoutes from './subRoutes/attributesRoutes.js';
import countryStateCityRoutes from './subRoutes/countryStateCityRoutes.js';
import gtinProductsRoutes from './subRoutes/gtinProductsRoutes.js';
const router = express.Router();



router.use('/crs', crsRoutes);

router.use('/users', userRoutes);

router.use('/crDocuments', crDocumentsRoutes);

router.use('/attributes', attributesRoutes);

router.use('/address', countryStateCityRoutes);

router.use('/gtinProducts', gtinProductsRoutes);

export default router;
