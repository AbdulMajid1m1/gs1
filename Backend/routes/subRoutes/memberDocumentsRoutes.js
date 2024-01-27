
import express from 'express';
import { createMemberDocument, deleteMemberDocument, getMemberDocuments, getMemberFinanceDocuments, getMemberInvoices, getMemberPendingInvoices, regenerateGcpCertificate, updateMemberDocument, updateMemberDocumentStatus } from '../../controllers/memberDocumentsController.js';
import { upload } from '../../configs/multerConfig.js';
import { generalAuth } from '../../middlewares/auth.js';

const router = express.Router();


router.post('/', upload([
    {
        name: 'document',
        path: 'public/uploads/documents/memberDocuments',
    },
]), generalAuth, createMemberDocument);


router.post('/regenerateGcpCertificate', generalAuth, regenerateGcpCertificate);

router.get("/", getMemberDocuments)

router.get("/invoices", getMemberInvoices)

router.get("/pendingInvoices", getMemberPendingInvoices)

router.get("/invoices", getMemberInvoices)

router.get("/finance", getMemberFinanceDocuments)


router.put('/:id',
    upload([
        {
            name: 'document',
            path: 'public/uploads/documents/memberDocuments',
        },
    ]), updateMemberDocument, updateMemberDocument);

router.put("/status/:id", generalAuth, updateMemberDocumentStatus)

router.delete('/:id', generalAuth, deleteMemberDocument);





export default router;