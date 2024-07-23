import React from 'react'
import './DoctorCard.css'

function DoctorCard({ doctor, index, handlechangeBookingDetails, bookingDetails, date, loc, fees }) {
    console.log(doctor)
    return (

        <li key={index} className='doctor-card-li'>
            <div className='left'>

                <label htmlFor={`doctor${index}`} className='name'>
                    <strong>{doctor.name}</strong>
                </label>
                <br />
                <br />
                <label htmlFor={`doctor${index}`}>
                    <span style={{ fontStyle: "italic" }}>{doctor.experience} Years of Experience </span>
                </label>
                <br />
                {/* <label htmlFor={`doctor${index}`}>
                    Reg No: {doctor.regno}
                </label>
                <br /> */}
                <label htmlFor={`doctor${index}`}>
                    Qualification: {doctor.qualification}
                </label>
                <br />
                {/* <label htmlFor={`doctor${index}`}>
                    Specialization: {doctor.specialisation}
                </label>
                <br /> */}
                <label htmlFor={`doctor${index}`}>
                    Location: {doctor.location}
                </label>
                <br />
                <label htmlFor={`doctor${index}`} className='fees'>
                    Doctor Visting Charge : &#8377; <span style={{ color: "black", fontSize: "17px", fontWeight: "500" }}>{doctor.fees} /-</span>
                </label>
                <br />
            </div>
            <div className='right'>
                <br />
                {
                    doctor.slots.map((slot, index2) => (
                        slot ?
                            <button key={index2} className={(doctor.email === bookingDetails.doctor_email && index2 === bookingDetails.slot_booked) ? "selected_slot" : "available_slot"}
                                onClick={() => {
                                   
                                    handlechangeBookingDetails("doctor_email", doctor.email);
                                    handlechangeBookingDetails("slot_booked", index2);
                                    handlechangeBookingDetails("date_of_appointment", date);
                                    handlechangeBookingDetails("doctor_name", doctor.name);
                                    handlechangeBookingDetails('location', loc)
                                    handlechangeBookingDetails('fees', doctor.fees)
                                    handlechangeBookingDetails('timeslot_start',doctor.timeslot_start)
                                //    handlechangeBookingDetails(newobj)


                                }}
                            > {(doctor.email === bookingDetails.doctor_email && index2 === bookingDetails.slot_booked) ? "Selected Slot" : "Book Slot"} {doctor.timeslot_start + index2} : 00 Hr</button> :
                            <button key={index2} disabled={true} className='unavialable_slot'> Unavailable  {doctor.timeslot_start + index2} : 00 Hr</button>
                    ))
                }
                <br />

            </div>
        </li>

    )
}

export default DoctorCard