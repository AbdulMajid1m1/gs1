import { Server } from "socket.io";

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
            if (userSocketId) {
                randomNumberForUsers[userId] = numbers.find(number => number.isCorrect).number;
                io.to(userSocketId).emit('randomNumber', numbers);
            }
        });

        // Handle number selection from mobile
        socket.on('verifyNumber', ({ userId, selectedNumber }) => {
            if (randomNumberForUsers[userId] && randomNumberForUsers[userId] === selectedNumber) {
                io.to(userSockets[userId]).emit('authSuccess', { message: "Authentication successful" });
            } else {
                io.to(userSockets[userId]).emit('authError', { message: "Authentication failed" });
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
