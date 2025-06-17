import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials!");
    }else{
      console.log("Logined");
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.setItem("authToken", json.authToken));
      navigate("/")
    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Navbar />
  
      <div className="login-container d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="m-3 form-group flex align-content-center">
            <label className='m-2' htmlFor="exampleInputEmail1">Email address:-</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} placeholder='Enter your email....'/>
          </div>
          <div className="m-3 form-group flex align-content-center">
            <label className='m-2' htmlFor="exampleInputPassword1">Password:-</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder='Enter your password....'/>
          </div>
          <div className="m-3 d-flex justify-content-center gap-3 ">
            <Link to="/signup" className='m-3 btn fw-bold btn-not'>Not a user</Link>
            <button type="submit" className="m-3 btn fw-bold">Login</button>
          </div>
        </form>
      </div>
  

        <Footer />

    </div>
  );  
}
