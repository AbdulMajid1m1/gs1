import express from 'express';
import {
    createGtinHelperReport,
    getGtinHelperReports,
    updateGtinHelperReport,
    deleteGtinHelperReport,
    sendEmailToGtinReporter,
} from '../../controllers/gtinHelperReportsController.js';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';

const router = express.Router();

// Configure multer for image uploads
const uploadConfig = upload([
    {
        name: 'report_images',
        path: 'public/uploads/images/gtinReportImages',
    },
]);

router.post('/', uploadConfig, generalAuth, createGtinHelperReport);
router.get('/', generalAuth, getGtinHelperReports);
router.put('/:id', uploadConfig, generalAuth, updateGtinHelperReport);
router.delete('/:id', generalAuth, deleteGtinHelperReport);
router.post('/sendEmailToGtinReporter', generalAuth, sendEmailToGtinReporter);
export default router;
