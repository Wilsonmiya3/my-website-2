import React from 'react';
import { Share2, Copy, CheckCircle2 } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';
import { motion } from 'framer-motion';

interface ShareEarningsProps {
  earnings: number;
}

const ShareEarnings: React.FC<ShareEarningsProps> = ({ earnings }) => {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = window.location.href;
  const title = `I've earned KES ${earnings.toFixed(2)} on W-Squared Agency! Join me and start earning today! 💰`;
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
      className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Share & Earn More!</h3>
      </div>
      
      <p className="text-gray-300 mb-4">
        Share your referral code with friends and earn 10% of their earnings!
      </p>
      
      <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
        <code className="flex-1 font-mono text-purple-400">{referralCode}</code>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-purple-400 hover:text-purple-300"
        >
          {copied ? (
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="mt-6 flex justify-center space-x-4">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={40} round />
        </TelegramShareButton>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <p className="text-purple-400 font-medium mb-1">Total Referrals</p>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <p className="text-purple-400 font-medium mb-1">Referral Earnings</p>
          <p className="text-2xl font-bold text-white">KES 0.00</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareEarnings;