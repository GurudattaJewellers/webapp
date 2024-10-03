import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="social-links">
        <li>
          <a href="https://www.facebook.com" target="_blank">
            <i className="fa fa-facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com" target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank">
            <i className="fa fa-instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank">
            <i className="fa fa-linkedin" />
          </a>
        </li>
      </ul>
      <p>&copy; 2023 GURUDATTA JEWELLERS</p>
    </footer>
  );
};

export default Footer;