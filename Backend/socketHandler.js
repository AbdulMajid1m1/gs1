import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "./prismaClient.js";
import {
  ADMIN_JWT_SECRET,
  MEMBER_JWT_SECRET,
  JWT_EXPIRATION,
} from "./configs/envConfig.js";

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
    console.log("A user connected", socket.id);

    // User and Admin Registration
    socket.on("register", ({ userId, clientType }) => {
      const roomName = `${userId}-${clientType}`;
      socket.join(roomName);
      console.log(
        `${clientType} client for user ${userId} registered and joined room ${roomName}`
      );
      // if number is already generated, send it to the user
      const randomNumber = randomNumbersMap.get(userId);
      if (randomNumber) {
        // io.to(roomName).emit('randomNumber', randomNumber);
      }
      // send message to one chaneel for user to verify the connection
      io.emit("verifyConnection", {
        message: "Connection verified",
        userId: userId,
      });
    });

        // User and Admin Registration
        socket.on('register', ({ userId, clientType }) => {
            const roomName = `${userId}-${clientType}`;
            socket.join(roomName);
            console.log(`${clientType} client for user ${userId} registered and joined room ${roomName}`);
            // if number is already generated, send it to the user
            const randomNumber = randomNumbersMap.get(userId);
            if (randomNumber) {
                io.to(roomName).emit('randomNumber', randomNumber);
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
            let userRoomName = `${userId}-web`;
            let mobileRoomName = `${userId}-mobile`;
            try {
                // Retrieve the stored random number for the user
                const randomNumber = randomNumbersMap.get(userId);

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
            // if number is already generated, send it to the user
            const randomNumber = randomNumbersMap.get(adminId);
            if (randomNumber) {
                io.to(adminRoomName).emit('randomNumberForAdmin', randomNumber);
            }

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
            // Retrieve the stored random number for the admin
            const randomNumber = randomNumbersMap.get(adminId);
            let adminRoomName = `admin-${adminId}`;
            try {


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
            // Socket.IO automatically cleans up the rooms the socket was in
        });
    });

    socket.on("verifyNumber", async ({ userId, selectedNumber }) => {
      let userRoomName = `${userId}-web`;
      let mobileRoomName = `${userId}-mobile`;
      try {
        // Retrieve the stored random number for the user
        const randomNumber = randomNumbersMap.get(userId);

        // Compare the selected number with the stored random number
        if (randomNumber === selectedNumber) {
          // Query the database to find the user
          const user = await prisma.users.findUnique({
            where: { id: userId },
            include: { carts: true },
          });

          if (!user) {
            // If the user is not found, send an authentication error
            io.to(mobileRoomName).emit("authError", {
              message: "Verification failed",
            });
            return io
              .to(userRoomName)
              .emit("authError", { message: "Verification failed" });
          }

          // Generate a JWT token
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            MEMBER_JWT_SECRET,
            { expiresIn: "1m" }
          );

          // Send the token and user data in the response
          delete user.password;
          io.to(mobileRoomName).emit("authSuccess", {
            message: "Authentication successful",
            memberData: user,
            getCredentialsToken: token,
          });
          return io
            .to(userRoomName)
            .emit("authSuccess", {
              message: "Authentication successful",
              memberData: user,
              getCredentialsToken: token,
            });
        } else {
          // If the numbers don't match, send an authentication error
          io.to(mobileRoomName).emit("authError", {
            message: "Authentication failed! Try again",
          });
          return io
            .to(userRoomName)
            .emit("authError", { message: "Authentication failed! Try again" });
        }
      } catch (error) {
        console.error("Verification error:", error);
        io.to(mobileRoomName).emit("authError", {
          message: "Internal server error",
        });
        return io
          .to(userRoomName)
          .emit("authError", { message: "Internal server error" });
      }
    });

    // Admin Registration
    socket.on("registerAdmin", ({ adminId }) => {
      const adminRoomName = `admin-${adminId}`;
      socket.join(adminRoomName);
      console.log(
        `Admin ${adminId} registered and joined room ${adminRoomName}`
      );
      // if number is already generated, send it to the user
      const randomNumber = randomNumbersMap.get(adminId);
      if (randomNumber) {
        // io.to(adminRoomName).emit('randomNumberForAdmin', randomNumber);
      }
    });

    // Send Random Number to Admin
    socket.on("sendRandomNumberToAdmin", ({ adminId, numbers }) => {
      const adminRoomName = `admin-${adminId}`;
      io.to(adminRoomName).emit("randomNumberForAdmin", numbers);
      console.log(`Sent randomNumber ${numbers} to admin ${adminId}`);

      // Save the random number in the map
      randomNumbersMap.set(adminId, numbers);
    });

    // Verify Admin Number
    socket.on("verifyAdminNumber", async ({ adminId, selectedNumber }) => {
      // Retrieve the stored random number for the admin
      const randomNumber = randomNumbersMap.get(adminId);
      let adminRoomName = `admin-${adminId}`;
      try {
        // Compare the selected number with the stored random number
        if (randomNumber === selectedNumber) {
          // Query the database to find the admin
          const admin = await prisma.admins.findUnique({
            where: { id: adminId },
          });

          if (!admin) {
            io.to(adminRoomName).emit("authError", {
              message: "Verification failed! Try Again",
            });
          }

          // Generate a JWT token for the admin
          const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            ADMIN_JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
          );

          // Optionally, remove sensitive information from the admin object
          delete admin.password;

          io.to(adminRoomName).emit("authSuccess", {
            message: "Authentication successful",
            adminData: admin,
            getCredentialsToken: token,
          });
        } else {
          // If the numbers don't match, send an authentication error
          io.to(adminRoomName).emit("authError", {
            message: "Authentication failed! Try again",
          });
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        io.to(adminRoomName).emit("authError", {
          message: "Internal server error",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Socket.IO automatically cleans up the rooms the socket was in
    });
  });
};

export default socketHandler;
