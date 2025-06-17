import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", address:""});
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/createuser`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, address:credentials.address})
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      if (json.errors && json.errors.length > 0) {
        alert(json.errors[0].msg); // Show alert with the backend error message
      } else {
        alert("Something went wrong!");
      }
    }else{
      console.log("Signuped");
      console.log(localStorage.setItem("authToken", json.authToken));
      navigate("/")
    }

  }

  const onChange=(event)=>{
    setCredentials({...credentials, [event.target.name]:event.target.value})
  }

  return (<div>
    <Navbar></Navbar>
    <div className="signup-container d-flex justify-content-center">
      <form onSubmit={handleSubmit} >
        <div className="m-3 form-group flex align-content-center">
          <label className='m-2' htmlFor="name">Name:-</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder='Enter your name....'/>
        </div>
        <div className="m-3 form-group flex align-content-center">
          <label className='m-2' htmlFor="exampleInputEmail1">Email address:-</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} placeholder='Enter your email....'/>
        </div>
        <div className="m-3 form-group flex align-content-center">
          <label className='m-2' htmlFor="exampleInputPassword1">Password:-</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder='Enter your password....'/>
        </div>
        <div className="m-3 form-group flex align-content-center">
          <label className='m-2' htmlFor="address">Address:-</label>
          <input type="text" className="form-control" name='address' value={credentials.address} onChange={onChange} placeholder='Enter your address....'/>
        </div>   

        <div className='d-flex justify-content-center gap-3'>
          <Link to="/login" className='m-3 btn btn-not fw-bold'>Already a user</Link>  
          <button type="submit" className="m-3 btn fw-bold">Signup</button>
        </div>     
      </form>
    </div>
    
    <Footer/>
  </div>)
}
