import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MpesaVerification from './components/MpesaVerification';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [showMpesaVerification, setShowMpesaVerification] = React.useState(false);
  const [pendingUser, setPendingUser] = React.useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNewUserRegistration = (user) => {
    setPendingUser(user);
    setShowMpesaVerification(true);
  };

  const handlePaymentVerification = () => {
    if (pendingUser) {
      localStorage.setItem('currentUser', JSON.stringify(pendingUser));
      setIsAuthenticated(true);
      setShowMpesaVerification(false);
      setPendingUser(null);
    }
  };

  const handleExistingUserLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar isAuthenticated={isAuthenticated} />
        {showMpesaVerification && (
          <MpesaVerification
            onVerificationComplete={handlePaymentVerification}
            onClose={() => {
              setShowMpesaVerification(false);
              setPendingUser(null);
            }}
          />
        )}
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Auth 
                  onNewUserRegistration={handleNewUserRegistration}
                  onExistingUserLogin={handleExistingUserLogin}
                />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;