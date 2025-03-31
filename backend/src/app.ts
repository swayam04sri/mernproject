import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();
const app = express();
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
  
app.use(cors());
app.use(express.json());

app.use(errorMiddleware);

export default app;
