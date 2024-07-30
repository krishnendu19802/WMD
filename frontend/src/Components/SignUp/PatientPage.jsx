import { Try, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Tooltip, useScrollTrigger } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { IoMdHelpCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function PatientPage({ updatePage, page }) {
    const [patient, setPatient] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        age: 0,
        sex: "Male",
    });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const updateValue = (e) => {
        if (e.target.name != 'age')
            setPatient({ ...patient, [e.target.name]: e.target.value })
        else
            setPatient({ ...patient, age: parseInt(e.target.value) })

    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // console.log(patient)
    const handleSubmit = async (e) => {

        console.log(patient)
        try {

            const res = await axios.post(`${backendUrl}/register`, { ...patient, type: 'patient' });
            navigate("/login");
        } catch (error) {
            toast.error('Some error occured')
        }
    }

    return (

        <div className='h-screen flex justify-center items-center bg-pink-50'>
            {page === 1 &&
                <div className=" bg-white rounded shadow-md min-w-[250px] md:w-[400px] ">
                    <div className="flex h-[4px] mb-2">
                        <div className="bg-green-500 w-1/2 rounded-r-4  h-[4px]"></div>
                        <div className=" h-[4px] w-1/2"></div>
                    </div>
                    <div className=" p-4 elements">
                        <div className="email flex justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='email' label="Email" variant="outlined"
                                value={patient.email} name="email" onChange={updateValue} />

                        </div>
                        <div className="username flex justify-center my-3">
                            <TextField className='w-4/5' error={false} id="outlined-error-helper-text" label="Username" defaultValue="Hello World" value={patient.username} name="username" onChange={updateValue} />

                        </div>
                        <div className="password flex justify-center my-3 items-center">

                            <FormControl className='w-4/5' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    value={patient.password} name="password" onChange={updateValue}
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

                            <button className={`bg-${(patient.email.length > 0) && (patient.password.length >= 5) && (patient.password.length <= 10) && (patient.username.length > 0) ? 'blue-500' : 'gray-200'} text-white rounded p-2`}
                                disabled={(patient.email.length === 0) || (patient.password.length < 5 || patient.password.length > 10) || (patient.username.length === 0)} onClick={() => updatePage(2)}>Next</button>
                        </div>
                    </div>
                </div>}

            {page === 2 &&
                <div className=" bg-white rounded shadow-md min-w-[250px] md:w-[400px] ">
                    <div className="flex h-[4px] mb-2">
                        <div className="bg-green-500 w-1/2 rounded-r-4  h-[4px]"></div>
                        <div className="bg-green-500 h-[4px] w-1/2"></div>
                    </div>
                    <div className=" p-4 elements">
                        <div className="name flex justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='text' label="Name" variant="outlined"
                                value={patient.name} name="name" onChange={updateValue} />

                        </div>
                        <div className="age flex items-center justify-center my-3">
                            <TextField className='w-4/5' id="outlined-basic" type='number' label="Age" variant="outlined"
                                value={patient.age} name="age" onChange={updateValue} />
                            <Tooltip title="Age should not be 0" className="text-md relative" >

                                <div>
                                    <IoMdHelpCircle className="ml-2 w-[15px] h-[15px]" />
                                </div>
                            </Tooltip>

                        </div>
                        <div className="gender flex justify-center my-3">
                            <select select className='w-4/5 border rounded p-2' id="outlined-basic" type='number' label="Gender" variant="outlined"
                                value={patient.sex} name="sex" onChange={updateValue} >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>


                            </select>

                        </div>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 text-white rounded p-2" onClick={() => updatePage(1)}>Back</button>

                            <button
                                className={`bg-${(patient.name.length > 0) && (patient.age != 0) && (patient.sex.length > 0) ? 'blue-500' : 'gray-200'} text-white rounded p-2`}
                                disabled={(patient.name.length === 0) || (patient.age == 0) || (patient.sex.length === 0)} onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
