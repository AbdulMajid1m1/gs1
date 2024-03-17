import prisma from '../../prismaClient.js'



export const createMemberLogs = async (data) => {
    try {
        return await prisma.member_history_logs.create({
            data
        });
    } catch (error) {
        // handle the error gracefully
        console.log(error);
    }
}




export const createAdminLogs = async (data) => {
    try {
        return await prisma.admin_history_logs.create({
            data
        });
    } catch (error) {
        // handle the error gracefully
        console.log(error);
    }
}



export const createGtinSubscriptionHistory = async (data) => {
    try {
        return await prisma.gtin_subscription_histories.createMany({
            data
        });
    } catch (error) {
      
        console.error('Error creating GTIN Subscription History:', error);
    }
}

export const createOtherProductsSubscriptionHistory = async (data) => {
    try {
        return await prisma.other_products_subscription_histories.createMany({
            data
        });
    } catch (error) {
        // Handle the error gracefully
        console.error('Error creating Other Products Subscription History:', error);
    }
}
