import React, { useState } from "react";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import NavigationBar from "../Navbar/NavigationBar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/tokenService";
import { loginAsDonor } from "../../services/loginServices";

const DonorLogin = () => {
  const [data, setData] = useState({
    DonorUsername: "",
    DonorPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { DonorUsername, DonorPassword } = data;

  //   if (DonorUsername.trim() === "" || DonorPassword.trim() === "") {
  //     toast.error("All fields are required");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:6200/home/login",
  //       data
  //     );
  //     if (response.status === 200) {
  //       toast.success("Donor logged in..");
  //     } else {
  //       toast.error("Incorrect Username or Password");
  //     }
  //     console.log(response);
  //     setData({
  //       Donorname: "",
  //       DonorUsername: "",
  //       DonorPassword: "",
  //     });
  //     navigate("/donor/home");
  //   } catch (error) {
  //     toast.error("Username or Password is Incorrect");
  //     console.log(error)
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { DonorUsername, DonorPassword } = data;

  if (DonorUsername.trim() === "" || DonorPassword.trim() === "") {
    toast.error("All fields are required");
    return;
  }

  try {
    const response = await loginAsDonor(data);

    if (response.status === 200) {
      const { token, organ } = response.data; 
      // localStorage.setItem("donorToken", token);
      storeToken(token);

      toast.success("Donor logged in..");
      setData({
        Donorname: "",
        DonorUsername: "",
        DonorPassword: "",
      });
      navigate(`/patient-list/${organ}`);
    } else {
      toast.error("Incorrect Username or Password");
    }

  } catch (error) {
    toast.error("Username or Password is Incorrect");
    console.log(error);
  }
};


  return (
    <>
      <div>
        <NavigationBar />
        <Container className="mt-5 mb-5 w-custom border border-secondary rounded">
          <ToastContainer position="top-center" />
          <Alert
            variant="success"
            className="mt-4 mb-4 text-center fs-4 fw-bold"
          >
            Donor Login
          </Alert>
          <Form className="justify-center align-center" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Donor Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Donor Username or Email-Id"
                  name="DonorUsername"
                  onChange={handleChange}
                  value={data.DonorUsername}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="DonorPassword"
                  onChange={handleChange}
                  value={data.DonorPassword}
                />
              </Col>
            </Form.Group>
            <Row className="justify-center mt-2 mb-2 text-center fs-3 ">
              <Col>
                <span>Are you a new Donor ? </span>
                <a href="/register">Signup</a>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button type="submit" className="success m-3 fs-5 p-2">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
};
export default DonorLogin;
