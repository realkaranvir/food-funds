import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(json());
app.use(cors());

app.use("/items", itemRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
