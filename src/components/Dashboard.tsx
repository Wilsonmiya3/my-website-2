import React, { useState, useEffect } from 'react';
import { Play, Youtube, Instagram, Brain, Gift } from 'lucide-react';
import TriviaModal from './TriviaModal';
import ShareEarnings from './ShareEarnings';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  type: string;
  reward: number;
  icon: React.ReactNode;
  duration: number;
  durationText: string;
  color: string;
  videoUrl?: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [earnings, setEarnings] = useState(0);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isTriviaModalOpen, setIsTriviaModalOpen] = useState(false);
  const [dailyTask, setDailyTask] = useState<Task | null>(null);

  const tasks: Task[] = [
    {
      id: 1,
      type: 'Short Video',
      reward: 1,
      icon: <Play className="h-6 w-6" style={{ color: '#000000' }} />,
      duration: 30,
      durationText: '30 sec',
      color: 'bg-black',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Watch a short video to earn'
    },
    {
      id: 2,
      type: 'YouTube Content',
      reward: 2,
      icon: <Youtube className="h-6 w-6" style={{ color: '#FF0000' }} />,
      duration: 60,
      durationText: '1 min',
      color: 'bg-red-600',
      videoUrl: 'https://www.youtube.com/watch?v=yXrlhebkpIQ',
      description: 'Watch YouTube content to earn'
    },
    {
      id: 3,
      type: 'Reel Video',
      reward: 1,
      icon: <Instagram className="h-6 w-6" style={{ color: '#E4405F' }} />,
      duration: 15,
      durationText: '15 sec',
      color: 'bg-pink-500',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      description: 'Watch a reel-style video to earn'
    },
    {
      id: 4,
      type: 'Trivia Quest',
      reward: 3,
      icon: <Brain className="h-6 w-6" style={{ color: '#9333EA' }} />,
      duration: 180,
      durationText: '3 mins',
      color: 'bg-purple-600',
      description: 'Test your knowledge to earn'
    }
  ];

  useEffect(() => {
    const savedEarnings = localStorage.getItem('earnings');
    if (savedEarnings) setEarnings(parseFloat(savedEarnings));
    determineDailyTask();
  }, []);

  const determineDailyTask = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const taskIndex = dayOfWeek % tasks.length;
    const lastTaskDate = localStorage.getItem('lastTaskDate');
    const currentDate = today.toDateString();

    if (lastTaskDate !== currentDate) {
      setDailyTask(tasks[taskIndex]);
    } else {
      const completedToday = localStorage.getItem('taskCompletedToday') === 'true';
      if (completedToday) {
        setDailyTask(null);
      } else {
        setDailyTask(tasks[taskIndex]);
      }
    }
  };

  const saveProgress = (newEarnings: number) => {
    localStorage.setItem('earnings', newEarnings.toString());
  };

  const startTask = async (task: Task) => {
    setActiveTask(task);
    if (task.type === 'Trivia Quest') {
      setIsTriviaModalOpen(true);
    } else if (task.videoUrl) {
      const videoWindow = window.open(task.videoUrl, '_blank');
      if (videoWindow) {
        setTimeout(() => {
          videoWindow.close();
          completeTask();
        }, task.duration * 1000);
      }
    }
  };

  const completeTask = () => {
    if (activeTask) {
      const newEarnings = earnings + activeTask.reward;
      setEarnings(newEarnings);
      saveProgress(newEarnings);
      localStorage.setItem('lastTaskDate', new Date().toDateString());
      localStorage.setItem('taskCompletedToday', 'true');
      setDailyTask(null);
    }
    setIsTriviaModalOpen(false);
    setActiveTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Dashboard</h2>
            <p className="text-white opacity-75">Complete today's task to earn rewards</p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
            <Gift className="h-5 w-5 text-purple-400" />
            <span className="text-xl font-bold text-purple-400">KES {earnings.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {dailyTask ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200 border border-gray-700 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 ${dailyTask.color} bg-opacity-10 rounded-lg`}>
                {dailyTask.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Today's Task: {dailyTask.type}</h3>
                <p className="text-sm text-gray-400">{dailyTask.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-green-400">KES {dailyTask.reward.toFixed(2)}</span>
            </div>
            
            <button
              onClick={() => startTask(dailyTask)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
            >
              Start Task
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700 text-center"
        >
          <p className="text-gray-300">You've completed today's task! Come back tomorrow for a new task.</p>
        </motion.div>
      )}

      {activeTask && activeTask.type === 'Trivia Quest' && (
        <TriviaModal
          isOpen={isTriviaModalOpen}
          onClose={() => setIsTriviaModalOpen(false)}
          onComplete={completeTask}
        />
      )}

      <ShareEarnings earnings={earnings} />
    </div>
  );
}

export default Dashboard;