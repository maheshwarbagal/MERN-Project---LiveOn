import { StatusCodes } from "http-status-codes";
import express from "express";
import mysql from "mysql2";
import { pool } from "../models/DBDonar.js";


export const AddDonor = (req, res) => {
  try {
    const data = req.body;
    const {
      full_name,
      dob,
      gender,
      phone_number,
      email,
      address,
      id_proof,
      blood_group,
      height_cm,
      weight_kg,
      known_conditions,
      current_medications,
      allergies,
      smoking_or_alcohol,
      organs_to_donate,
      donation_type,
      emergency_contact,
    } = req.body;

    const requiredFields = [
      "full_name",
      "dob",
      "gender",
      "phone_number",
      "email",
      "address",
      "id_proof",
      "blood_group",
      "height_cm",
      "weight_kg",
      "known_conditions",
      "current_medications",
      "allergies",
      "smoking_or_alcohol",
      "organs_to_donate",
      "donation_type",
      "emergency_contact",
    ];
    const missingFields = requiredFields.filter(
      (field) => req.body[field] === undefined || req.body[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const query1 = `insert into donors(full_name,dob,gender,phone_number,email,address,id_proof) values(?,?,?,?,?,?,?)`;
    const val1 = [
      data.full_name,
      data.dob,
      data.gender,
      data.phone_number,
      data.email,
      data.address,
      data.id_proof,
    ];

    pool.execute(query1, val1, (err1, result1) => {
      if (err1) {
        console.log(err1);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ msg: "Error in donor insertion" });
      }

      const donorId = result1.insertId;
      const query2 = `insert into medical_info(donor_id, blood_group, height_cm, weight_kg, known_conditions, current_medications, allergies, smoking_or_alcohol) values(?,?,?,?,?,?,?,?)`;
      const val2 = [
        donorId,
        data.blood_group,
        data.height_cm,
        data.weight_kg,
        data.known_conditions,
        data.current_medications,
        data.allergies,
        data.smoking_or_alcohol,
      ];
      pool.execute(query2, val2, (err2, result2) => {
        if (err2) {
          console.log(err2);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ msg: "Error in medical info insertion" });
        }
        const query3 = `insert into organ_donations(donor_id, organs_to_donate, donation_type, emergency_contact) values(?,?,?,?)`;
        const val3 = [
          donorId,
          data.organs_to_donate,
          data.donation_type,
          data.emergency_contact,
        ];
        pool.execute(query3, val3, (err3, result3) => {
          if (err3) {
            console.log(err3);
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .send({ msg: "Error in organ donation insertion" });
          }

          return res
            .status(StatusCodes.OK)
            .send({ msg: "Donor added successfully" });
        });
      });
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ msg: "Something Went Wrong" });
  }
};
export const showAllDonorDetails = (req, res) => {
  try {
    const donorId=parseInt(req.params.donor_id)
    const data = req.body;
    const qry = `SELECT 
        d.donor_id, d.full_name, d.dob, d.gender, d.phone_number, d.email, d.address, d.id_proof,
        m.med_id, m.blood_group, m.height_cm, m.weight_kg, m.known_conditions, 
        m.current_medications, m.allergies, m.smoking_or_alcohol,
        o.donation_id, o.organs_to_donate, o.donation_type, o.emergency_contact
      FROM donors d
      LEFT JOIN medical_info m ON d.donor_id = m.donor_id
      LEFT JOIN organ_donations o ON d.donor_id = o.donor_id
      where d.donor_id=?
    `;

    pool.query(qry, [donorId],(error, result) => {
      if (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem fetching donor data" });
      }
      return res.status(StatusCodes.OK).send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
  }
};
export const showDonorbasic = (req, res) => {
  try {
    
    const organ = req.params.organs_to_donate;
    console.log(organ)
    const qry = `SELECT d.donor_id, d.full_name, d.phone_number, d.email, o.organs_to_donate
      FROM donors d
      JOIN organ_donations o ON o.donor_id = d.donor_id
      WHERE o.organs_to_donate = ?;
    `;
    pool.query(qry,[organ], (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Problem in fetching data" });
      } else {
        if (result.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: "Donor not found" });
      }
        return res.status(StatusCodes.OK).send(result);
      }
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
};
export const showDonorProfile = (req, res) => {
  try {
    const donorId=parseInt(req.params.donor_id)
    const data = req.body;
    const qry = `select d.donor_id,d.full_name,d.phone_number,d.email, o.organs_to_donate from donors d join organ_donations o on o.donor_id=d.donor_id where d.donor_id=?;`;
    pool.query(qry, [donorId],(error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Problem in fetching data" });
      } else {
        return res.status(StatusCodes.OK).send(result);
      }
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
};
export const updateDonor = (req, res) => {
  try {
    const donorId = parseInt(req.params.donor_id);
    
    const data = req.body;

    const {
      full_name,
      dob,
      gender,
      phone_number,
      email,
      address,
      id_proof,
      blood_group,
      height_cm,
      weight_kg,
      known_conditions,
      current_medications,
      allergies,
      smoking_or_alcohol,
      organs_to_donate,
      donation_type,
      emergency_contact,
    } = data;

    const requiredFields = [
      "full_name", "dob", "gender", "phone_number", "email", "address", "id_proof",
      "blood_group", "height_cm", "weight_kg", "known_conditions", "current_medications",
      "allergies", "smoking_or_alcohol", "organs_to_donate", "donation_type", "emergency_contact"
    ];

    const missingFields = requiredFields.filter(
      (field) => data[field] === undefined || data[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const height = parseFloat(height_cm);
    const weight = parseFloat(weight_kg);

    if (isNaN(height) || isNaN(weight)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Height and weight must be valid numbers" });
    }

    if (!["After Death", "Living Donor"].includes(donation_type)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid donation_type" });
    }

    const query1 = `
      UPDATE donors SET 
        full_name = ?, dob = ?, gender = ?, phone_number = ?, email = ?, address = ?, id_proof = ?
      WHERE donor_id = ?`;
    const val1 = [
      full_name, dob, gender, phone_number, email, address, id_proof, donorId
    ];

    pool.execute(query1, val1, (err1, result1) => {
      if (err1) {
        console.log(err1);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error updating donor data" });
      }

      const query2 = `UPDATE medical_info SET
          blood_group = ?, height_cm = ?, weight_kg = ?, known_conditions = ?, current_medications = ?, allergies = ?, smoking_or_alcohol = ?
        WHERE donor_id = ?`;
      const val2 = [
        blood_group, height, weight, known_conditions,
        current_medications, allergies, smoking_or_alcohol, donorId
      ];

      pool.execute(query2, val2, (err2, result2) => {
        if (err2) {
          console.log(err2);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error updating medical info" });
        }

        const query3 = `
          UPDATE organ_donations SET
            organs_to_donate = ?, donation_type = ?, emergency_contact = ?
          WHERE donor_id = ?`;
        const val3 = [
          organs_to_donate, donation_type, emergency_contact, donorId
        ];

        pool.execute(query3, val3, (err3, result3) => {
          if (err3) {
            console.log(err3);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error updating organ donation info" });
          }

          return res.status(StatusCodes.OK).send({ msg: "Donor updated successfully" });
        });
      });
    });
  } catch (error) {
    console.error("Update Donor Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};
export const deleteDonorById = (req, res) => {
  try {
    const donorId = parseInt(req.params.donor_id);
    if (isNaN(donorId)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ msg: "Invalid donor ID" });
    }

    const deleteDonationsQuery = `DELETE FROM organ_donations WHERE donor_id = ?`;
    const deleteMedicalInfoQuery = `DELETE FROM medical_info WHERE donor_id = ?`;
    const deleteDonorQuery = `DELETE FROM donors WHERE donor_id = ?`;

    pool.execute(deleteDonationsQuery, [donorId], (err1) => {
      if (err1) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting organ donations" });
      }

      pool.execute(deleteMedicalInfoQuery, [donorId], (err2) => {
        if (err2) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting medical info" });
        }

        pool.execute(deleteDonorQuery, [donorId], (err3, result3) => {
          if (err3) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting donor" });
          }

          if (result3.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).send({ msg: "Donor not found" });
          }

          return res.status(StatusCodes.OK).send({ msg: "Donor and associated data deleted successfully" });
        });
      });
    });
  } catch (error) {
    console.error("Delete Donor Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};

export const deleteDonor = (req, res) => {
  try {
    const donationId = parseInt(req.params.donation_id);
    const data = req.body;
    const getDonorIdQuery = `SELECT donor_id FROM organ_donations WHERE donation_id = ?`;
    pool.execute(getDonorIdQuery, [donationId], (err1, result1) => {
      if (err1 || result1.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send({ msg: "Donation not found" });
      }

      const donorId = result1[0].donor_id;
      console.log(`donorId is ${donorId}`)

      const deleteDonationQuery = `DELETE FROM organ_donations WHERE donation_id = ?`;
      console.log(`deleteDonationQuery is ${deleteDonationQuery}`)
      pool.execute(deleteDonationQuery, [donationId], (err2, result2) => {
        if (err2) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting donation" });
        }

        const checkOtherDonationsQuery = `SELECT COUNT(*) AS count FROM organ_donations WHERE donor_id = ?`;
        pool.execute(checkOtherDonationsQuery, [donorId], (err3, result3) => {
          if (err3) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error checking donor link" });
          }

          const donationCount = result3[0].count;
          console.log(`donationCount is ${donationCount}`)
          if (donationCount === 0) {
            const deleteMedicalInfoQuery = `DELETE FROM medical_info WHERE donor_id = ?`;
            const deleteDonorQuery = `DELETE FROM donors WHERE donor_id = ?`;

            pool.execute(deleteMedicalInfoQuery, [donorId], (err4) => {
              if (err4) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting medical info" });
              }

              pool.execute(deleteDonorQuery, [donorId], (err5) => {
                if (err5) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting donor" });
                }

                return res.status(StatusCodes.OK).send({ msg: "Donation and related donor data deleted" });
              });
            });
          } else {
            return res.status(StatusCodes.OK).send({ msg: "Donation deleted; donor has other donations" });
          }
        });
      });
    });
  } catch (error) {
    console.error("Delete Donor Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};
