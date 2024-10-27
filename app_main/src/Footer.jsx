/**
 * Footer Component
 * 
 * The Footer component represents the footer section of the application,
 * displaying copyright information.
 * 
 * @returns {JSX.Element} Footer section displaying copyright information.
 */

import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>©2024 Finzo</p>
        </footer>
    );
};

export default Footer;
