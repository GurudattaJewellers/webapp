import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/gurudatta.png'; // replace with your logo image

const Navbar = () => {
  return (
    <nav className="navbar">
  <div className="logo">
    <Link to="/" className="logo-link">
      <img src={logo} alt="Logo" className="logo-image" />
      <h1 className="logo-text">GURUDATTA JEWELLERS</h1>
    </Link>
  </div>
  <ul className="nav-links">
  <li>
      <Link to="/">Home &nbsp;</Link>
    </li>
    <li>
      <Link to="/aboutus">About Us &nbsp;</Link>
    </li>
  </ul>
</nav>

  );
};

export default Navbar;