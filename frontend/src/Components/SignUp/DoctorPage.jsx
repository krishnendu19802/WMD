import { Try, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Tooltip, useScrollTrigger } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { IoMdHelpCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DoctorPage({ updatePage, page }) {
    const [doctor, setDoctor] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        regno: "",
        qualification: "",
        specialisation: "",
        experience: 0,
        fees: 0,
        timeslot_start: 6,
        timeslot_end: 7,
        location: "",
    });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const flds=['experience','timeslot_start','timeslot_end','fees']
    const updateValue = (e) => {
        const {name}=e.target
        if (!flds.includes(name) )
            setDoctor({ ...doctor, [e.target.name]: e.target.value })
        else
            setDoctor({ ...doctor, [e.target.name]: parseInt(e.target.value) })

    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (e) => {

        console.log(doctor)
        // return 
        try {

            const res = await axios.post(`${backendUrl}/register`, { ...doctor, type: 'doctor' });
            console.log(res)
            // navigate("/login");
        } catch (error) {
            toast.error('Some error occured')
        }
    }
    return (
        <div className='h-screen flex justify-center items-center bg-pink-50'>
            {page === 1 &&
                <div className=" bg-white rounded shadow-md min-w-[250px] md:w-[400px] ">
                    <div className="flex h-[4px] mb-2">
                        <div className="bg-green-500 w-1/3 rounded-r-4  h-[4px]"></div>
                        <div className=" h-[4px] w-1/3"></div>
                        <div className=" h-[4px] w-1/3"></div>

                    </div>
                    <div className=" p-4 elements">
                        <div className="email flex justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='email' label="Email" variant="outlined"
                                value={doctor.email} name="email" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' error={false} id="outlined-error-helper-text" label="Username" defaultValue="Hello World" value={doctor.username} name="username" onChange={updateValue} />

                        </div>
                        <div className="password flex justify-center my-3 items-center">

                            <FormControl className='w-4/5' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    value={doctor.password} name="password" onChange={updateValue}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff className='relative' /> : <Visibility className='relative' />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Tooltip title="Password should between 5-10 characters" className="text-md relative" >

                                <div>
                                    <IoMdHelpCircle className="ml-2 w-[15px] h-[15px]" />
                                </div>
                            </Tooltip>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-white rounded p-2" onClick={() => updatePage(0)}>Back</button>

                            <button className={`bg-${(doctor.email.length > 0) && (doctor.password.length >= 5) && (doctor.password.length <= 10) && (doctor.username.length > 0) ? 'blue-500' : 'gray-200'} text-white rounded p-2`}
                                disabled={(doctor.email.length === 0) || (doctor.password.length < 5 || doctor.password.length > 10) || (doctor.username.length === 0)} onClick={() => updatePage(2)}>Next</button>
                        </div>
                    </div>
                </div>}

            {page === 2 &&
                <div className=" bg-white rounded shadow-md  min-w-[250px] md:w-[400px] ">
                    <div className="flex h-[4px] mb-2">
                        <div className="bg-green-500 w-1/3   h-[4px]"></div>
                        <div className=" h-[4px] bg-green-500 w-1/3"></div>
                        <div className=" h-[4px] w-1/3"></div>

                    </div>
                    <div className=" p-4 elements">
                        <div className="email flex justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='text' label="Name" variant="outlined"
                                value={doctor.name} name="name" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' error={false} id="outlined-error-helper-text" label="Registration No." value={doctor.regno} name="regno" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' error={false} id="outlined-error-helper-text" label="Qualification" value={doctor.qualification} name="qualification" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' error={false} id="outlined-error-helper-text" label="Specialisation" value={doctor.specialisation} name="specialisation" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' type='number' inputProps={{ min: 0 }} error={false} id="outlined-error-helper-text" label="Experience" value={doctor.experience} name="experience" onChange={updateValue} />

                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-white rounded p-2" onClick={() => updatePage(1)}>Back</button>

                            <button className={`bg-${(doctor.name.length > 0) && (doctor.regno.length > 0) && (doctor.qualification.length > 0) && (doctor.specialisation.length > 0) ? 'blue-500' : 'gray-200'} text-white rounded p-2`}
                                disabled={(doctor.name.length === 0) || (doctor.regno.length === 0) || (doctor.qualification.length === 0) && (doctor.specialisation.length === 0)} onClick={() => updatePage(3)}>Next</button>
                        </div>
                    </div>
                </div>}

            {page === 3 &&
                <div className=" bg-white rounded shadow-md min-w-[250px] md:w-[400px] ">
                    <div className="flex h-[4px] mb-2">
                        <div className="bg-green-500 w-1/3   h-[4px]"></div>
                        <div className="bg-green-500 w-1/3   h-[4px]"></div>
                        <div className="bg-green-500 w-1/3   h-[4px]"></div>

                    </div>
                    <div className=" p-4 elements">
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' type='number' inputProps={{ min: 6, max:21 }} error={false} id="outlined-error-helper-text" label="Starting Time " value={doctor.timeslot_start} name="timeslot_start" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center items-center my-3">
                            <TextField className='w-4/5 ' type='number' inputProps={{ min: doctor.timeslot_start+1,max:22 }} error={doctor.timeslot_end<=doctor.timeslot_start} id="outlined-error-helper-text" label="Ending Time " value={doctor.timeslot_end} name="timeslot_end" onChange={updateValue} />
                            <Tooltip title="Must be higher than starting time" className="text-md relative" >

                                <div>
                                    <IoMdHelpCircle className="ml-2 w-[15px] h-[15px]" />
                                </div>
                            </Tooltip>

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' type='number' inputProps={{ min: 0, step:50 }}  error={false} id="outlined-error-helper-text" label="Fees" value={doctor.fees} name="fees" onChange={updateValue} />

                        </div>
                        <div className="email flex justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='text' label="Location" variant="outlined"
                                value={doctor.location} name="location" onChange={updateValue} />

                        </div>
                        
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-white rounded p-2" onClick={() => updatePage(2)}>Back</button>

                            <button
                                className={`bg-${(doctor.location.length > 0) && (doctor.timeslot_start<doctor.timeslot_end) ? 'blue-500' : 'gray-200'} text-white rounded p-2`}
                                disabled={(doctor.location.length === 0) || (doctor.timeslot_start>=doctor.timeslot_end) } onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
