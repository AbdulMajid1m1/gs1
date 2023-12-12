import express from 'express';

import { createunit,getAllunit,getunitById,updateunit,deleteunit } from '../controllers/units.js';
import { createProductPackag,getAllproductPackagSchema,getproductPackagSchemaById,updateproductPackagSchema,deleteproductPackagSchema } from '../controllers/productPackaging.js';
import { createdocument,getAllcr_documents,getcr_documentsById,updatecr_documents,deletecr_documents } from '../controllers/document.js';
import { createotherproduct,getAllotherproduct,getotherproductById,updateotherproduct,deleteotherproduct } from '../controllers/otherproduct.js';
import { creategpctype,getAllgpctype,getgpctypeById,deletegpctype,updategpctype } from '../controllers/dcp_type.js';
import { createcountryofsale,getAllcountryofsale,getcountryof_saleById,updatecountryofsale,deletecountryofsale } from '../controllers/countryofsales.js';
import { createHsCode,getAllHsCode,getHsCodeById,updateHsCode,deleteHsCode } from '../controllers/hscodes.js';
import { createUNSPSC, getAllUNSPSC,getUNSPSCById,updateUNSPSC,deleteUNSPSC } from '../controllers/UNSPSC.js';
const router = express.Router();

// Routes for unite
router.post('/units', createunit);
router.get('/getAllunit', getAllunit);
router.get('/getunitById/:id', getunitById);
router.put('/updateunit/:id', updateunit);
router.delete('/deleteunit/:id', deleteunit);
// Routes for ProductPackaging
router.post('/createproductpackag', createProductPackag);
router.get('/getAllproductPackag', getAllproductPackagSchema);
router.get('/getproductPackagById/:id', getproductPackagSchemaById);
router.put('/updateproductPackag/:id', updateproductPackagSchema);
router.delete('/deleteproductPackag/:id', deleteproductPackagSchema);
// Routes for document
router.post('/createdocument', createdocument);
router.get('/getAllcr_documents', getAllcr_documents);
router.get('/getcr_documentsById/:id', getcr_documentsById);
router.put('/updatecr_documents/:id', updatecr_documents);
router.delete('/deletecr_documents/:id', deletecr_documents);
// Routes for otherProduct
router.post('/createotherProduct', createotherproduct);
router.get('/getAllotherproduct', getAllotherproduct);
router.get('/getotherproductById/:id', getotherproductById);
router.put('/updateotherproduct/:id', updateotherproduct);
router.delete('/deleteotherproduct/:id', deleteotherproduct);
// Routes for GCP_type
router.post('/creategpctype', creategpctype);
router.get('/getAllgpctype', getAllgpctype);
router.get('/getgpctypeById/:id', getgpctypeById);
router.put('/updategpctype/:id', updategpctype);
router.delete('/deletegpctype/:id', deletegpctype);
// Routes for countryofsale
router.post('/createcountryofsale', createcountryofsale);
router.get('/getAllcountryofsale', getAllcountryofsale);
router.get('/getcountryof_saleById/:id', getcountryof_saleById);
router.put('/updatecountryofsale/:id', updatecountryofsale);
router.delete('/deletecountryofsale/:id', deletecountryofsale);
// Routes for HsCode
router.post('/createHsCode', createHsCode);
router.get('/getAllHsCode', getAllHsCode);
router.get('/getHsCodeById/:id', getHsCodeById);
router.put('/updateHsCode/:id', updateHsCode);
router.delete('/deleteHsCode/:id', deleteHsCode);

// Routes for unspscs
router.post('/createUNSPSC', createUNSPSC);
router.get('/getAllUNSPSC', getAllUNSPSC);
router.get('/getUNSPSCById/:id', getUNSPSCById);
router.put('/updateUNSPSC/:id', updateUNSPSC);
router.delete('/deleteUNSPSC/:id', deleteUNSPSC);
export default router;