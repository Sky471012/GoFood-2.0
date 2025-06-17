import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container-fluid p-3 ps-5 pe-5">
                    <div className='d-flex align-items-center gap-1'>
                        <img className={`logo ${isScrolled ? 'logo-small' : ''}`} src="/logo.png" alt="logo" />
                        <span className={`navbar-brand fst-italic fw-bold me-5 ${isScrolled ? 'brand-small' : ''}`}>GoFood</span>
                    </div>

                    {/* Toggler button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={{ borderColor: "#fff" }}
                    >
                        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
                    </button>

                    {/* Collapsible content */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
                            </li>

                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 fw-bold" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""
                            }
                        </ul>

                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex gap-3">
                                <Link className="btn btn-not mx-1 fw-bold" to="/login">Login</Link>
                                <Link className="btn mx-1 fw-bold" to="/signup">SignUp</Link>
                            </div>
                            :
                            <div className="d-flex">
                                <div className='btn btn-not mx-2 fw-bold' onClick={() => { setCartView(true) }}>
                                    <i className="bi bi-cart4 me-1"></i>My Cart {" "}
                                    <Badge pill bg='white' style={{"color":"red"}}>{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                <div className='btn mx-2 fw-bold' onClick={handleLogout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}