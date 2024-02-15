import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import prisma from "./prismaClient.js";
import { ADMIN_JWT_SECRET, MEMBER_JWT_SECRET, JWT_EXPIRATION } from "./configs/envConfig.js";

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust this to match your client app's origin
            methods: ["GET", "POST"],
        },
    });
    // Define a Map to store random numbers for each user
    const randomNumbersMap = new Map();
    io.on("connection", (socket) => {
<<<<<<< HEAD
        console.log("a user connected", socket.id);
        // Emit a connection success event right after a successful connection
        socket.emit('connectionSuccess', { message: "Successfully connected to the server." });
        socket.on('register', (userId) => {
            // Update the mapping of userId to the new socketId
            userSockets[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID ${socket.id}`);

            // Optionally, if you keep track of the last randomNumber sent to the user,
            // you can resend it upon reconnection
            if (randomNumberForUsers[userId]) {
                io.to(socket.id).emit('randomNumber', randomNumberForUsers[userId]);
            }
        });

        // Handle sending random number to a specific user
        socket.on('sendRandomNumber', ({ userId, numbers }) => {
            const userSocketId = userSockets[userId];
            console.log(`Sending random number to ${userId} with ${numbers}`);
            console.log("userId: ", userId, "number: ", numbers)
            if (userSocketId) {
                randomNumberForUsers[userId] = numbers;
                console.log("rand", randomNumberForUsers)
                io.to(userSocketId).emit('randomNumber', numbers);
=======
        console.log("A user connected", socket.id);

        // User and Admin Registration
        socket.on('register', ({ userId, clientType }) => {
            const roomName = `${userId}-${clientType}`;
            socket.join(roomName);
            console.log(`${clientType} client for user ${userId} registered and joined room ${roomName}`);
            // if number is already generated, send it to the user
            const randomNumber = randomNumbersMap.get(userId);
            if (randomNumber) {
                socket.emit('randomNumber', randomNumber);
>>>>>>> 2f7209f56f064f05584642f0cf27dade79702a26
            }
        });

        // Send Random Number to Mobile Users
        socket.on('sendRandomNumber', ({ userId, numbers }) => {
            const mobileRoomName = `${userId}-mobile`;
            io.to(mobileRoomName).emit('randomNumber', numbers);
            console.log(`Sent randomNumber ${numbers} to mobile for userId: ${userId}`);
            // Save the random number in the map
            randomNumbersMap.set(userId, numbers);
        });


        socket.on('verifyNumber', async ({ userId, selectedNumber }) => {
            try {
                // Retrieve the stored random number for the user
                const randomNumber = randomNumbersMap.get(userId);
                let userRoomName = `${userId}-web`;
                let mobileRoomName = `${userId}-mobile`;
                // Compare the selected number with the stored random number
                if (randomNumber === selectedNumber) {
                    // Query the database to find the user
                    const user = await prisma.users.findUnique({
                        where: { id: userId },
                        include: { carts: true },
                    });

                    if (!user) {
                        // If the user is not found, send an authentication error
                        io.to(mobileRoomName).emit('authError', { message: "Verification failed" });
                        return io.to(userRoomName).emit('authError', { message: "Verification failed" });


                    }

                    // Generate a JWT token
                    const token = jwt.sign({ userId: user.id, email: user.email }, MEMBER_JWT_SECRET, { expiresIn: '1m' });

                    // Send the token and user data in the response
                    delete user.password;
                    io.to(mobileRoomName).emit('authSuccess', { message: "Authentication successful", memberData: user, getCredentialsToken: token });
                    return io.to(userRoomName).emit('authSuccess', { message: "Authentication successful", memberData: user, getCredentialsToken: token });

                } else {
                    // If the numbers don't match, send an authentication error
                    io.to(mobileRoomName).emit('authError', { message: "Authentication failed! Try again" });
                    return io.to(userRoomName).emit('authError', { message: "Authentication failed! Try again" });
                }
            } catch (error) {
                console.error("Verification error:", error);
                io.to(mobileRoomName).emit('authError', { message: "Internal server error" });
                return io.to(userRoomName).emit('authError', { message: "Internal server error" });

            }
        });


        // Admin Registration
        socket.on('registerAdmin', ({ adminId }) => {
            const adminRoomName = `admin-${adminId}`;
            socket.join(adminRoomName);
            console.log(`Admin ${adminId} registered and joined room ${adminRoomName}`);
        });

        // Send Random Number to Admin
        socket.on('sendRandomNumberToAdmin', ({ adminId, numbers }) => {
            const adminRoomName = `admin-${adminId}`;
            io.to(adminRoomName).emit('randomNumberForAdmin', numbers);
            console.log(`Sent randomNumber ${numbers} to admin ${adminId}`);

            // Save the random number in the map
            randomNumbersMap.set(adminId, numbers);
        });

        // Verify Admin Number
        socket.on('verifyAdminNumber', async ({ adminId, selectedNumber }) => {
            try {
                // Retrieve the stored random number for the admin
                const randomNumber = randomNumbersMap.get(adminId);
                let adminRoomName = `admin-${adminId}`;
                // Compare the selected number with the stored random number
                if (randomNumber === selectedNumber) {
                    // Query the database to find the admin
                    const admin = await prisma.admins.findUnique({ where: { id: adminId } });

                    if (!admin) {
                        io.to(adminRoomName).emit('authError', { message: "Verification failed! Try Again" });
                    }

                    // Generate a JWT token for the admin
                    const token = jwt.sign({ adminId: admin.id, email: admin.email }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });

                    // Optionally, remove sensitive information from the admin object
                    delete admin.password;

                    io.to(adminRoomName).emit('authSuccess', { message: "Authentication successful", adminData: admin, getCredentialsToken: token });
                } else {
                    // If the numbers don't match, send an authentication error
                    io.to(adminRoomName).emit('authError', { message: "Authentication failed! Try again" });
                }
            } catch (error) {
                console.error("Admin verification error:", error);
                io.to(adminRoomName).emit('authError', { message: "Internal server error" });
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
<<<<<<< HEAD
            // Cleanup user socket and random number info
            const userId = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
            console.log(`User disconnected: userId: ${userId}`);
            if (userId) {
                console.log(`User disconnected: ${socket.id}`);
                console.log(`User disconnected: ${userId}`);    
                delete userSockets[userId];
                delete randomNumberForUsers[userId];
            }

            // Cleanup admin socket and random number info
            const adminId = Object.keys(adminSockets).find(key => adminSockets[key] === socket.id);
            if (adminId) {
                delete adminSockets[adminId];
                delete randomNumberForAdmins[adminId];
            }
=======
            // Socket.IO automatically cleans up the rooms the socket was in
>>>>>>> 2f7209f56f064f05584642f0cf27dade79702a26
        });
    });
};

export default socketHandler;
