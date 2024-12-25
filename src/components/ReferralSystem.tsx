import React from 'react';
import { Users, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReferralSystemProps {
  earnings: number;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ earnings }) => {
  const [copied, setCopied] = React.useState(false);
  const referralCode = `WSQ${Math.floor(earnings)}${Date.now().toString().slice(-4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Users className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Refer Friends & Earn More!</h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        Share your referral code with friends and earn 10% of their earnings!
      </p>
      
      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
        <code className="flex-1 font-mono text-purple-600">{referralCode}</code>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
        >
          {copied ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-purple-600 font-semibold">Total Referrals</p>
          <p className="text-2xl font-bold text-purple-700">0</p>
        </div>
        <div className="p-3 bg-pink-50 rounded-lg">
          <p className="text-pink-600 font-semibold">Referral Earnings</p>
          <p className="text-2xl font-bold text-pink-700">KES 0.00</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralSystem;