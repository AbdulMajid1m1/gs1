import { Server } from "socket.io";

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Adjust according to your client app's origin
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on("requestRandomNumber", () => {
            const randomNumber = generateRandomNumber(); // Implement this function based on your logic
            socket.emit("randomNumber", randomNumber);
        });

        socket.on("verifyNumber", (selectedNumber) => {
            if (verifyNumber(selectedNumber)) { // Implement verifyNumber function
                socket.emit("verificationResult", { success: true });
            } else {
                socket.emit("verificationResult", { success: false });
            }
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

const generateRandomNumber = () => {
    // Your logic to generate a random number
    return Math.floor(Math.random() * 100); // Example implementation
};

const verifyNumber = (selectedNumber) => {
    // Your logic to verify the selected number
    return true; // Example implementation
};

export default socketHandler;
