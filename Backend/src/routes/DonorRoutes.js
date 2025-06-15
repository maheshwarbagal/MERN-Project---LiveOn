import express from 'express'
import { verifyToken } from '../middlewares/VerifyTokens.js';
import { AddDonor,deleteDonor,updateDonor,showDonorbasic,showAllDonorDetails,showDonorProfile,deleteDonorById } from '../controllers/DonorController.js';
const DonorRouter=express.Router();

DonorRouter.post('/',verifyToken,AddDonor);
DonorRouter.get('/:organs_to_donate',verifyToken,showDonorbasic);
DonorRouter.get('/profile/:donor_id',verifyToken,showDonorProfile);
DonorRouter.get('/det/:donor_id',verifyToken,showAllDonorDetails);
DonorRouter.put('/:donor_id',verifyToken,updateDonor);
DonorRouter.delete('/donation/:donation_id',verifyToken,deleteDonor);
DonorRouter.delete('/:donor_id',verifyToken,deleteDonorById);

export default DonorRouter;