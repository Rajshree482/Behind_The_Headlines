import { useState } from 'react';

const InputBox = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  return (
    <div className="relative p-8 bg-vintage-paper border border-gray-300 shadow-[2px_4px_15px_rgba(0,0,0,0.5)] transform rotate-1">
      {/* Tape effect in the corner */}
      <div className="absolute -top-3 left-1/2 w-32 h-6 bg-yellow-900/20 transform -translate-x-1/2 -rotate-2"></div>

      <h2 className="text-2xl font-bold text-vintage-ink border-b-2 border-vintage-ink/30 pb-2 mb-4 uppercase tracking-widest">
        Submit Evidence
      </h2>
      
      <p className="text-vintage-ink/70 mb-4 text-sm font-bold">
        File #: {Math.floor(Math.random() * 90000) + 10000} // Awaiting Input
      </p>

      <textarea
        // Removed caret-vintage-ink from here
        className="w-full h-48 p-4 bg-transparent border-2 border-dashed border-vintage-ink/40 text-vintage-ink focus:border-vintage-ink focus:outline-none resize-none text-lg leading-relaxed placeholder:text-vintage-ink/30"
        placeholder="Type the suspect headline or article snippet here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onAnalyze(text)}
          disabled={isLoading || !text.trim()}
          className={`px-8 py-3 font-bold uppercase tracking-widest border-2 border-vintage-ink transition-all duration-200
            ${isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
              : 'bg-vintage-ink text-vintage-paper shadow-[4px_4px_0px_#14110f] hover:translate-y-1 hover:shadow-[0px_0px_0px_#14110f] active:bg-vintage-shadow'
            }
          `}
        >
          {isLoading ? "Processing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
};

export default InputBox;