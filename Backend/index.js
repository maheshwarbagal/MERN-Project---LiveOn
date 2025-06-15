// import mysql from 'mysql2'
import { StatusCodes } from "http-status-codes";
import express from "express";
import { pool } from "./src/models/DBDonar.js";
import DonorRouter from "./src/routes/DonorRoutes.js";
import PatientsRouter from "./src/routes/PatientRoutes.js";
import donor_Router from "./src/routes/Donor_Routes.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 6200;

app.use("/donor", DonorRouter);
app.use("/patient", PatientsRouter);
app.use("/home", donor_Router);

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send({ msg: "WelCome To LiveOn" });
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
