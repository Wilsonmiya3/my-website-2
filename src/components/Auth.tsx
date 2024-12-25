import React, { useState } from 'react';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveUser, findUserByEmail, validateCredentials } from '../utils/auth';

interface AuthProps {
  onNewUserRegistration: (user: any) => void;
  onExistingUserLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onNewUserRegistration, onExistingUserLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = validateCredentials(email, password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onExistingUserLogin();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!name || !email || !password || !phone) {
        setError('All fields are required');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (!/^0[17]\d{8}$/.test(phone)) {
        setError('Please enter a valid phone number');
        return;
      }

      const existingUser = findUserByEmail(email);
      if (existingUser) {
        setError('An account with this email already exists');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        phone
      };

      onNewUserRegistration(newUser);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-morphism rounded-2xl shadow-xl p-8">
          <motion.h2 
            className="text-3xl font-bold text-center text-white mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </motion.h2>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-md flex items-center gap-2 text-red-200"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm font-medium text-white">Name</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-purple-300" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 block w-full rounded-lg glass-morphism text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 interactive-hover"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-white">Phone</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-purple-300" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 block w-full rounded-lg glass-morphism text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 interactive-hover"
                      placeholder="07XXXXXXXX"
                      pattern="^0[17]\d{8}$"
                    />
                  </div>
                </motion.div>
              </>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-white">Email</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-lg glass-morphism text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 interactive-hover"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-white">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-lg glass-morphism text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 interactive-hover"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-lg animated-gradient text-white font-medium shadow-lg shadow-purple-500/20 interactive-hover"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="w-full text-center text-sm text-purple-300 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;