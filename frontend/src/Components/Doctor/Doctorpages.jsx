import React, { useContext, useEffect, useState } from 'react';
import booking from './resp';
import "./Doctorpages.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import Modal from './Modal';
import NavBar from '../Navbar/NavBar';
import { Accordion } from 'react-bootstrap';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import { Expand, ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Typography } from 'antd';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Navbar from '../Navbar/NavBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const Doctorpages = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [patientdetails, setpatientDetails] = useState('')
  const date = new Date()
  const nd = new Date()
  const dates = []
  for (let i = 0; i < 7; i++) {
    nd.setDate(date.getDate() + i + 1)
    dates.push(nd.toISOString().split('T')[0])
  }

  let email = ''
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  if (isAuthenticated[0]) {
    email = isAuthenticated[1].email
  }

  const [doctorData, setdoctorData] = useState({
    bookings: booking.slots,
    start_time: booking.start_time
  });

  // Function to render timing slots
  const renderTimingSlots = () => {
    const { start_time, bookings } = doctorData;
    const timingSlots = [];
    for (let i = 0; i < bookings[0].length; i++) {
      timingSlots.push(
        <td key={i} style={{ width: '20%' }}>
          {start_time + i}:00 - {start_time + i + 1}:00 Hr.
        </td>
      );
    }
    return timingSlots;
  };

  // Function to render schedule
  const renderSchedule = () => {
    const { schedule, bookings } = doctorData;
    return (
      <table className="table">
        <thead className=''>
          <tr className=''>
            <td className=''>Day</td>
            {/* <th>Schedule</th> */}
            {renderTimingSlots()}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => (
            <tr key={date}>
              <td>{date}</td>

              {bookings[index].map((booking, i) => (
                <td key={i}>
                  <button className={`${booking.status ? 'bg-green-500' : 'bg-gray-200'} rounded p-2 text-white`} disabled={!booking.status} name={booking.status ? booking.content.patient_email : ''} onClick={handleShowPatient} date={dates[index]} slot={i} >
                    {booking.status ? 'booked' : 'Not-Booked'}
                  </button>
                  {/* <button className={booking.status ? 'booked' : 'not-booked'} disabled={!booking.status} name={booking.status ? booking.content.patient_email : ''} onClick={handleShowPatient} date={dates[index]} slot={i} >
                    {booking.status ? 'booked' : 'Not-Booked'}
                  </button> */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getdatadoctor = async () => {
    await axios.post(`${backendUrl}/doctor`, { 'email': email }).then((result) => {
      console.log(result.data)
      setdoctorData((data) => {
        return { ...data, 'bookings': result.data.slots, 'start_time': result.data.start_time }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log(doctorData)
  const showmodal = () => {
    const btn = document.getElementById('openmodal')
    btn.click();
  }

  const handleShowPatient = async (e) => {
    console.log(e.target.getAttribute('date'))
    await axios.post(`${backendUrl}/doctor/get-patient`, { 'patient_email': e.target.name }).then((result) => {
      console.log(result.data)
      setpatientDetails({
        ...result.data,
        'date': e.target.getAttribute('date'),
        'slot': `${doctorData.start_time + parseInt(e.target.getAttribute('slot'))}-${doctorData.start_time + parseInt(e.target.getAttribute('slot')) + 1}`
      })

    }).catch((error) => {
      console.log(error)
    })
  }
  // console.log(patientdetails)

  useEffect(() => {
    getdatadoctor()
  }, [])
  console.log(patientdetails)
  useEffect(() => {
    if (patientdetails !== '')
      showmodal()
  }, [patientdetails])
  const [isOpen, setIsOpen] = useState(-1);

  return (
    <>
      <NavBar />

      <h2 className='text-xl mt-4 text-center' style={{ color: 'black', marginBottom: '20px' }}>Your Schedule</h2>
      <div className="mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="hidden md:block schedule-container bg-white" style={{ width: 'fit-content', padding: '0px', backgroundColor: '#3498db', borderRadius: '10px', marginLeft: '20px', textAlign: 'center' }}>
          <div className=" md:block schedule-container2" style={{ marginLeft: "15px", marginRight: "15px" }}>
            {renderSchedule()}
          </div>

        </div>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id='openmodal' style={{ display: 'none' }}>

          Launch demo modal
        </button>
        <div>


        </div>
      </div >
      <div className="p-2 block md:hidden">
        {dates.map((dt, index) => {
          return (
            <div className="border my-2  rounded  " >
              <h2 className="mb-0 flex relative" >
                <button
                  className={`relative flex justify-between items-center w-full py-4 px-5 text-base text-gray-800 text-left   focus:outline-none ${isOpen === index ? 'bg-blue-200' : ''}`}
                  type="button"
                  onClick={() => {
                    if (isOpen === index)
                      setIsOpen(-1)
                    else
                      setIsOpen(index)

                  }}
                >
                  {dt}
                  <p className="flex justify-center">
                    {isOpen === index ? (<ExpandMoreRounded color='black' className='w-auto relative ' />) : (<ExpandLessRounded className='w-auto relative ' />)}

                  </p>
                </button>


              </h2>
              <hr />
              {isOpen === index && doctorData.bookings[index].map((booking, ind) => {
                return (
                  <>
                    <div className="px-4 py-1  flex justify-between items-center">
                      <div>{doctorData.start_time + ind}:00

                      </div>
                      <button className={`${booking.status ? 'bg-green-500' : 'bg-gray-200'} rounded p-2 text-white mx-2`} disabled={!booking.status} name={booking.status ? booking.content.patient_email : ''} onClick={(e) => {
                        e.preventDefault()
                        handleShowPatient(e)
                      }} date={dt} slot={ind} >
                        {booking.status ? 'Booked' : 'Booked'}
                      </button>
                    </div>
                    <hr />
                  </>
                )
              })}
              {/* {isOpen===index && (
                <div className="px-5 py-4 bg-gray-50">
                  Expanded
                </div>
              )} */}
            </div>
          )
        })}



      </div>
      <Modal patientdetails={patientdetails} />
    </>

  );
};

export default Doctorpages;
