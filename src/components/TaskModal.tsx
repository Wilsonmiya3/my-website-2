import React, { useEffect, useState } from 'react';
import { X, Timer } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  duration: number;
  taskType: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onComplete, duration, taskType }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(duration);
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete();
            window.focus();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, duration, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md mx-4 border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-purple-400" />
            <span className="font-medium text-gray-200">
              Time remaining: {timeLeft} seconds
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-300">
            Complete the task to earn your reward. The window will close automatically when finished.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;