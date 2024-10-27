/**
 * Navbar Component
 * 
 * The Navbar component represents the navigation bar of the application.
 * It includes links to different sections of the application such as learning resources,
 * news, quizzes, blogs, and user account. It also provides a toggle button to switch
 * between different visual modes, indicating the current mode with icons.
 * 
 * @param {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @param {Function} handleLogout - Callback function to handle user logout.
 * @returns {JSX.Element} Navigation bar with links and toggle button.
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import './Navbar.css'; 


// Define the Navbar component
const Navbar = ({ isAuthenticated, handleLogout }) => {
     // Define state variable for the burning icon
    const [isBurning, setIsBurning] = useState(false);

    // Get the current location using useLocation hook from react-router-dom
    const location = useLocation();

    // Define the event handler for the fire icon click
    const handleFireClick = () => {
        setIsBurning(!isBurning);
    };

    // Return the JSX code for the Navbar component
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#769FCD' }} className='appbar'>
            <Toolbar className='toolbar'>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/l" className="nav-link">Finzo</Link>
                </Typography>
                <Button color="inherit">
                    <Link to="/resource" className={`nav-link ${location.pathname === "/resource" ? "selected" : ""}`}>Learn</Link>
                </Button> 
                <Button color="inherit" >
                    <Link to="/news" className={`nav-link ${location.pathname === "/news" ? "selected" : ""}`}>News</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/quiz" className={`nav-link ${location.pathname === "/quiz" ? "selected" : ""}`}>Quiz</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/" className={`nav-link ${location.pathname === "/" ? "selected" : ""}`}>Blog</Link>
                </Button>
                <IconButton color="inherit" component={Link} to="/dailydose" onClick={handleFireClick}>
                    {isBurning ?    
                        <LocalFireDepartmentIcon style={{ color: '#fedf17' }} /> :
                        <WhatshotIcon />
                    }
                </IconButton>
                {/* Display the login/logout button based on the authentication status */}
                {isAuthenticated ? (
                        <li><button onClick={handleLogout} className={`nav-link ${location.pathname === "/blog" ? "selected" : ""}`}>Logout</button></li>
                        ) : (
                        <li><Link to="/account">Login</Link></li>
                )}
            </Toolbar>
        </AppBar>
    );
};

// Export the Navbar component
export default Navbar;
