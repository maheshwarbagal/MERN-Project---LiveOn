// import { getConnectionObject } from "../configs/DbConfig.js";
import { StatusCodes } from "http-status-codes";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../models/DBDonar.js";
// const conn = getConnectionObject();

export function registerDonor(request, response) {
  try {
    const data = request.body;
    const encryptedPassword = hashSync(data.DonorPassword, 10);
    data.password = "";

    const qry = `INSERT INTO Donor_SignUp_Details (DonorName, DonorUserName, DonorPassword, Email) VALUES (?, ?, ?, ?)`;

    pool.query(
      qry,
      [data.Donorname, data.DonorUsername, encryptedPassword, data.Email],
      (error, result) => {
        if (error) {
          console.log(error);
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Issue in the Donor Username or Email" });
        } else {
          // console.log(process.env.JWT_SECRET)
          const fetchQry = `SELECT * FROM Donor_SignUp_Details WHERE Email = ?`;
          pool.query(fetchQry, [data.Email], (fetchErr, fetchResult) => {
            if (fetchErr || fetchResult.length === 0) {
              response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({ message: "Registration successful, but token failed" });
            } else {
              const token = jwt.sign(
                { donorID: fetchResult[0].id },
                "donor@123",
                { expiresIn: "1h" }
              );
              response.status(StatusCodes.OK).send({
                message: "Donor Registered Successfully",
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

export function donorLogin(request, response) {
  try {
    const requestdata = request.body;

    const isEmail = /@gmail\.com$/.test(requestdata.DonorUsername);
    const qry = isEmail
      ? `SELECT * FROM Donor_SignUp_Details WHERE Email = ?`
      : `SELECT * FROM Donor_SignUp_Details WHERE DonorUserName = ?`;

    pool.query(qry, [requestdata.DonorUsername], (error, result) => {
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
          if (compareSync(requestdata.DonorPassword, result[0].DonorPassword)) {
            const token = jwt.sign({ donorID: result[0].donorId }, "donor@123");
            response
              .status(StatusCodes.OK)
              .send({ message: "Login successful", token: token, organ:"Liver"});
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
