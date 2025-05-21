import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="d-flex justify-content-center py-3 my-4 border-top">
        <div className="d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        </Link>
        <span className="text-muted">© 2025 GoFood, Inc</span>
        </div>    
    </footer>
  )
}
