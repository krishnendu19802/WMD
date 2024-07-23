import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../Navbar/NavBar';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PatientRecordCard from './PatientRecordCard';


function DoctorBookingRecords() {
    const { isAuthenticated } = useContext(AuthContext)
    const doc = isAuthenticated[0] && isAuthenticated[1]
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated[0] === false) {
            console.log("Auth", isAuthenticated);
        }
        else {
            // getAllRecords();
            console.log("autho");
        }
    }, [isAuthenticated])

    const [previousRecords, setPreviousRecords] = useState([]);

    const getAllRecords = async () => {
        try {
            console.log(isAuthenticated[1]?.email);
            const res = await axios.post('http://localhost:3000/doctor/booking-history', {
                'doctor_email': isAuthenticated[1]?.email  //for checking
            })
            // console.log(res.data);
            setPreviousRecords(res.data);

        } catch (error) {
            console.log("Error in fetching records");
        }
    }

    useEffect(() => {
        getAllRecords();
    }, [])


    // useEffect(() => {
    //     if (isAuthenticated[0] === false || isAuthenticated[1].type !== 'doctor') {
    //         console.log("Auth", isAuthenticated);
    //     }
    //     // navigate('/login')
    // }, [isAuthenticated])

    useEffect(() => {
        console.log(previousRecords);
    }, [previousRecords])

    return (
        <div>
            <NavBar />
            <br />
            {
                previousRecords.length ? <div>
                    {
                        previousRecords.map((rec, index) => {
                            return (
                                <PatientRecordCard rec={rec} />
                                // <div>{rec.name}</div>
                            )
                        })
                    }
                </div> :
                    <div style={{ fontSize: "50px", textAlign: "center", marginTop: "10vh" }}>
                        No Booking History

                    </div>

            }


        </div >
    )
}

export default DoctorBookingRecords