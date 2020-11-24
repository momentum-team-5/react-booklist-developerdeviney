import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <h3>
                <ul classNmae='nav-Links'>
                    <Link to='/login'>
                        <li>Login</li>
                    </Link>
                    <Link to='/books'>
                        <li>Books</li>
                    </Link>
                    <Link to='/mybooks'>
                        <li>My Books</li>
                    </Link>
                    <Link to='/mynotes'>
                        <li>My Notes</li>
                    </Link>
                </ul>
            </h3>
        </nav >

    )
}

export default Nav