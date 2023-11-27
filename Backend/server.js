import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rootRoute from "./routes/RootRoute.js";
// import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();

const allowedOrigins = [
    "http://localhost:3000"

];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// calling the routes
app.use("/api", rootRoute);



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // return res.status(errorStatus).send(errorMessage);
    return res.status(errorStatus).json({ error: errorMessage });
});



const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// app.get("/users", async (req, res) => {
//     const users = await prisma.users.findMany();
//     function customJSONStringify(obj) {
//         return JSON.stringify(obj, (key, value) =>
//             typeof value === 'bigint' ? value.toString() : value
//         );
//     }
//     // const test = await pri

//     // Usage
//     res.send(customJSONStringify(users));
// }
// );