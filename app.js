import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import connectDB from "./db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB
app.use(express.json());
app.use(bodyParser.json());

app.use("/", employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
