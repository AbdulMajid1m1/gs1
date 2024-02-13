import { Server } from "socket.io";
import { cookieOptions } from "./utils/authUtilities.js"
import { JWT_EXPIRATION, MEMBER_JWT_SECRET } from "./configs/envConfig.js"
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


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // Cleanup user socket and random number info
            const userId = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
            if (userId) {
                delete userSockets[userId];
                delete randomNumberForUsers[userId];
            }
        });
    });

};


export default socketHandler;
