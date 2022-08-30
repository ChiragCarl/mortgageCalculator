import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import reg from '../Component/reg3.png';

import React from 'react'

export default function EditUser() {

    const navigate = useNavigate();

    //delcare the gloabl variable to access the data 
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[mobile,setMobile]=useState("");
    
    const { id } = useParams();

 
    const updateUser = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/Users/${id}`,{
            name:name,
            email:email,
            mobile:mobile
        });
        navigate('/');
    }
 
    useEffect(() => {
        getUserById();
    }, []);
 
    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/Users/${id}`);
        
        console.log(response.data);

        setName(response.data.name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
    }
 
  return (<>
            <div className='container-fluid menuBg'>
                <div className='row'>
                    <div className='col-md-7'></div>
                    <div className='col-md-5 reg'>
                         <br/>
                         <img src={reg}/>
                        <h1 style={{height:"40px"}}></h1>
                        <div className='form-group heading'>
                            <input type="text" 
                                placeholder='Enter Your Name '
                                className='form-control txt-box'
                                value={name}
                                onChange={(e)=>setName(e.target.value)} 
                                required />
                        </div><br/>
                        <div className='form-group heading'>
                            <input type="Email"
                                placeholder='Enter Email-Id'
                                className='form-control txt-box'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required />
                        </div><br/>
                        <div className='form-group heading'>   
                            <input type="Number"
                                placeholder='Enter Mobile Number'
                                className='form-control txt-box'
                                value={mobile}
                                onChange={(e)=>setMobile(e.target.value)}
                                required />
                        </div>
                        <br/>
                        <button  className='btn btn-success form-control btn-lg'  onClick={updateUser}> Submit </button>   
                    </div>
                </div>
            </div>
        </> )
}


