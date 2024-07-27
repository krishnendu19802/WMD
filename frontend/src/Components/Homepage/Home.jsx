import React, { useContext, useEffect } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img01 from "../../assets/doc1.jpeg";
import img02 from "../../assets/doc2.jpeg";
import img03 from "../../assets/doc3.jpg";
import img04 from "../../assets/doc4.jpeg";
import img05 from "../../assets/doc5.jpg";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { AuthContext } from "../../context/AuthProvider";
import Footer from "../Footer/Footer";
function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext)
  useEffect(() => {
    // if (isAuthenticated[0] === false)
    // navigate('/login')
  }, [isAuthenticated])
  return (
    <div className="container-main-home">
      <NavBar />
      <div className="mt-2">
        <h2 className="text-2xl font-bold text-center p-2">Your health our priority</h2>
      </div>

      <div class="md:flex justify-center  p-4 ">
        <div className="w-full md:w-1/2">
          We Sarique, Abhik, Krishnendu, Ayush came together to create this
          healthcare management system,driven by our passion for improving
          healthcare management.Every year about 8% healthcare tragedies occur
          in our nation because of the inability of the population to reach the
          correct doctor for normally treatable health ailments.Through our
          collective efforts and utilisation of our DataBase Managmenet and
          development skills, we aim to make a positive impact on people's lives
          by providing innovative solutions and compassionate care.

        </div>
        <div className="image my-2 md:mx-2 rounded flex justify-center md:block">
          <img src={img05} className="shadow rounded min-w-[200px] max-w-[250px] min-h-[200px] max-h-[250px]" alt="Doctor 1" />

        </div>





      </div>
      <div className="my-2 flex justify-center  p-4">
        <button id="btn-doc-find" style={{ marginLeft: '20px' }}
          onClick={() => { isAuthenticated[0] === false || isAuthenticated[1].type === 'patient' ? navigate("/patient") : navigate("/doctor-booking-history") }}
        >{isAuthenticated[0] === false || isAuthenticated[1].type === 'patient' ? "Find Your Doctor" : "View Your Patients"}</button>
      </div>


      {/* <div className="main-text">
        <div className="">


          <text className="mt-8">{isAuthenticated[0] === false || isAuthenticated[1].type === 'patient' ? "Your health our priority" : "Welcome Doctor ..."} </text>


          <p class="healthcare-message" style={{ textAlign: 'justify', paddingLeft: "20px", paddingTop: '15px' }}>
            We Sarique, Abhik, Krishnendu, Ayush came together to create this
            healthcare management system,driven by our passion for improving
            healthcare management.Every year about 8% healthcare tragedies occur
            in our nation because of the inability of the population to reach the
            correct doctor for normally treatable health ailments.Through our
            collective efforts and utilisation of our DataBase Managmenet and
            development skills, we aim to make a positive impact on people's lives
            by providing innovative solutions and compassionate care.
          </p>

          <button id="btn-doc-find" style={{ marginLeft: '20px' }}
            onClick={() => { isAuthenticated[0] === false || isAuthenticated[1].type === 'patient' ? navigate("/patient") : navigate("/doctor-booking-history") }}
          >{isAuthenticated[0] === false || isAuthenticated[1].type === 'patient' ? "Find Your Doctor" : "View Your Patients"}</button>
        </div>

        
      </div> */}

      <Footer />
    </div >
  );
}

export default Home;