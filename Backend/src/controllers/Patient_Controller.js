import { StatusCodes } from "http-status-codes";
import { hashSync,compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../models/DBDonar.js";


export function registerPatient(request, response) {
  try {
    const data = request.body;
    const encryptedPassword = hashSync(data.PatientPassword, 10);
    data.password = "";

    const qry = `INSERT INTO Patient_signup_details(PatientName, PatientUserName, PatientPassword, Email) VALUES (?, ?, ?, ?)`;

    pool.query(
      qry,
      [data.Patientname, data.PatientUsername, encryptedPassword, data.Email],
      (error, result) => {
        if (error) {
          console.log(error);
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Issue in the Patient Username or Email" });
        } else {
          // Fetch the newly registered patient by email
          const fetchQry = `SELECT * FROM Patient_signup_details WHERE Email = ?`;
          pool.query(fetchQry, [data.Email], (fetchErr, fetchResult) => {
            if (fetchErr || fetchResult.length === 0) {
              response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({ message: "Registration successful, but token failed" });
            } else {
              const token = jwt.sign(
                { patientID: fetchResult[0].id }, // assuming 'id' is the primary key column
                "donor@123",
                { expiresIn: "1h" }
              );
              response.status(StatusCodes.OK).send({
                message: "Patient Registered Successfully",
                token: token,
              });
            }
          });
        }
      }
    );
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
}

export function patientLogin(request, response) {
  try {
    const requestdata = request.body;

    const isEmail = /@gmail\.com$/.test(requestdata.PatientUsername);
    const qry = isEmail
      ? `SELECT * FROM Patient_signup_details WHERE Email = ?`
      : `SELECT * FROM Patient_signup_details WHERE PatientUserName = ?`;

    pool.query(qry, [requestdata.PatientUsername], (error, result) => {
      if (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Problem while logging you in...please try again later",
        });
      } else {
        if (result.length === 0) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Username is Invalid" });
        } else {
          if (
            compareSync(requestdata.PatientPassword, result[0].PatientPassword)
          ) {
            const token = jwt.sign(
              { patientID: result[0].patientId },
              "donor@123"
            );
            response
              .status(StatusCodes.OK)
              .send({ message: "Login successful", token: token , organ :"Kidney"});
            console.log(response);
          } else {
            response
              .status(StatusCodes.BAD_REQUEST)
              .send({ message: "Password is Invalid" });
          }
        }
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something Went Wrong" });
  }
}


// // import { getConnectionObject } from "../configs/DbConfig.js";
// import { StatusCodes } from "http-status-codes";
// import { compareSync, hashSync } from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { pool } from "../models/DBDonar.js";
// // const conn = getConnectionObject();

// export function registerPatient(request, response) {
//   try {
//     const data = request.body;
//     const encryptedPassword = hashSync(data.PatientPassword, 10);
//     data.password = "";
//     const qry = `insert into Patient_signup_details(PatientName,PatientUserName,PatientPassword,Email) values ('${data.Patientname}','${data.PatientUsername}','${encryptedPassword}','${data.Email}')`;
//     pool.query(qry, (error, result) => {
//       if (error) {
//         console.log(error);
//         response
//           .status(StatusCodes.BAD_REQUEST)
//           .send({ message: "Issue in the Patient Username" });
//       } else {
//         response.status(StatusCodes.OK).send({ message: "Patient Registered" });
//       }
//     });
//   } catch (error) {
//     response
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send({ message: "Something went wrong" });
//   }
// }

// export function patientLogin(request, response) {
//   try {
//     const requestdata = request.body;

//     const isEmail = /@gmail\.com$/.test(requestdata.PatientUsername);
//     const qry = isEmail
//       ? `SELECT * FROM Patient_signup_details WHERE Email = ?`
//       : `SELECT * FROM Patient_signup_details WHERE PatientUserName = ?`;

//     pool.query(qry, [requestdata.PatientUsername], (error, result) => {
//       if (error) {
//         console.log(error);
//         response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//           message: "Problem while logging you in...please try again later",
//         });
//       } else {
//         if (result.length === 0) {
//           response
//             .status(StatusCodes.BAD_REQUEST)
//             .json({ message: "Username is Invalid" });
//         } else {
//           if (
//             compareSync(requestdata.PatientPassword, result[0].PatientPassword)
//           ) {
//             const token = jwt.sign(
//               { patientID: result[0].patientId },
//               "donor@123"
//             );
//             response
//               .status(StatusCodes.OK)
//               .send({ message: "Login successful", token: token });
//             console.log(response);
//           } else {
//             response
//               .status(StatusCodes.BAD_REQUEST)
//               .send({ message: "Password is Invalid" });
//           }
//         }
//       }
//     });
//   } catch (error) {
//     response
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send({ message: "Something Went Wrong" });
//   }
// }
