import express from 'express';
import
    {
        getAllCities,createCities,getCitiesById,updateCities,deleteCities,
        getAllCountries,createCountries,getCountriesById,updateCountries,deleteCountries,getAllCountriesName,
        getAllStates,createStates,getStatesById,updateStates,deleteStates,
        getCityByStateId, getStateByCountryId
    } from '../../controllers/countryStateCityControllers.js';





const router = express.Router();
// --------------------------Country----------------
router.get('/getAllCountries', getAllCountries); 
router.get('/getAllCountriesName', getAllCountriesName); 
router.get("/getCountriesById/:id", getCountriesById)
router.put("/updateCountries/:id", updateCountries)
router.post("/createCountries", createCountries)
router.delete("/deleteCountries/:id", deleteCountries)
//-------------STATE----------------------------------
router.get("/getAllStates", getAllStates);
router.get("/getStatesById/:id", getStatesById)
router.put("/updateStates/:id", updateStates)
router.post("/createStates", createStates)
router.delete("/deleteStates/:id", deleteStates)
//--------------CITIES----------------------------------
router.get("/getAllCities", getAllCities);
router.get("/getCitiesById/:id", getCitiesById)
router.put("/updateCities/:id", updateCities)
router.post("/createCities", createCities)
router.delete("/deleteCities/:id", deleteCities)
//------------------------------------------------------
router.get("/getStateByCountryId/:id", getStateByCountryId);

router.get("/getCityByStateId/:id", getCityByStateId);

export default router;