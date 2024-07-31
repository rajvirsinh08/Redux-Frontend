import React from 'react'
import {NavLink } from 'react-router-dom';

function Not_found() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>Sorry, the page you are looking for does not exist.</p>
            <NavLink
                to="/"
                style={{ color: '#007bff', textDecoration: 'none', fontSize: '1.2em' }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
                Go to Home
            </NavLink>
        </div>
    )
}

export default Not_found
