import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import Confetti from 'react-confetti';

interface DailyBonusProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (amount: number) => void;
}

const DailyBonus: React.FC<DailyBonusProps> = ({ isOpen, onClose, onClaim }) => {
  const [claimed, setClaimed] = useState(false);
  const bonusAmount = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      onClaim(bonusAmount);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {claimed && <Confetti />}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gray-800 rounded-lg w-full max-w-md mx-4 overflow-hidden border border-gray-700"
        >
          <div className="p-6 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-purple-900 rounded-full flex items-center justify-center">
                <Gift className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Daily Bonus!
            </h3>
            
            <p className="text-gray-300 mb-6">
              Claim your daily bonus of
              <span className="block text-3xl font-bold text-purple-400 my-2">
                KES {bonusAmount}
              </span>
            </p>
            
            {!claimed ? (
              <button
                onClick={handleClaim}
                className="w-full py-3 px-4 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Claim Bonus
              </button>
            ) : (
              <div className="text-green-400 font-medium">
                Bonus Claimed! 🎉
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DailyBonus;