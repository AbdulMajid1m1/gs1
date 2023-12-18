
import express from 'express';
import { createMemberDocument, deleteMemberDocument, getMemberDocuments, updateMemberDocument } from '../../controllers/memberDocumentsController.js';
import { upload } from '../../configs/multerConfig.js';

const router = express.Router();


router.post('/', upload([
    {
        name: 'document',
        path: 'public/uploads/documents/memberDocuments',
    },
]), createMemberDocument);

router.get("/", getMemberDocuments)


router.put('/:id',
    upload([
        {
            name: 'document',
            path: 'public/uploads/documents/memberDocuments',
        },
    ]), updateMemberDocument);

router.delete('/:id', deleteMemberDocument);





export default router;