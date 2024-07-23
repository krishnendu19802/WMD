
// PatientProfile.jsx

import React, { useContext, useEffect } from 'react';
import './ProfilePatient.css';
import img2 from '../../assets/prof-user.jpg';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';

export default function ProfilePatient() {
    const { isAuthenticated } = useContext(AuthContext);
    const patient = isAuthenticated[0] && isAuthenticated[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (patient.type === 'doctor')
            navigate('/');
    }, []);

    return (
        <>
            <NavBar />
            <section className=" main-section" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col d-flex justify-content-center mb-4 mb-lg-0">
                            <div className="card md:min-h-[40vh]  mb-3" style={{ borderRadius: ".5rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                                <div className="md:flex md:h-full">
                                    <div className="w-full max-h-[20vh] md:max-h-[50vh] md:min-h-[40vh] md:w-1/3    gradient-custom text-center text-white text-xl "
                                        style={{ borderTopLeftRadius: ".3rem", borderBottomLeftRadius: ".2rem" }}>
                                        <div className="flex justify-center">

                                            <img src={img2} alt="Avatar" className="img-fluid my-5 rounded-circle" style={{ width: "150px" }} />
                                        </div>
                                        <h5>{patient.name}</h5>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="w-full md:w-2/3 ">
                                        <div className="card-body p-4 text-lg">
                                            <h5 className='hidden md:block'>Information</h5>
                                            <hr className="mt-0 mb-4 hidden md:block" />
                                            <div className="md:flex pt-1">
                                                <div className="w-full md:w-1/2 mb-3 flex md:block justify-between items-center">
                                                    <h5 className='text-centers'>Email</h5>
                                                    <p className="text-muted  ">{patient.email}</p>
                                                </div>
                                                <div className="w-full md:w-1/2 mb-3 flex md:block justify-between items-center">
                                                    <h5 className='text-centers'>Username</h5>
                                                    <p className="text-muted  ">{patient.username}</p>
                                                </div>
                                            </div>
                                            <h5>Details</h5>
                                            <hr className="mt-0 mb-4" />
                                            <div className="md:flex pt-1">
                                                <div className="w-full md:w-1/2 mb-3 flex md:block justify-between items-center">
                                                    <h5>Age</h5>
                                                    <p className="text-muted">{patient.age}</p>
                                                </div>
                                                <div className="w-full md:w-1/2 mb-3 flex md:block justify-between items-center">
                                                    <h5>Sex</h5>
                                                    <p className="text-muted">{patient.sex === '' ? 'Male' : patient.sex}</p>
                                                </div>
                                            </div>
                                            {/* <hr /> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

