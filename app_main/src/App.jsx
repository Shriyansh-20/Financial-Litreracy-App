/**
 * Main application component for the React app.
 * Handles routing and authentication.
 */

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import NewsSection from './NewsSection';
import Quizhandle from './Quizhandle';
import DailyDose from './Components/Daily-Dose/DailyDose';
import Resource from './Components/Resource-Library/Resource.js';
import Footer from './Footer';
import DataProvider from "./context/DataProvider";
import Home from "./Components/home/Home";
import CreatePost from "./Components/create/CreatePost";
import DetailView from "./Components/details/DetailView";
import Update from "./Components/create/Update.jsx";
import Login from "./Components/accounts/Login";

/**
 * PrivateRoute component to handle authentication for protected routes.
 * Redirects to login if not authenticated.
 * @param {object} props - Props for the PrivateRoute component.
 * @param {boolean} props.isAuthenticated - Indicates if the user is authenticated.
 * @returns {JSX.Element} PrivateRoute component.
 */
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return isAuthenticated && token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

/**
 * Main App component.
 * Manages application state and routing.
 * @returns {JSX.Element} App component.
 */
function App() {
  // State to manage user authentication status
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  // Logout handler
  const handleLogout = () => {
    // Perform logout actions here, such as clearing session storage, etc.
    sessionStorage.removeItem("accessToken");
    isUserAuthenticated(false);
  };

  return (
    <DataProvider>
      <BrowserRouter>
        <div>
          {/* Navbar component */}
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Routes>
            {/* Public routes */}
            <Route path="/l" element={<LandingPage />} />
            <Route path="/resource" element={<Resource />} />
            <Route path="/news" element={<NewsSection />} />
            <Route path="/quiz" element={<Quizhandle />} />
            <Route path="/dailydose" element={<DailyDose />} />
            
            {/* Protected routes */}
            <Route path="/account" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailView />} />
            </Route>
            <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<Update />} />
            </Route>
          </Routes>
          {/* Footer component */}
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
