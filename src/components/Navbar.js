import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../logo192.png';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <div id='navbar'>
        <input className="material-icons-round" type="button" value="menu" />
        <div id="logobox">
            <img src={logo} alt=""/>
            <h1>imPoster</h1>
        </div>
        
        <div id="navlinks">
            <Link className='active' to="/home">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}
