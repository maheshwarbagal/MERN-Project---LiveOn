import React, { useEffect, useRef } from "react";
import NavigationBar from "../Navbar/NavigationBar";
import { Container, Image } from "react-bootstrap";
import "./Home.css";
import Marquee from "react-fast-marquee";

import DisplayCards from "../Displaycards/DisplayCards";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrganInfo from "../organ-Info/OrganInfo";
import Footer from "../Footer/Footer";
import ButtonCards from "../ButtonCards/ButtonCards";
import LiveOnInfo from "../LiveOnInfo/LiveOnInfo";
import ExpertReview from "../ExpertReview/ExpertReview";
import RegistrationCards from "../ButtonCards/Registration";

const Home = () => {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      hasShownToast.current = true;
      setTimeout(() => {
        toast.success("Welcome to LiveON, Hope you will find LiveOn HelpFull!");
      }, 1000);
    }
  }, []);

  return (
    <div className="home">
      <NavigationBar />
      <video
        src="./../../../public/assets/YTreview/7584628-uhd_4096_2160_25fps.mp4"
        loop
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
          objectFit: "cover",
        }}
      ></video>
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2vw 4vw", // Responsive padding
          maxWidth: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          color: "white",
          fontSize: "clamp(1.2rem, 4vw, 2.5rem)", // Responsive font size
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background:
            "radial-gradient(circle, rgb(87, 167, 201) 45%, rgb(49, 61, 61) 100%)",
        }}
      >
        Be a champion, be an organ donor.
      </div>
      <Marquee className="bg-dark text-white py-2 fs-5 mt-3" speed={100}>
        Be the Reason for Someone's Smile Today! Let your life go in someone
        else’s body
      </Marquee>
      <RegistrationCards></RegistrationCards>
      {/* <ButtonCards /> */}
      <OrganInfo />
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {/* <Corosel /> */}
      <LiveOnInfo />

      <ExpertReview />
      <DisplayCards />

      <Footer />
    </div>
  );
};

export default Home;
