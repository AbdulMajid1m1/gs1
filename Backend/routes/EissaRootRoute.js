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
import {getAlluser_guide_pdfs,creatuser_guide_pdfs,getuser_guide_pdfsById,updateuser_guide_pdfs,deleteuser_guide_pdfs,getAlluser_guide_videos,creatuser_guide_videos,getuser_guide_videosById,updateuser_guide_videos,deleteuser_guide_videos} from "../controllers/user_guid.js"
import
    {
        getAllmega_menu, createmega_menus, getmega_menusById, updatemega_menus, deletemega_menus,
    getAllmega_menu_categories, creatmega_menu_categories, getmega_menu_categoriesById, updatemega_menu_categories,
    deletemega_menu_categories, getAllfooter_menus, creatfooter_menus, getfooter_menusById, updatefooter_menus, deletefooter_menus,
    getAllsliders, creatsliders, getslidersById, updatesliders, deletesliders, getAllfeatured_services, creatfeatured_services
    , getfeatured_servicesById, updatefeatured_services, deletefeatured_services, getAllfeatured_articales,
    creatfeatured_articales, getfeatured_articalesById, updatefeatured_articales, deletefeatured_articales, getAllupcoming_events,
creatupcoming_events,getupcoming_eventsById,updateupcoming_events,deleteupcoming_events} from "../controllers/catalog.js"
const router = express.Router();
import {createpages,getAllpages,getpagesById,updatepages,deletepages} from '../controllers/pages.js'
import { getAllpartners, creatpartners, getpartnersById, updatepartners, deletepartners } from '../controllers/partners.js'
import {createblog_categories,getAllblog_categories,getblog_categoriesById,updateblog_categories,deleteblog_categories} from '../controllers/blog_categories.js'
import {createfaq_categories,getAllfaq_categories,getfaq_categoriesById,updatefaq_categories,deletefaq_categories} from '../controllers/faq_categories.js'
import {getAllour_teams,creatour_teams,getour_teamsById,updateour_teams,deleteour_teams} from '../controllers/our_teams.js'
import {getAllboard_members,creatboard_members,getboard_membersById,updateboard_members,deleteboard_members} from "../controllers/board_members.js"
// Routes for faq_categories
router.post('/createfaq_categories', createfaq_categories);
router.get('/getAllfaq_categories', getAllfaq_categories);
router.get('/getfaq_categoriesById/:id', getfaq_categoriesById);
router.put('/updatefaq_categories/:id', updatefaq_categories);
router.delete('/deletefaq_categories/:id', deletefaq_categories);
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
router.delete('/deletesliders/:id', deletesliders);


// Routes for featured_services
router.get('/getAllfeatured_services', getAllfeatured_services);
router.post('/creatfeatured_services', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatfeatured_services);
router.get('/getfeatured_servicesById/:id', getfeatured_servicesById);
router.put('/updatefeatured_services/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updatefeatured_services);
router.delete('/deletefeatured_services/:id', deletefeatured_services);

// Routes for featured_articales
router.get('/getAllfeatured_articales', getAllfeatured_articales);
router.post('/creatfeatured_articales', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatfeatured_articales);
router.get('/getfeatured_articalesById/:id', getfeatured_articalesById);
router.put('/updatefeatured_articales/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updatefeatured_articales);
router.delete('/deletefeatured_articales/:id', deletefeatured_articales);

// Routes for upcoming_events
router.get('/getAllupcoming_events', getAllupcoming_events);
router.post('/creatupcoming_events', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatupcoming_events);
router.get('/getupcoming_eventsById/:id', getupcoming_eventsById);
router.put('/updateupcoming_events/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updateupcoming_events);
router.delete('/deleteupcoming_events/:id', deleteupcoming_events);

// Routes for pages
router.get('/getAllpages', getAllpages);
router.post('/createpages', createpages);
router.get('/getpagesById/:id', getpagesById);
router.put('/updatepages/:id', updatepages);
router.delete('/deletepages/:id', deletepages);

// Routes for partners
router.get('/getAllpartners', getAllpartners);
router.post('/creatpartners', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatpartners);
router.get('/getpartnersById/:id', getpartnersById);
router.put('/updatepartners/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updatepartners);
router.delete('/deletepartners/:id', deletepartners);

// Routes for blog_categories
router.post('/createblog_categories', createblog_categories);
router.get('/getAllblog_categories', getAllblog_categories);
router.get('/getblog_categoriesById/:id', getblog_categoriesById);
router.put('/updateblog_categories/:id', updateblog_categories);
router.delete('/deleteblog_categories/:id', deleteblog_categories);

// Routes for our_teams
router.get('/getAllour_teams', getAllour_teams);
router.post('/creatour_teams', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatour_teams);
router.get('/getour_teamsById/:id', getour_teamsById);
router.put('/updateour_teams/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updateour_teams);
router.delete('/deleteour_teams/:id', deleteour_teams);

// Routes for board_members
router.get('/getAllboard_members', getAllboard_members);
router.post('/creatboard_members', upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]),creatboard_members);
router.get('/getboard_membersById/:id', getboard_membersById);
router.put('/updateboard_members/:id',upload([
    {
        name: 'image',
        path: 'public/uploads/adminImg',
    }
]), updateboard_members);
router.delete('/deleteboard_members/:id', deleteboard_members);

// Routes for user guide pdfs
router.get('/getAlluser_guide_pdfs', getAlluser_guide_pdfs);
router.post('/creatuser_guide_pdfs', upload([
    {
        name: 'pdf',
        path: 'public/uploads/adminImg',
    }
]),creatuser_guide_pdfs);
router.get('/getuser_guide_pdfsById/:id', getuser_guide_pdfsById);
router.put('/updateuser_guide_pdfs/:id',upload([
    {
        name: 'pdf',
        path: 'public/uploads/adminImg',
    }
]), updateuser_guide_pdfs);
router.delete('/deleteuser_guide_pdfs/:id', deleteuser_guide_pdfs);

// Routes for user_guide_videos
router.get('/getAlluser_guide_videos', getAlluser_guide_videos);
router.post('/creatuser_guide_videos', upload([
    {
        name: 'video',
        path: 'public/uploads/adminImg',
    }
]),creatuser_guide_videos);
router.get('/getuser_guide_videosById/:id', getuser_guide_videosById);
router.put('/updateuser_guide_videos/:id',upload([
    {
        name: 'video',
        path: 'public/uploads/adminImg',
    }
]), updateuser_guide_videos);
router.delete('/deleteuser_guide_videos/:id', deleteuser_guide_videos);
export default router;