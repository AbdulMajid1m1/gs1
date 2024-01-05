
import express from 'express';
import { createMemberDocument, deleteMemberDocument, getMemberDocuments, getMemberFinanceDocuments, getMemberInvoices, getMemberPendingInvoices, updateMemberDocument, updateMemberDocumentStatus } from '../../controllers/memberDocumentsController.js';
import { upload } from '../../configs/multerConfig.js';

const router = express.Router();


router.post('/', upload([
    {
        name: 'document',
        path: 'public/uploads/documents/memberDocuments',
    },
]), createMemberDocument);

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
    ]), updateMemberDocument);

router.put("/status/:id", updateMemberDocumentStatus)

router.delete('/:id', deleteMemberDocument);





export default router;