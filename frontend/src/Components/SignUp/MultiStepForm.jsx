import React, { useState } from 'react'
import PatientPage from './PatientPage';
import DoctorPage from './DoctorPage';
import { Link } from 'react-router-dom';

export default function MultiStepForm() {
    const [page,setPage]=useState(0)
    const updatePage=(val)=>{
        setPage(val)
    }
    
    
     
      const [type,setType]=useState(0)
  return (
    <div className='h-screen flex justify-center items-center bg-pink-50'>
          {page===0 &&<div className="p-2 bg-white rounded shadow-md w-4/5  md:w-[400px]">
            <h1 className="text-xl text-center">You want to register as</h1>
            <div className=" flex flex-col md:flex-row justify-center  w-full">
                <button className={`p-2 rounded text-white mx-2 ${type===0?'bg-green-500':'bg-gray-200'}`} onClick={()=>setType(0)}>Patient</button>
                <button className={`p-2 rounded text-white mx-2  ${type===1?'bg-green-500':'bg-gray-200'}`} onClick={()=>setType(1)}>Doctor</button>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="bg-blue-500 text-white rounded p-2" onClick={()=>updatePage(1)}>Next</button>
            </div>
            <div className="text-center my-2">
                Already have an account?
                <Link className='text-blue-600 hover:underline' to='/login'>Login</Link>
            </div>
          </div>}
          {page>0 && type===0 && <PatientPage updatePage={updatePage} page={page} />}
          {page>0 && type===1 && <DoctorPage updatePage={updatePage} page={page} />}

    </div>
  )
}
