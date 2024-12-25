import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TriviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const questions = [
  {
    question: "What is the capital city of Kenya?",
    options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"],
    correct: 1
  },
  {
    question: "Which is Kenya's highest mountain?",
    options: ["Mt. Elgon", "Mt. Kenya", "Mt. Kilimanjaro", "Mt. Longonot"],
    correct: 1
  },
  {
    question: "What year did Kenya gain independence?",
    options: ["1960", "1961", "1962", "1963"],
    correct: 3
  }
];

const TriviaModal: React.FC<TriviaModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (score >= 2) {
        onComplete();
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-lg">Trivia Challenge</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">
              {questions[currentQuestion].question}
            </h4>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaModal;