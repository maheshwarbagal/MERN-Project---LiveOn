import axios from "axios";

export function registerAsDonor(values) {
  return axios.post("http://localhost:6200/home/donor", values);
}
export function loginAsDonor(data) {
  return axios.post("http://localhost:6200/home/login", data);
}
export function loginAsPatient(data) {
  return axios.post("http://localhost:6200/home/login", data);
}
export function registerAsPatient(data) {
  return axios.post("http://localhost:6200/home/patientLogin", data);
}
