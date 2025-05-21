import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {

    let data = useCart();

    const [cartView, setCartView] = useState(false);

    const navigate = useNavigate();
    
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login");
    }


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
            <div className="container-fluid ">
                <div className='d-flex align-items-center gap-1' >
                <img className="logo" src="/logo.png" alt="logo" />
                <span className="navbar-brand fs-2 fst-italic fw-bold" to="/">GoFood</span>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
                    </li>

                    {(localStorage.getItem("authToken")) ?
                        <li className="nav-item">
                        <Link className="nav-link fs-5 fw-bold" aria-current="page" to="/myOrder">My Orders</Link>
                        </li>
                    :""}

                </ul>

                {(!localStorage.getItem("authToken")) ?
                <div className="d-flex">
                    <Link className="btn bg-white text-success mx-1 fw-bold" to="/login">Login</Link>
                    <Link className="btn bg-white text-success mx-1 fw-bold" to="/signup">SignUp</Link>
                </div>
                :<div>
                    <div className='btn bg-white text-success mx-2 fw-bold' onClick={()=>{setCartView(true)}}>
                        My Cart {" "}
                        <Badge pill bg='danger'>{data.length}</Badge>
                    </div>
                    {cartView ? <Modal onClose={()=> setCartView(false)}><Cart></Cart></Modal>:null}
                    <div className='btn bg-white text-danger mx-2 fw-bold' onClick={handleLogout}>Logout</div>
                </div>}

                </div>
            </div>
        </nav>
    </div>
  )
}
