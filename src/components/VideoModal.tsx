import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ReactPlayer from 'react-player';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  videoUrl: string;
  duration: number;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onComplete, videoUrl, duration }) => {
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setHasStarted(false);
    }
  }, [isOpen]);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (hasStarted) {
      setProgress(playedSeconds);
      if (playedSeconds >= duration) {
        onComplete();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl mx-4 border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-bold text-lg text-white">Watch to Earn</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              onProgress={handleProgress}
              onStart={() => setHasStarted(true)}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    controls: 1,
                    modestbranding: 1,
                    origin: window.location.origin
                  }
                }
              }}
            />
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(progress / duration) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Watch the complete video to earn your reward
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;