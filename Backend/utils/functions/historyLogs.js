import prisma from '../../prismaClient.js'



export const createMemberLogs = async (data) => {
    try {        
        return await prisma.member_history_logs.create({
            data: value,
        });
    } catch (error) {
        // handle the error gracefully
        console.log(error);
    }
}
