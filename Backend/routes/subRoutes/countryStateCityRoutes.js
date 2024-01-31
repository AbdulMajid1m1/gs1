import express from 'express';
import {
    getAllCities, createCities, getCitiesById, updateCities, deleteCities,
    getAllCountries, createCountries, getCountriesById, updateCountries, deleteCountries, getAllCountriesName,
    getAllStates, createStates, getStatesById, updateStates, deleteStates, getAllStatesName,
    getCityByStateId, getStateByCountryId
} from '../../controllers/countryStateCityControllers.js';
import { adminAuth, checkPermission } from '../../middlewares/auth.js';





const router = express.Router();
// --------------------------Country----------------
router.get('/getAllCountries', getAllCountries);
router.get('/getAllCountriesName', getAllCountriesName);
router.get("/getCountriesById/:id", getCountriesById)
router.put("/updateCountries/:id", adminAuth, checkPermission(["country"]), updateCountries)
router.post("/createCountries", adminAuth, checkPermission(["country"]), createCountries)
router.delete("/deleteCountries/:id", adminAuth, checkPermission(["country"]), deleteCountries)
//-------------STATE----------------------------------
router.get("/getAllStates", getAllStates);
router.get("/getAllStatesName", getAllStatesName);
router.get("/getStatesById/:id", getStatesById)
router.put("/updateStates/:id", adminAuth, checkPermission(["state"]), updateStates)
router.post("/createStates", adminAuth, checkPermission(["state"]), createStates)
router.delete("/deleteStates/:id", adminAuth, checkPermission(["state"]), deleteStates)
//--------------CITIES----------------------------------
router.get("/getAllCities", getAllCities);
router.get("/getCitiesById/:id", getCitiesById)
router.put("/updateCities/:id", adminAuth, checkPermission(["cities"]), updateCities)
router.post("/createCities", adminAuth, checkPermission(["cities"]), createCities)
router.delete("/deleteCities/:id", adminAuth, checkPermission(["cities"]), deleteCities)
//------------------------------------------------------
router.get("/getStateByCountryId/:id", getStateByCountryId);

router.get("/getCityByStateId/:id", getCityByStateId);

export default router;