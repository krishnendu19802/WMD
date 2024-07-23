import React from 'react'

function PatientRecordCard({ rec }) {
    return (
        <div className='record-card flex-col md:flex-row transition duration-300 ease hover:scale-110'>
            <div className='w-full md:w-1/2 text-left md:text-left'>
                <label className='name flex justify-center md:flex-col m-0 p-0'>
                    <strong>{rec.name}</strong>
                </label>
                {/* <br /> */}
                <label className='flex justify-center md:flex-col m-0 p-0' >
                    Email: {rec.email}
                </label>
                {/* <br /> */}
                <label className='flex justify-center md:flex-col m-0 p-0'>
                    Age: {rec.age}
                </label>
                {/* <br /> */}
                <label className='flex justify-center md:flex-col m-0 p-0' >
                    Sex: {rec.sex===''?'Male':rec.sex}
                </label>
                {/* <br /> */}
            </div>
            <div className='w-full md:w-1/2 md:border-l-2 border-dashed md:px-4'>
                {/* <br /> */}
                <label className='flex justify-center md:flex-col m-0 p-0'  style={{ color: 'black' }}>Booking Date : {rec.date_of_appointment.split('T')[0]}</label>
                {/* <br /> */}
                <label className='flex justify-center md:flex-col m-0 p-0'  style={{ color: 'black' }}>Slot : {rec.slot_booked}:00 Hr.</label>
            </div>
        </div>
    )

}

export default PatientRecordCard