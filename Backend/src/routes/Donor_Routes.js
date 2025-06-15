import express from "express";
import { verifyToken } from "../middlewares/VerifyTokens.js";
import { registerDonor, donorLogin } from "../controllers/Donor_Controller.js";
import {
  patientLogin,
  registerPatient,
} from "../controllers/Patient_Controller.js";

const donor_Router = express.Router();

donor_Router.post("/donor", registerDonor);
donor_Router.post("/login", donorLogin);
donor_Router.post("/patient", registerPatient);
donor_Router.post("/patientLogin", patientLogin);

export default donor_Router;
