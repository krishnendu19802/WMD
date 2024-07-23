import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import "./NavBar.css";
import logo1black from "../../assets/logo1black.png";
import ResponsiveAppBar from "./ResponsiveAppBar";

export default function NavBar() {
  const { isAuthenticated, login, logout,loaded } = useContext(AuthContext);
  const navigate = useNavigate();
  const type = isAuthenticated[0] && isAuthenticated[1].type;
  console.log(type);
  const handlelogout = () => {
    logout();
    localStorage.removeItem("whosmydoc");
    navigate("/login");
  };
  useEffect(() => {
    // if (isAuthenticated[0] === false)
    // navigate('/login')
  }, [isAuthenticated]);

  // return (
  //   <div>
  //     {
  //       // isAuthenticated[0] &&
  //       <nav
  //         className="navbar navbar-expand-lg bg-body-tertiary"
  //         style={{ padding: "0px" }}
  //       >
  //         <div className="container-fluid">
  //           <Link className="navbar-brand me-auto" to="/">
  //             <img
  //               src={logo1black}
  //               style={{ height: "45px", width: "auto", borderRadius: "5px" }}
  //             />
  //           </Link>
  //           <button
  //             className="navbar-toggler "
  //             type="button"
  //             data-bs-toggle="collapse"
  //             data-bs-target="#navbarNav"
  //             aria-controls="navbarNav"
  //             aria-expanded="false"
  //             aria-label="Toggle navigation"
  //           >
  //             <span className="navbar-toggler-icon"></span>
  //           </button>
  //           <div className="collapse navbar-collapse " id="navbarNav">
  //             <ul className="navbar-nav" style={{ width: "100%" }}>
  //               {isAuthenticated[0] && (
  //                 <>
  //                   <li className="nav-item ms-auto">
  //                     {isAuthenticated[1].type === "patient" ? (
  //                       <Link
  //                         className="nav-link active"
  //                         aria-current="page"
  //                         to="/patient"
  //                       >
  //                         Book Doctor
  //                       </Link>
  //                     ) : (
  //                       <Link
  //                         className="nav-link active"
  //                         aria-current="page"
  //                         to="/doctor"
  //                       >
  //                         Booking Log
  //                       </Link>
  //                     )}
  //                   </li>
  //                   <li className="nav-item">
  //                     <Link
  //                       className="nav-link active"
  //                       aria-current="page"
  //                       to={
  //                         isAuthenticated[1].type === "patient"
  //                           ? "/patient-profile"
  //                           : "/doctor-booking-history"
  //                       }
  //                     >
  //                       Previous Records
  //                     </Link>
  //                   </li>
  //                   <li className="nav-item me-auto">
  //                     <Link
  //                       className="nav-link active"
  //                       to={`${
  //                         type === "doctor"
  //                           ? "/doctor-user-prof"
  //                           : "/patient-user-prof"
  //                       }`}
  //                     >
  //                       User Details
  //                     </Link>
  //                   </li>
  //                   <li className="nav-item ">
  //                     <Link className="nav-link" to="#">
  //                       {isAuthenticated[1]?.name}
  //                     </Link>
  //                   </li>
  //                 </>
  //               )}

  //               <li
  //                 className={`nav-item ${!isAuthenticated[0] ? "ms-auto" : ""}`}
  //               >
  //                 {isAuthenticated[0] ? (
  //                   <button className="bg-blue-500" onClick={handlelogout}>
  //                     Logout
  //                   </button>
  //                 ) : (
  //                   <button
  //                     className="bg-blue-500"
  //                     onClick={() => navigate("/login")}
  //                   >
  //                     Login
  //                   </button>
  //                 )}
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </nav>
  //     }
  //   </div>
  // );

  return (
    <ResponsiveAppBar/>
  )
}
