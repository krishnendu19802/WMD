import React from 'react'
import './BookingRecordsCard.css'
function BookingRecorCard({ rec }) {
    return (
        <div className='record-card'>
            <div className='left'>
                <label className='name'>
                    <strong>{rec.doctor.name}</strong>
                </label>
                <br />
                <label >
                    Specialization: {rec.doctor.specialisation}
                </label>
                <br />
                <label >
                    Qualification: {rec.doctor.qualification}
                </label>
                <br />
                <label >
                    Location: {rec.doctor.location}
                </label>
                <br />
            </div>
            <div className='right'>
                <label className='fees'>
                    Doctor Visting Charge : &#8377; <span style={{ color: "black", fontSize: "17px", fontWeight: "500" }}>{rec.doctor.fees} /-</span>
                </label>
                <br />
                <label style={{ color: 'black' }}>Booking Date : {rec.date_of_appointment}</label>
                <br />
                <label style={{ color: 'black' }}>Slot : {rec.slot_booked + rec.doctor.timeslot_start}:00 Hr.</label>
            </div>
        </div>
    )
}

export default BookingRecorCard