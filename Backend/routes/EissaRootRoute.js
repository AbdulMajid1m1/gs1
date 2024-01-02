import express from 'express';

import { createunit,getAllunit,getunitById,updateunit,deleteunit } from '../controllers/units.js';
import { createProductPackag,getAllproductPackagSchema,getproductPackagSchemaById,updateproductPackagSchema,deleteproductPackagSchema } from '../controllers/productPackaging.js';
import { createdocument,getAllcr_documents,getcr_documentsById,updatecr_documents,deletecr_documents,createdocumentType,getAlldocumentType,getdocumentTypeById,updatedocumentType,deletedocumentType,getAlldocumentTypename } from '../controllers/document.js';
import { createotherproduct,getAllotherproduct,getotherproductById,updateotherproduct,deleteotherproduct } from '../controllers/otherproduct.js';
import { creategpctype,getAllgpctype,getgpctypeById,deletegpctype,updategpctype } from '../controllers/dcp_type.js';
import { createcountryofsale,getAllcountryofsale,getcountryof_saleById,updatecountryofsale,deletecountryofsale } from '../controllers/countryofsales.js';
import { createHsCode,getAllHsCode,getHsCodeById,updateHsCode,deleteHsCode } from '../controllers/hscodes.js';
import { createUNSPSC, getAllUNSPSC, getUNSPSCById, updateUNSPSC, deleteUNSPSC } from '../controllers/UNSPSC.js';
import { getAllprod_desc_languages } from "../controllers/productsController.js"
import { upload } from '../configs/multerConfig.js';
import
    {
        getAllmega_menu, createmega_menus, getmega_menusById, updatemega_menus, deletemega_menus,
    getAllmega_menu_categories, creatmega_menu_categories, getmega_menu_categoriesById, updatemega_menu_categories,
    deletemega_menu_categories, getAllfooter_menus, creatfooter_menus, getfooter_menusById, updatefooter_menus, deletefooter_menus,
    getAllsliders,creatsliders,getslidersById,updatesliders} from "../controllers/catalog.js"
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
// Routes for documenttype
router.post('/createdocumentType', createdocumentType);
router.get('/getAlldocumentType', getAlldocumentType);
router.get('/getAlldocumentTypename', getAlldocumentTypename);
router.get('/getdocumentTypeById/:id', getdocumentTypeById);
router.put('/updatedocumentType/:id', updatedocumentType);
router.delete('/deletedocumentType/:id', deletedocumentType);
// Routes for getAllprod_desc_languages
router.get('/getAllprod_desc_languages', getAllprod_desc_languages);
// Routes for mega_menus
router.get('/getAllmega_menu', getAllmega_menu);
router.post('/createmega_menus', createmega_menus);
router.get('/getmega_menusById/:id', getmega_menusById);
router.put('/updatemega_menus/:id', updatemega_menus);
router.delete('/deletemega_menus/:id', deletemega_menus);

// Routes for mega_menu_categories
router.get('/getAllmega_menu_categories', getAllmega_menu_categories);
router.post('/creatmega_menu_categories', creatmega_menu_categories);
router.get('/getmega_menu_categoriesById/:id', getmega_menu_categoriesById);
router.put('/updatemega_menu_categories/:id', updatemega_menu_categories);
router.delete('/deletemega_menu_categories/:id', deletemega_menu_categories);

// Routes for footer_menus
router.get('/getAllfooter_menus', getAllfooter_menus);
router.post('/creatfooter_menus', creatfooter_menus);
router.get('/getfooter_menusById/:id', getfooter_menusById);
router.put('/updatefooter_menus/:id', updatefooter_menus);
router.delete('/deletefooter_menus/:id', deletefooter_menus);

// Routes for sliders
router.get('/getAllsliders', getAllsliders);
router.post('/creatsliders', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatsliders);
router.get('/getslidersById/:id', getslidersById);
router.put('/updatesliders/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updatesliders);
router.delete('/deletefooter_menus/:id', deletefooter_menus);
export default router;