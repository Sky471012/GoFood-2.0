import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer ">
          <div className='d-flex align-items-center gap-1'>
              <img className="logo" style={{height:"60px"}} src="/logo1.png" alt="logo" />
              <h1 className="fst-italic fw-bold" style={{color:"white", fontSize:"45px"}}>GoFood</h1>
          </div>

          <ul className="contact" style={{"listStyle": "none"}}>
            <li><a href='https://github.com/Sky471012'><i className="contact-icon bi bi-github"></i></a></li>
            <li><a href='https://www.linkedin.com/in/aakash-sharma-a178062a7/'><i className="contact-icon bi bi-linkedin"></i></a></li>
            <li><a href='https://www.instagram.com/sky_101247/'><i className="contact-icon bi bi-instagram"></i></a></li>
          </ul>
          <div className="text-muted mt-3">© 2025 Sky</div>
    </footer>
  )
}
