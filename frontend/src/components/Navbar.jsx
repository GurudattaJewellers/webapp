import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image_igi.png'; // replace with your logo image
import bislogo from '../assets/bislogo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>

      {/* Hamburger menu icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className={menuOpen ? 'menu-icon-line open' : 'menu-icon-line'}></span>
        <span className={menuOpen ? 'menu-icon-line open' : 'menu-icon-line'}></span>
        <span className={menuOpen ? 'menu-icon-line open' : 'menu-icon-line'}></span>
      </div>

      {/* Navigation Links */}
      <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li>
          <Link to="/" onClick={toggleMenu}>Home &nbsp;</Link>
        </li>
        <li>
          <Link to="/aboutus" onClick={toggleMenu}>About Us &nbsp;</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
