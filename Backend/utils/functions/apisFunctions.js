import prisma from "../../prismaClient.js";
import { createError } from "../createError.js";

export async function getPendingInvoiceStatus(userId) {
    try {
        const pendingInvoiceCount = await prisma.member_documents.count({
            where: {
                AND: [
                    { user_id: userId },
                    {
                        OR: [
                            { type: 'invoice' },
                            { type: 'renewal_invoice' },
                            { type: 'upgrade_invoice' },
                            { type: 'downgrade_invoice' },
                            { type: 'additional_gln_invoice' },
                            { type: 'additional_gtin_invoice' },
                        ]
                    },
                    { status: 'pending' }
                ]
            }
        });

        // Check the count and update the 'pending_invoices' column in 'users' table
        const pendingStatus = pendingInvoiceCount === 0 ? 'none' : 'pending_for_approval';
        await prisma.users.update({
            where: { id: userId },
            data: { pending_invoices: pendingStatus }
        });

        return pendingInvoiceCount;
    } catch (error) {
        console.error('Error in getPendingInvoiceStatus:', error);
        throw createError(500, 'Internal Server Error');
    }
}
