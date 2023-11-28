import express from 'express';
import { getAllCountries, getCityByStateId, getStateByCountryId } from '../../controllers/countryStateCityControllers.js';





const router = express.Router();
// Routes
router.get('/getAllCountries', getAllCountries); // Get all CRs

router.get("/getStateByCountryId/:id", getStateByCountryId);

router.get("/getCityByStateId/:id", getCityByStateId);

export default router;