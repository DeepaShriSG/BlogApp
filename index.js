import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppRoutes from "./src/routes/index.js";

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/", AppRoutes);


app.listen(port, () => console.log(`App listening to ${port}`));
