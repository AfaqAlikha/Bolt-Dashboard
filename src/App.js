import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashboardLayout from "./base/DashboardLayout";
import Login from "./pages/Login";
import { app } from "./Firbase"; // Import the Firebase app
import Spinner from 'react-bootstrap/Spinner';
const auth = getAuth(app);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check the authentication state on component mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // You can show a loader or some other indicator while checking auth state
    return <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center",justifyContent:"center"}}> <Spinner variant="dark" animation="grow" /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
       
        {/* <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
        
        {/* Login route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <DashboardLayout />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        
        {/* Protected route for the dashboard layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <DashboardLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
