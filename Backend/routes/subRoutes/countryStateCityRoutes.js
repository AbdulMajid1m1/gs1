import express from 'express';
import { getAllCities, getAllCountries, getAllStates, getCityByStateId, getStateByCountryId } from '../../controllers/countryStateCityControllers.js';





const router = express.Router();
// Routes
router.get('/getAllCountries', getAllCountries); // Get all CRs

router.get("/getAllStates", getAllStates);
router.get("/getAllCities", getAllCities);
router.get("/getStateByCountryId/:id", getStateByCountryId);

router.get("/getCityByStateId/:id", getCityByStateId);

export default router;