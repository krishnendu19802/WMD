import React from 'react'
import { Link } from 'react-router-dom';

function DoctorSearchForm({ handleSubmit, handleChange, formData, handlechangeBookingDetails, specialties, locations, minDate, maxDate }) {
    
    return (
        <div style={{ minWidth: "300px", width: "70%", margin: "auto", border: "1px solid rgba(59, 59, 59, 0.659)", padding: "20px", borderRadius: "15px", marginTop: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <h2 style={{ color: "black", marginBottom: "20px", textAlign: "center" }}>
                Patient Information Form
            </h2>
            <form id='searchform' onSubmit={handleSubmit}>
                <select
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
                >
                    <option value="">Select Doctor</option>
                    {specialties.map((specialisation, index) => (
                        <option key={index} value={specialisation}>
                            {specialisation}
                        </option>
                    ))}
                </select>
                <div className='my-2 text-center'>
                    Don't know which type of doctor to consult?
                    <Link to='/predict-doctor' target='blank'>Click here</Link>
                </div>
                <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
                >
                    <option value="">Select Location</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date"
                    min={minDate}   //for testing purpose removing the constraint
                    max={maxDate}
                    value={formData.date}
                    onChange={(event) => {
                        handleChange(event);
                        handlechangeBookingDetails("date_of_appointment", event.target.value);
                    }}
                    style={{ marginBottom: "20px", width: "100%", padding: "8px" }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Find Best Doctors
                </button>
            </form>
        </div>
    )
}

export default DoctorSearchForm