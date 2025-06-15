// import React from "react";
// import "./NavigationBar.css";
// // import "./navbar.css";
// import {
//   Navbar,
//   Container,
//   Nav,
//   Button,
//   NavDropdown,
//   Dropdown,
//   DropdownButton,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { getToken, removeToken } from "../../services/tokenService";
// const NavigationBar = () => {
//   const navigate = useNavigate();
//   const token = getToken();
//  const handleLogOut = () => {
   
//   if (!token) {
//     // Token already missing – ensure cleanup
//     removeToken()
//     navigate("/");
//   } else {
//     // Token present – remove and redirect
//     removeToken()
//     navigate("/");
//   }
// };
//  const handleHome = () => {
   
//   if (!token) {
//     // Token already missing – ensure cleanup
//     removeToken()
//     navigate("/");
//   } else {
//     // Token present – remove and redirect
//     removeToken()
//     navigate("/");
//   }
// };
//   return (
//     // <div id="backnav">
//     //   <div id="leftside">
//     //     <p>
//     //       <i className="ri-netease-cloud-music-fill"></i>TheJam
//     //     </p>
//     //   </div>
//     //   <div id="rightside">
//     //     <Link to="/">Home</Link>
//     //     <Link to="/ArtistPage">Artists</Link>
//     //     <Link to="/EventsPage">Events</Link>
//     //     <Link to="/AboutPage">About Us</Link>
//     //     <Link to="/LoginPage">
//     //       <button className="button button1">Login</button>
//     //     </Link>
//     //   </div>
//     // </div>
//     <div>
//       {/* <Navbar bg="dark" data-bs-theme="dark">
//         <img
//           src="/assets/images.png"
//           alt="Logo"
//           width="100"
//           height="80"
//           className="ms-5"
//         />
//         <Container className="fs-2">
//           <Navbar.Brand className="fs-1" href="/">
//             LiveON
//           </Navbar.Brand>
//           <Nav className="me-auto m-1">
//             <Nav.Link className="m-1" href="/">
//               About us
//             </Nav.Link>
//             <Nav.Link className="m-1" href="#features">
//               Contact us
//             </Nav.Link>
//             <Nav.Link className="m-1" href="#pricing">
//               Feedbacks
//             </Nav.Link>
//           </Nav>
//         </Container>
//         <DropdownButton
//           id="dropdown-basic-button"
//           title="Register"
//           variant="success"
//           className="m-2 ms-3"
//         >
//           <Dropdown.Item href="/register" eventKey="register">
//             Register
//           </Dropdown.Item>
//           <Dropdown.Item href="/login" eventKey="login">
//             Login
//           </Dropdown.Item>
//           <Dropdown.Item eventKey="logout">Logout</Dropdown.Item>
//         </DropdownButton>
//       </Navbar> */}

//       <Navbar
//         collapseOnSelect
//         expand="lg"
//         bg="light"
//         variant="light"
//         sticky="top"
//         style={{
//           background:
//             "linear-gradient(90deg, rgb(203 172 223) 0%,rgb(92, 161, 230) 50%, rgb(223 212 195) 100%)",
//           color: "red",
//         }}
//       >
//         <Container className="">
//           <Navbar.Brand
//             href="#home"
//             className="fs-1"
//             style={{
//               color: "whitesmoke",
//               fontWeight: 800,
//               fontFamily: "'Baskervville SC', serif",
//               fontStyle: "normal",
//             }}
//           >
//             <img
//               src="./../../../public/assets/LoginPageImages/logo.png"
//               style={{ width: "200px", height: "80px" }}
//             ></img>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto ">
//               <Nav.Link
//                 href="/"
//                 className="ms-4 nav-link-custom"
//                 style={{ color: "whitesmoke", fontWeight: "500" }}
//                 onClick={handleHome}

//               >
//                 Home
//               </Nav.Link>
//               <Nav.Link
//                 href="/about"
//                 className="ms-4 nav-link-custom"
//                 style={{ color: "whitesmoke", fontWeight: "500" }}
//               >
//                 About-Us
//               </Nav.Link>
//               <Nav.Link
//                 href="/contact"
//                 className="ms-4 nav-link-custom"
//                 style={{ color: "whitesmoke", fontWeight: "500" }}
//               >
//                 Contact-Us
//               </Nav.Link>
//             </Nav>
//             <Nav>
              
//               <Button className="ms-4 nav-link-custom" onClick={handleLogOut}>Log out</Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   );
// };

// export default NavigationBar;


import React, { useEffect, useState } from "react";
import "./NavigationBar.css";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../services/tokenService";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [tokenPresent, setTokenPresent] = useState(false);

  useEffect(() => {
    const token = getToken();
    setTokenPresent(!!token);
  }, []);

  const handleLogOut = () => {
    removeToken();
    setTokenPresent(false);
    navigate("/");
  };

  const handleLogin = (role) => {
    if (role === "donor") {
      navigate("/login");
    } else if (role === "patient") {
      navigate("/patientlogin");
    }
  };

  // const handleHome = () => {
  //   navigate("/");
  // };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
      style={{
        background:
          "linear-gradient(90deg, rgb(203 172 223) 0%,rgb(92, 161, 230) 50%, rgb(223 212 195) 100%)",
        color: "red",
      }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          className="fs-1"
          style={{
            color: "whitesmoke",
            fontWeight: 800,
            fontFamily: "'Baskervville SC', serif",
            fontStyle: "normal",
          }}
        >
          <img
            src="/assets/LoginPageImages/logo.png"
            style={{ width: "200px", height: "80px" }}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
            href="/"
              className="ms-4 nav-link-custom"
              style={{ color: "whitesmoke", fontWeight: "500" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/about"
              className="ms-4 nav-link-custom"
              style={{ color: "whitesmoke", fontWeight: "500" }}
            >
              About-Us
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="ms-4 nav-link-custom"
              style={{ color: "whitesmoke", fontWeight: "500" }}
            >
              Contact-Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Dropdown className="ms-4">
              {tokenPresent ? (
                <Dropdown.Toggle variant="secondary" id="logout-dropdown">
                  Logout
                </Dropdown.Toggle>
              ) : (
                <Dropdown.Toggle variant="secondary" id="login-dropdown">
                  Login
                </Dropdown.Toggle>
              )}
              <Dropdown.Menu>
                {tokenPresent ? (
                  <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => handleLogin("donor")}>
                      Donor Login
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogin("patient")}>
                      Patient Login
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
