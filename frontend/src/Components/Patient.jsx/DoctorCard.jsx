import React from 'react'
import './DoctorCard.css'

function DoctorCard({ doctor, index, handlechangeBookingDetails, bookingDetails, date, loc, fees }) {
    console.log(doctor)
    return (

        <li key={index} className='doctor-card-li flex-col md:flex-row'>
            <div className='w-full md:w-1/2 flex flex-col justify-center md:justify-between'>

                <label htmlFor={`doctor${index}`} className='name flex justify-center md:justify-start '>
                    <strong>{doctor.name}</strong>
                </label>
                
                <label htmlFor={`doctor${index}`} className='flex justify-center md:justify-start '>
                    <span style={{ fontStyle: "italic" }}><strong className='text-black'>{doctor.experience}</strong>
                         Years of Experience </span>
                </label>
                
                {/* <label htmlFor={`doctor${index}`}>
                    Reg No: {doctor.regno}
                </label>
                <br /> */}
                <label htmlFor={`doctor${index}`} className='flex justify-center md:justify-start'>
                    Qualification: {doctor.qualification}
                </label>
                {/* <br /> */}
                {/* <label htmlFor={`doctor${index}`}>
                    Specialization: {doctor.specialisation}
                </label>
                <br /> */}
                <label htmlFor={`doctor${index}`} className='flex justify-center md:justify-start'>
                    Location: {doctor.location}
                </label>
                {/* <br /> */}
                <label htmlFor={`doctor${index}`} className='fees flex justify-center md:justify-start pt-0' >
                    Doctor Visting Charge : &#8377; <span style={{ color: "black", fontSize: "17px", fontWeight: "500" }}>{doctor.fees} /-</span>
                </label>
                {/* <br /> */}
            </div>
            <hr className='md:hidden my-1' />
            <div className='w-full md:w-1/2 grid-cols-1 flex flex-wrap justify-center border-l-0 md:border-l-2 border-dashed'>
                {/* <br /> */}
                {
                    doctor.slots.map((slot, index2) => (
                        slot ?
                            <button key={index2} className={`${(doctor.email === bookingDetails.doctor_email && index2 === bookingDetails.slot_booked) ? "selected_slot" : "available_slot"} max-h-[50px]`}
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
                            <button key={index2} disabled={true} className='unavialable_slot max-h-[50px]'> Unavailable  {doctor.timeslot_start + index2} : 00 Hr</button>
                    ))
                }
                <br />

            </div>
        </li>

    )
}

export default DoctorCard