import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import documentRoutes from "./routes/document.route.js";

dotenv.config()

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes);
app.use("/Roadmap", express.static(path.resolve("Roadmap")));
app.use("/templates", express.static(path.resolve("templates"))); // Serve the Templates folder
app.use("/summaries", express.static(path.resolve("summary"))); // Serve the Summaries folder
app.use("/filled_documents", express.static(path.resolve("filled_documents"))); // Serve the filled_documents folder
app.use("/filled_summary", express.static(path.resolve("filled_summary"))); // Serve the filled_summary folder
app.use("/scripts", express.static(path.resolve("scripts"))); // Serve the scripts folder
app.listen(3000, () => {
    connectDB();
    console.log("Server running at port:3000");
})