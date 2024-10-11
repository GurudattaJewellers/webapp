import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p className='footer_p'>&copy; {new Date().getFullYear()} GURUDATTA JEWELLERS</p>
      <p className='small_p' >All rights reserved.</p>
    </footer>
  );
};

export default Footer;