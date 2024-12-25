import React from 'react';
import { Coins, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const currentUser = isAuthenticated ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    window.location.reload();
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-morphism backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-yellow-300" />
              <span className="text-2xl font-bold text-white">W-Squared Agency</span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {currentUser?.name}!</span>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 glass-morphism px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <span className="text-white">Welcome to W-Squared Agency</span>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;