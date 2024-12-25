import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface MpesaVerificationProps {
  onVerificationComplete: () => void;
  onClose: () => void;
}

const MpesaVerification: React.FC<MpesaVerificationProps> = ({ onVerificationComplete, onClose }) => {
  const [mpesaCode, setMpesaCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    const mpesaCodeRegex = /^[PNK][A-Z][0-9A-Z]{8}$/;
    if (!mpesaCodeRegex.test(mpesaCode)) {
      setError('Please enter a valid M-Pesa confirmation code');
      setIsVerifying(false);
      return;
    }

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onVerificationComplete();
    setIsVerifying(false);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-morphism rounded-2xl w-full max-w-md mx-4 p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Payment Required</h2>
          <p className="text-gray-300">To complete your registration, please pay KES 500</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl mb-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Payment Instructions:</h3>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Go to M-Pesa menu</li>
            <li>Select Pay Bill</li>
            <li>Enter Business Number: <span className="font-mono font-bold text-purple-400">247247</span></li>
            <li>Enter Account Number: <span className="font-mono font-bold text-purple-400">0930185656575</span></li>
            <li>Enter Amount: <span className="font-bold text-purple-400">KES 500</span></li>
            <li>Enter your M-Pesa PIN</li>
            <li>Wait for confirmation SMS</li>
          </ol>
        </div>

        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Enter M-Pesa Confirmation Code
            </label>
            <input
              type="text"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
              placeholder="e.g., PK7XXXXX123"
              className="w-full p-3 glass-morphism rounded-lg text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500"
              maxLength={10}
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-2 flex items-center text-red-400 text-sm"
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isVerifying || mpesaCode.length < 10}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 rounded-lg animated-gradient text-white font-medium shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isVerifying ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Verify Payment</span>
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-purple-300/70 text-center">
          Having issues? Contact support at support@w-squared.com
        </p>
      </motion.div>
    </div>
  );
};

export default MpesaVerification;