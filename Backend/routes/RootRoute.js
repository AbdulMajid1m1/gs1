import express from "express";
import crsRoutes from './subRoutes/crsRoutes.js';
import userRoutes from './subRoutes/usersRoutes.js';
import crDocumentsRoutes from './subRoutes/crDocumentsRoutes.js';
import attributesRoutes from './subRoutes/attributesRoutes.js';
import countryStateCityRoutes from './subRoutes/countryStateCityRoutes.js';
import gtinProductsRoutes from './subRoutes/gtinProductsRoutes.js';
import otherProuductRoutes from './subRoutes/otherProuductRoutes.js';
import adminRoutes from './subRoutes/adminRoutes.js';
import productTypesRoutes from './subRoutes/productTypesRoutes.js';
import productCategoriesRoutes from './subRoutes/productCategoriesRoutes.js';
import EissaRootRoute from './EissaRootRoute.js';
const router = express.Router();



router.use('/', EissaRootRoute);
router.use('/crs', crsRoutes);

router.use('/users', userRoutes);

router.use('/crDocuments', crDocumentsRoutes);

router.use('/attributes', attributesRoutes);

router.use('/address', countryStateCityRoutes);

router.use('/gtinProducts', gtinProductsRoutes);

router.use('/otherProducts', otherProuductRoutes);

router.use('/admin', adminRoutes);

router.use('/productTypes', productTypesRoutes);

router.use('/productCategories', productCategoriesRoutes);


export default router;
