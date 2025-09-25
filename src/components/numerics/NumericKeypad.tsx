import React, { useState } from 'react';

interface NumericKeypadProps {
  onKeyPress?: (value: number) => void;
  onSubmit?: (value: string) => void;
  maxLength?: number;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ 
  onKeyPress, 
  onSubmit, 
  maxLength = 6 
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyPress = (value: number) => {
    if (inputValue.length < maxLength) {
      const newValue = inputValue + value.toString();
      setInputValue(newValue);
      onKeyPress?.(value);
    }
  };

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleSubmit = () => {
    if (inputValue.length > 0) {
      onSubmit?.(inputValue);
    }
  };

  const keys = [0, 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700">
      {/* Display */}
      <div className="w-full mb-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30">
          <div className="flex justify-center space-x-3">
            {Array.from({ length: maxLength }).map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  index < inputValue.length
                    ? 'bg-yellow-500 border-yellow-400 scale-110'
                    : 'bg-gray-700/50 border-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-3">
            <span className="text-gray-400 text-sm font-medium">
              {inputValue.length > 0 ? inputValue.split('').join(' ') : 'Press numbers below'}
            </span>
          </div>
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        {keys.map((number) => (
          <button
            key={number}
            onClick={() => handleKeyPress(number)}
            className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600/30 shadow-lg transition-all duration-200 hover:scale-105 hover:border-yellow-500/50 hover:shadow-yellow-500/20 active:scale-95 group"
          >
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text group-hover:scale-110 transition-transform duration-200">
              {number}
            </span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={handleClear}
          disabled={inputValue.length === 0}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl text-red-400 font-semibold transition-all duration-200 hover:border-red-400/50 hover:shadow-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Clear
        </button>
        
        <button
          onClick={handleBackspace}
          disabled={inputValue.length === 0}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 font-semibold transition-all duration-200 hover:border-blue-400/50 hover:shadow-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⌫ Back
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={inputValue.length === 0}
        className="w-full max-w-xs py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl font-bold text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-yellow-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        Submit
      </button>

      {/* Character Count */}
      <div className="text-sm text-gray-500 font-medium">
        {inputValue.length} / {maxLength} digits
      </div>
    </div>
  );
};

export default NumericKeypad;