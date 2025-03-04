import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js"


dotenv.config()

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)



app.listen(3000, () => {
    connectDB();
    console.log("Server running at port:3000");
})