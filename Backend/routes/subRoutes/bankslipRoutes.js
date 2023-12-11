// Require necessary modules and middleware
import express from 'express';
import { uploadBankSlip, getBankSlipDetails, updateBankSlip, deleteBankSlip } from '../../controllers/bankslipController.js';
import { upload } from '../../configs/multerConfig.js';

const bankSlipRouter = express.Router();

// Upload a bank slip document
bankSlipRouter.post('/', upload([
    {
        name: 'bankSlip',
        path: 'public/uploads/documents/memberBankslips',
    }
]), uploadBankSlip);

// Get bank slip details
bankSlipRouter.get('/', getBankSlipDetails);

// Update a bank slip
bankSlipRouter.put('/:bankSlipId', upload([
    {
        name: 'bankSlip',
        path: 'public/uploads/documents/memberBankslips',
    }
]), updateBankSlip);

// Delete a bank slip
bankSlipRouter.delete('/:bankSlipId', deleteBankSlip);

export default bankSlipRouter;
