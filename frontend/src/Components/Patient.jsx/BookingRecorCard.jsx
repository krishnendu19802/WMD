import React from 'react'
import './BookingRecordsCard.css'
function BookingRecorCard({ rec }) {
    return (
        <div className='record-card flex-col md:flex-row transition duration-300 ease hover:scale-110'>
            <div className='w-full md:w-1/2 text-left md:text-left'>
                <label className='name flex justify-center md:flex-col m-0 p-0'>
                    <strong>{rec.doctor.name}</strong>
                </label>
                {/* <br /> */}
                <label  className='flex justify-center md:flex-col m-0 p-0'>
                    Specialization: {rec.doctor.specialisation}
                </label>
                {/* <br /> */}
                <label  className='flex justify-center md:flex-col m-0 p-0'>
                    Qualification: {rec.doctor.qualification}
                </label>
                {/* <br /> */}
                <label  className='flex justify-center md:flex-col m-0 p-0'>
                    Location: {rec.doctor.location}
                </label>
                {/* <br /> */}
            </div>
            <div className='w-full md:w-1/2 md:border-l-2 border-dashed md:px-4'>
                <label className='fees flex justify-center md:justify-start  m-0 p-0'>
                    Doctor Visting Charge : <p>&#8377; <span style={{ color: "black", fontSize: "17px", fontWeight: "500" }}>{rec.doctor.fees} /-</span></p> 
                </label>
                {/* <br /> */}
                <label style={{ color: 'black' }}className='flex justify-center md:flex-col m-0 p-0'>Booking Date : {rec.date_of_appointment}</label>
                {/* <br /> */}
                <label style={{ color: 'black' }}className='flex justify-center md:flex-col m-0 p-0'>Slot : {rec.slot_booked + rec.doctor.timeslot_start}:00 Hr.</label>
            </div>
        </div>
    )
}

export default BookingRecorCard