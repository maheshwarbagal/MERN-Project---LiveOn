import express from 'express'
import { verifyToken } from '../middlewares/VerifyTokens.js';
import { addPatient,deletePatient,updatePatient,showPatientBasic,showPatientprofile,showPatientAllDetails } from '../controllers/PatientController.js';
const PatientsRouter=express.Router();

PatientsRouter.get('/:organ_needed',verifyToken,showPatientBasic);
PatientsRouter.get('/profile/:patient_id',verifyToken,showPatientprofile);
PatientsRouter.get('/det/:patient_id',verifyToken,showPatientAllDetails);
PatientsRouter.post('/',verifyToken,addPatient);
PatientsRouter.delete('/:patient_id',verifyToken,deletePatient);
PatientsRouter.put('/:patient_id',verifyToken,updatePatient);


export default PatientsRouter;