import { Server } from "socket.io";
import { cookieOptions } from "./utils/authUtilities.js"
import { ADMIN_JWT_SECRET, JWT_EXPIRATION, MEMBER_JWT_SECRET } from "./configs/envConfig.js"
import prisma from "./prismaClient.js";
import jwt from 'jsonwebtoken';
const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            // origin: "http://localhost:3000", // Adjust according to your client app's origin
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // Store user sockets and random numbers
    let userSockets = {};
    let randomNumberForUsers = {};
    // Store admin sockets and random numbers
    let adminSockets = {};
    let randomNumberForAdmins = {};
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on('register', (userId) => {
            userSockets[userId] = socket.id;
            console.log(`User registered: ${userId}`);
        });

        // Handle sending random number to a specific user
        socket.on('sendRandomNumber', ({ userId, numbers }) => {
            const userSocketId = userSockets[userId];
            console.log("userId: ", userId, "number: ", numbers)
            if (userSocketId) {
                randomNumberForUsers[userId] = numbers;
                console.log("rand", randomNumberForUsers)
                io.to(userSocketId).emit('randomNumber', numbers);
            }
        });

        // // Handle number selection from mobile
        // socket.on('verifyNumber', ({ userId, selectedNumber }) => {
        //     if (randomNumberForUsers[userId] && randomNumberForUsers[userId].includes(selectedNumber)) {
        //         // Remove the selected number from the array
        //         // randomNumberForUsers[userId] = randomNumberForUsers[userId].filter(number => number !== selectedNumber);

        //         console.log("succes")

        //         io.to(userSockets[userId]).emit('authSuccess', { message: "Authentication successful" });
        //     } else {
        //         console.log("failed")
        //         io.to(userSockets[userId]).emit('authError', { message: "Authentication failed" });
        //     }
        // });
        // Handle number selection from mobile
        socket.on('verifyNumber', async ({ userId, selectedNumber }) => {
            console.log("randomNumberForUsers", randomNumberForUsers)
            console.log("userID:", userId)
            console.log("seNO", selectedNumber)
            console.log("randomNumberForUsersdd", randomNumberForUsers[userId])
            try {

                if (randomNumberForUsers[userId] && randomNumberForUsers[userId].includes(selectedNumber)) {

                    // Query the database to find the user
                    const user = await prisma.users.findUnique({
                        where: { id: userId.toString() },
                        include: { carts: true },
                    });

                    if (!user) {
                        return io.to(userSockets[userId]).emit('authError', { message: "User not found" });
                    }


                    // Generate a JWT token
                    const token = jwt.sign({ userId: user.id, email: user.email }, MEMBER_JWT_SECRET, { expiresIn: '1m' });

                    // Send the token and user data in the response
                    delete user.password;
                    // res.cookie("memberToken", token, cookieOptions());
                    io.to(userSockets[userId]).emit('authSuccess', { message: "Authentication successful", memberData: user, getCredentialsToken: token });
                } else {
                    io.to(userSockets[userId]).emit('authError', { message: "Authentication failedss" });
                }
            } catch (error) {
                console.error(error);
                io.to(userSockets[userId]).emit('authError', { message: "Internal server error" });
            }
        });







        socket.on('registerAdmin', (adminId) => {
            adminSockets[adminId.toString()] = socket.id;
            console.log(`Admin registered: ${adminId}`);
        });
        socket.on('sendRandomNumberToAdmin', ({ adminId, numbers }) => {
            const adminSocketId = adminSockets[adminId];
            console.log("adminId: ", adminId, "number: ", numbers)
            console.log("adminSocketId: ", adminSocketId)
            if (adminSocketId) {
                randomNumberForAdmins[adminId] = numbers;
                console.log("rand for admin", randomNumberForAdmins)
                io.to(adminSocketId).emit('randomNumberForAdmin', numbers);
            }
        });

        socket.on('verifyAdminNumber', async ({ adminId, selectedNumber }) => {
            console.log("randomNumberForAdmins", randomNumberForAdmins)
            console.log("adminSockets", adminSockets)
            console.log("adminID:", adminId)
            console.log("selectedNumber", selectedNumber)
            console.log("randomNumberForAdmins[adminId]", randomNumberForAdmins[adminId])
            try {
                if (randomNumberForAdmins[adminId] && randomNumberForAdmins[adminId].includes(selectedNumber)) {
                    // Query the database to find the admin
                    console.log("triiggered", randomNumberForAdmins[adminId], " ", selectedNumber)
                    const admin = await prisma.admins.findUnique({
                        where: { id: adminId.toString() },
                    });

                    if (!admin) {
                        return io.to(adminSockets[adminId]).emit('authError', { message: "Admin not found" });
                    }

                    // Generate a JWT token for the admin
                    const token = jwt.sign({ adminId: admin.id, email: admin.email }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });

                    // Optionally, remove sensitive information from the admin object
                    delete admin.password;
                    console.log("socketAuth", adminSockets[adminId])
                    io.to(adminSockets[adminId]).emit('authSuccess', { message: "Authentication successful", adminData: admin, getCredentialsToken: token });
                } else {
                    io.to(adminSockets[adminId]).emit('authError', { message: "Authentication failed" });
                }
            } catch (error) {
                console.error(error);
                io.to(adminSockets[adminId]).emit('authError', { message: "Internal server error" });
            }
        });


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // Cleanup user socket and random number info
            const userId = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
            if (userId) {
                delete userSockets[userId];
                delete randomNumberForUsers[userId];
            }

            // Cleanup admin socket and random number info
            const adminId = Object.keys(adminSockets).find(key => adminSockets[key] === socket.id);
            if (adminId) {
                delete adminSockets[adminId];
                delete randomNumberForAdmins[adminId];
            }
        });
    });

};


export default socketHandler;
