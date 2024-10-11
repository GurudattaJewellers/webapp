import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook  } from 'lucide-react';
import gurudatta from '../assets/img/gurudatta.png';
import gold_bis from '../assets/img/image_gold_bis.png';
import silver_bis from '../assets/img/image_silver_bis.png';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import instagram from '../assets/img/instagram.png';
import pinterest from '../assets/img/pinterest.png';
import visa from '../assets/img/visa.svg';
import mastercard from '../assets/img/mastercard.svg';
import googlepay from '../assets/img/google-pay.png';
import phonepe from '../assets/img/phonepe.svg';
import money from '../assets/img/money.png';
import whatsapp from '../assets/img/whatsapp.png';
import address from '../assets/img/address.png';

const AboutUs = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <img src={gurudatta} alt="Gurudatta Jewellers Logo" className="logo_aboutus" />
          <h1 className="title">Gurudatta Jewellers</h1>
          <h6 className="tagline">Embellish and get Astonished</h6>
          <p className="subtitle">Crafting Elegance Since 2002</p>
        </header>

        <section className="section">
          <h2 className="section-title">Our Legacy</h2>
          <p>
            Since our establishment in 2002, Gurudatta Jewellers has been a beacon of exquisite craftsmanship in the world of Indian jewelry. For over two decades, we have adorned our customers with timeless pieces that reflect the rich heritage of Indian artistry.
          </p>
          <p>
            Our commitment to quality and customer satisfaction has made us a trusted name in Chittoor and beyond. We specialize in a wide range of jewelry, including gold (casting, antique sets, rose gold varieties), platinum, silver (sterling and 92.5 antiques), and diamond jewelry.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Our Commitment to Excellence</h2>
          <p>
            At Gurudatta Jewellers, we believe in uncompromising quality and complete transparency. We exclusively offer only 916 hallmarked gold ornaments and 925 hallmarked silver articles, ensuring that every piece you purchase meets the highest standards of purity and craftsmanship.
          </p>
          <div className="pdf-container">
            <object data={gold_bis} className="pdf-frame pdf-frame-gold"></object>
            <object data={silver_bis} className="pdf-frame pdf-frame-silver"></object>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Visit Our Showroom</h2>
          <div className="contact-info-container">
         
  
          <div className="connect-section">
            <h5>Connect With Us</h5>
            <ul className="social-links">
              <li>
                <a href="https://www.instagram.com/gurudattajewellers" target="_blank" rel="noopener noreferrer">
                  <img src={instagram} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                </a>
              </li>
              <li>
                <a href="https://pinterest.com/gurudattajewels" target="_blank" rel="noopener noreferrer">
                  <img src={pinterest} alt="Pinterest" style={{ width: '24px', height: '24px' }} />
                </a>
              </li>
              <li>
                <a href="https://wa.me/919440592022" target="_blank" rel="noopener noreferrer">
                  <img src={whatsapp} alt="WhatsApp" style={{ width: '24px', height: '24px' }} />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="payment-section">
            <h5>Payments Accepted</h5>
            <ul className="payment-methods">
              <li><img src={visa} alt="Visa" style={{ width: '30px', height: 'auto' }} /></li>
              <li><img src={mastercard} alt="Mastercard" style={{ width: '30px', height: 'auto' }} /></li>
              <li><img src={googlepay} alt="googlepay" style={{ width: '30px', height: 'auto' }} /></li>
              <li><img src={phonepe} alt="phonepe" style={{ width: '30px', height: 'auto' }} /></li>
              <li><img src={money} alt="cash" style={{ width: '30px', height: 'auto' }} /></li>
            </ul>
          </div>
          <div className="address-section">
            <h5>Visit Us</h5>
            <a href="https://maps.app.goo.gl/EMH1pLZadr9dLR1y7" ><img src={address} alt="Address Location" className="address-image" /></a>
          </div>
        </div>


          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.0976131148404!2d79.09420137329444!3d13.219187845111135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad5ea7b0c458bf%3A0xa34a2cd7cc363793!2sGurudatta%20Jewellers!5e0!3m2!1sen!2sus!4v1728400196755!5m2!1sen!2sus"
              className="map-frame"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </section>
      </div>
      <div>
        <FloatingWhatsApp 
          phoneNumber="919440592022"
          accountName="Gurudatta Jewellers"
          darkMode="true"
          avatar={gurudatta}
          allowEsc
          allowClickAway
          notification
          notificationSound
        />
      </div>
    </div>
  );
};

export default AboutUs;