import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  Donorname: Yup.string().required("Donor Name is Required"),
  DonorUsername: Yup.string().required("Username is Required"),
  DonorPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/,
      "Password must be at least 4 characters, no more than 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit"
    ),
  Email: Yup.string()
    .required()
    .matches(/@gmail\.com$/, "Enter proper Email Address"),
});
