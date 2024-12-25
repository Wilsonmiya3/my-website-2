import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ChessGameProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ChessGame: React.FC<ChessGameProps> = ({ isOpen, onClose, onComplete }) => {
  const [moves, setMoves] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  if (!isOpen) return null;

  const pieces = [
    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
  ];

  const handleMove = (index: number) => {
    if (selectedPiece === null) {
      if (pieces[index]) {
        setSelectedPiece(index);
      }
    } else {
      setSelectedPiece(null);
      setMoves(prev => {
        const newMoves = prev + 1;
        if (newMoves >= 5) {
          setTimeout(onComplete, 500);
        }
        return newMoves;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-lg">Chess Challenge</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="aspect-square bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg">
            <div className="grid grid-cols-8 gap-0.5 p-4">
              {pieces.map((piece, i) => (
                <div
                  key={i}
                  onClick={() => handleMove(i)}
                  className={`aspect-square flex items-center justify-center text-3xl cursor-pointer
                    ${(Math.floor(i / 8) + i) % 2 === 0 ? 'bg-amber-800' : 'bg-amber-200'}
                    ${selectedPiece === i ? 'ring-2 ring-blue-500' : ''}
                    hover:opacity-75 transition-opacity`}
                >
                  {piece}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Moves made: {moves}/5
            </p>
            <p className="text-sm text-gray-500">
              Click a piece then click a destination to move
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;