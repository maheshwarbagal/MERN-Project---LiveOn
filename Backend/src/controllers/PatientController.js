import { StatusCodes } from "http-status-codes";
import express from "express";
import mysql from "mysql2";
import { pool } from "../models/DBDonar.js";

// Add Patient
export const addPatient = (req, res) => {
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
      known_conditions,
      current_medications,
      allergies,
      emergency_contact,
      organ_needed,
      urgency_level,
    } = data;

    const requiredFields = [
      "full_name", "dob", "gender", "phone_number", "email", "address", "id_proof",
      "blood_group", "known_conditions", "current_medications", "allergies",
      "emergency_contact", "organ_needed", "urgency_level"
    ];

    const missingFields = requiredFields.filter(
      (field) => data[field] === undefined || data[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const query1 = `INSERT INTO patients(full_name, dob, gender, phone_number, email, address, id_proof) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const val1 = [full_name, dob, gender, phone_number, email, address, id_proof];

    pool.execute(query1, val1, (err1, result1) => {
      if (err1) {
        console.log(err1);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error inserting patient" });
      }

      const patientId = result1.insertId;

      const query2 = `INSERT INTO patient_medical_info(patient_id, blood_group, known_conditions, current_medications, allergies, emergency_contact, organ_needed, urgency_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const val2 = [
        patientId, blood_group, known_conditions, current_medications,
        allergies, emergency_contact, organ_needed, urgency_level
      ];

      pool.execute(query2, val2, (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error inserting medical info" });
        }

        return res.status(StatusCodes.OK).send({ msg: "Patient added successfully" });
      });
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};

// Show Basic Patient Info
export const showPatientBasic = (req, res) => {
  try {
    const organ =req.params.organ_needed
    const qry = `SELECT p.patient_id, p.full_name, p.phone_number, m.organ_needed, m.urgency_level FROM patients p JOIN patient_medical_info m ON p.patient_id = m.patient_id where m.organ_needed=?`;
    pool.query(qry,[organ], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem fetching data" });
      }
      return res.status(StatusCodes.OK).send(result);
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
  }
};

export const showPatientAllDetails = (req, res) => {
  try {
    const patientId = parseInt(req.params.patient_id);
    
    // Validate patientId
    if (isNaN(patientId)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ 
        message: "Invalid patient ID. Must be a number." 
      });
    }

    const qry = `SELECT 
        p.patient_id, p.full_name, p.dob, p.gender, p.phone_number, 
        p.email, p.address, p.id_proof,
        m.med_id, m.organ_needed, m.urgency_level, 
        m.blood_group, m.known_conditions, 
        m.current_medications, m.allergies, m.emergency_contact
      FROM patients p
      LEFT JOIN patient_medical_info m ON p.patient_id = m.patient_id
      WHERE p.patient_id = ?
    `;

    pool.query(qry, [patientId], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
          message: "Problem fetching patient data" 
        });
      }
      
      // If no patient found
      if (result.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send({ 
          message: "Patient not found" 
        });
      }
      
      return res.status(StatusCodes.OK).send(result[0]); // Return single patient object
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
      message: "Something went wrong" 
    });
  }
};
export const showPatientprofile = (req, res) => {
  try {
    const patientId = parseInt(req.params.patient_id);
    const qry = `SELECT p.patient_id, p.full_name, p.phone_number, m.organ_needed, m.urgency_level FROM patients p JOIN patient_medical_info m ON p.patient_id = m.patient_id where p.patient_id= ?`;
    pool.query(qry,[patientId] ,(error, result) => {
      if (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem fetching data" });
      }
      return res.status(StatusCodes.OK).send(result);
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
  }
};

// Update Patient
export const updatePatient = (req, res) => {
  try {
    const patientId = parseInt(req.params.patient_id);
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
      known_conditions,
      current_medications,
      allergies,
      emergency_contact,
      organ_needed,
      urgency_level,
    } = data;

    const requiredFields = [
      "full_name", "dob", "gender", "phone_number", "email", "address", "id_proof",
      "blood_group", "known_conditions", "current_medications", "allergies",
      "emergency_contact", "organ_needed", "urgency_level"
    ];

    const missingFields = requiredFields.filter(
      (field) => data[field] === undefined || data[field] === null
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const query1 = `
      UPDATE patients SET 
        full_name = ?, dob = ?, gender = ?, phone_number = ?, email = ?, address = ?, id_proof = ?
      WHERE patient_id = ?`;
    const val1 = [
      full_name, dob, gender, phone_number, email, address, id_proof, patientId
    ];

    pool.execute(query1, val1, (err1) => {
      if (err1) {
        console.log(err1);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error updating patient" });
      }

      const query2 = `
        UPDATE patient_medical_info SET
          blood_group = ?, known_conditions = ?, current_medications = ?, allergies = ?, emergency_contact = ?, organ_needed = ?, urgency_level = ?
        WHERE patient_id = ?`;
      const val2 = [
        blood_group, known_conditions, current_medications, allergies,
        emergency_contact, organ_needed, urgency_level, patientId
      ];

      pool.execute(query2, val2, (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error updating medical info" });
        }

        return res.status(StatusCodes.OK).send({ msg: "Patient updated successfully" });
      });
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};

// Delete Patient
export const deletePatient = (req, res) => {
  try {
    const patientId = parseInt(req.params.patient_id);

    const deleteQuery = `DELETE FROM patients WHERE patient_id = ?`;
    pool.execute(deleteQuery, [patientId], (err) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Error deleting patient" });
      }

      return res.status(StatusCodes.OK).send({ msg: "Patient and related medical info deleted" });
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Something went wrong" });
  }
};
