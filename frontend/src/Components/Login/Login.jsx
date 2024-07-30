import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import img from '../../assets/img-back.jpg'
import img2 from '../../assets/doctor_login.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import NavBar from '../Navbar/NavBar';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
import { ArrowDropDownSharp } from '@mui/icons-material'
import { Button } from 'antd'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify'
export default function Login() {
    const [type, setType] = useState('doctor')
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error,setError]=useState([false])
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log(formData);
            const formData = { ...user, type };
            console.log("Form data", formData);
            const res = await axios.post(`${backendUrl}/login`, formData);
            console.log("Logged in response : ");
            console.log(res.data);
            // return

            if (res.data.status) {
                //authentication done so set the data
                // setAuth({
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token
                // })
                const { token, user, status } = res.data
                console.log(user);
                login(user)
                console.log(token)
                localStorage.setItem('whosmydoc', token);
                if (type === 'doctor')
                    navigate('/doctor')
                else
                    navigate('/');
            }
            else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error)
            if(error?.response?.data?.message==='Invalid email')
                setError([true,0])
            else if(error?.response?.data?.message==='Incorrect Password')
                setError([true,1])
                
            else
            toast.error('Some error occured');
            
        }

    }
    // console.log(error)

    const handletype = (e) => {
        setType(e.target.value)
        console.log(e.target.value)
    }

    const handlechangeUser = (e) => {
        setUser((us) => {
            return { ...us, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        if (isAuthenticated[0])
            navigate('/')
    }, [isAuthenticated])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
// console.log(error[0] && error[1]===0?'Invalid email': 'Incorrect password')
    return (
        <div className='highest h-screen flex justify-center items-center bg-pink-100'>
            {/* <NavBar /> */}
            <div className="w-[90vw] md:w-2/3 lg:w-1/2 flex  rounded-lg shadow-lg">
                <div className="w-full md:w-1/2 bg-white max-h-[70vh]  rounded-l-lg p-2  flex items-center">
                    <div className="rounded-l-lg  overflow-auto w-full">

                        <h1 className="text-center rounded-lg mb-2 font-bold text-2xl ">Login</h1>
                        <hr />
                        <form className='my-5    ' onSubmit={handleSubmit}>
                            <div className="">
                                <div className="w-full flex justify-center my-3 fs-5">
                                    <TextField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        variant="outlined"
                                        className='w-4/5 md:w-1/2 active:border-blue-500'
                                        placeholder='Enter your email'
                                        onChange={handlechangeUser}
                                        value={user.email}
                                        error={error[0] && error[1]===0}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {/* <p className='d-block'>Enter your Email</p>
                                <input type="email" className='p-1 b-0 rounded' required placeholder='Enter your email' name='email' onChange={handlechangeUser} value={user.email} /> */}
                                </div>

                                <div className=" w-full flex justify-center my-3 fs-5">
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        error={error[0] && error[1]===1}

                                        className='w-4/5 md:w-1/2'
                                        placeholder='Enter your password'
                                        onChange={handlechangeUser} value={user.password}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {/* <p className='d-block'>Enter your password</p>

                                <input type="password" visible className='p-1 b-0 rounded' required placeholder='Enter your password' name='password' onChange={handlechangeUser} value={user.password} /> */}
                                </div>
                            </div>
                            <div className=" w-full flex justify-center">

                                <select
                                    label="Type"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className='w-4/5 md:w-1/2 border p-2 rounded'
                                    value={type} onChange={handletype}

                                >
                                    <option value="doctor" selected>Doctor</option>
                                    <option value="patient" >Patient</option>
                                </select>
                                {/* Select the type of User
                                <select id="dropdown  " name="dropdown" v className='mx-2 p-1 rounded' value={type} onChange={handletype}>
                                    <option value="doctor" >Doctor</option>
                                    <option value="patient" >Patient</option>

                                </select> */}
                            </div>
                            {error[0]&& <p className='text-center text-red-500 text-md'>
                            {error[1]===0?'Invalid email': 'Incorrect password'}

                            </p>}
                            

                            <div className="submit-button mt-5 flex justify-center">
                                {/* <button className="" >Login</button> */}
                               <button className="p-2 bg-gradient-to-r from-green-900 to-green-700 text-white rounded text-md font-bold">Login</button>

                            </div>
                            <div className="link-to-signup mt-2 text-center">
                                Don't have an account?
                                <Link to='/signup' className='hover:underline text-blue-500'>Register</Link>
                            </div>

                        </form>

                    </div>
                </div>
                <div className="w-1/2 hidden md:block bg-white max-h-[70vh] rounded-r-lg">
                    <div className="rounded  ">
                        <img src={img2} alt="" className='rounded-r-lg contained max-h-[70vh]' />
                    </div>
                </div>
            </div>

            {/* <div className="container-main rounded flex justify-center items-center min-h-1/2] max-h-[80vh] bg-transparent rounded-lg ">
                <div className="rounded flex bg-white shadow-lg">
                    <div className="rounded col-6 form-inp overflow-auto">
                        <h1 className="text-center mt-5">Login</h1>
                        <form className='my-5 ps-2' onSubmit={handleSubmit}>
                            <div className="d-flex  input-div type-sel align-items-center justify-content-center fs-5">
                                Select the type of User
                                <select id="dropdown  " name="dropdown" v className='mx-2 p-1 rounded' value={type} onChange={handletype}>
                                    <option value="doctor" >Doctor</option>
                                    <option value="patient" >Patient</option>

                                </select>
                            </div>
                            <hr />
                            <div className=" input-div my-3 fs-5">
                                <p className='d-block'>Enter your Email</p>
                                <input type="email" className='p-1 b-0 rounded' required placeholder='Enter your email' name='email' onChange={handlechangeUser} value={user.email} />
                            </div>
                            <hr />
                            <div className=" input-div my-3 fs-5">
                                <p className='d-block'>Enter your password</p>

                                <input type="password" visible className='p-1 b-0 rounded' required placeholder='Enter your password' name='password' onChange={handlechangeUser} value={user.password} />
                            </div>
                            <div className="submit-button mt-5 d-flex justify-content-center">
                                <button className="btn btn-success" >Login</button>

                            </div>
                            <div className="link-to-signup mt-2 text-center">
                                Don't have an account?
                                <Link to='/signup'>Register</Link>
                            </div>

                        </form>

                    </div>
                    <div className="rounded col-6 p-0 h-full ">
                        <img src={img2} alt="" className='rounded-end h-full' />
                    </div>
                </div>
            </div> */}
        </div>
    )
}
