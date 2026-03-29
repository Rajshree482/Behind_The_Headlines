import { useState } from 'react';
import axios from 'axios'; // 1. Added axios import

const ResultCard = ({ result }) => {
  const [isReported, setIsReported] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

  const isAuthentic = result.prediction === "Real";
  
  const stampColor = isAuthentic ? "text-vintage-emerald border-vintage-emerald" : "text-vintage-crimson border-vintage-crimson";
  const stampText = isAuthentic ? "VERIFIED: AUTHENTIC" : "DEBUNKED: FABRICATION";

  // 2. New function to handle the cloud report
  const handleReport = async () => {
    setIsSubmitting(true);
    try {
      // REPLACE with your actual Render URL ending in /report
      await axios.post('https://behind-the-headlines-api.onrender.com/report', {
        prediction: result.prediction,
        confidence: result.confidence,
        flagged_as_wrong: true
      });
      
      setIsReported(true);
    } catch (error) {
      console.error("Transmission failed:", error);
      alert("The detective's wire is down. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-8 bg-[#fdfaf5] border-2 border-gray-300 shadow-[4px_6px_20px_rgba(0,0,0,0.6)] transform -rotate-1 mt-6">
      
      <div className="absolute -top-4 right-8 w-4 h-12 border-4 border-gray-400 rounded-full"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-vintage-ink/20 pb-6">
        <div>
          <p className="text-sm font-bold text-vintage-ink/60 uppercase tracking-widest mb-1">Analysis Conclusion:</p>
          <div className={`inline-block border-4 px-4 py-2 mt-2 transform -rotate-3 ${stampColor} opacity-90`}>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter">
              {stampText}
            </h2>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-lg text-vintage-ink font-bold">
          <span className="opacity-70">Probability Match: </span> 
          {(result.confidence * 100).toFixed(1)}%
        </p>
        <div className="w-full bg-gray-300 h-6 mt-2 border border-vintage-ink relative overflow-hidden">
           <div 
            className="absolute top-0 left-0 h-full bg-vintage-ink opacity-80 transition-all duration-1000 ease-out"
            style={{ width: `${Math.max(0, Math.min(100, result.confidence * 100))}%` }}
          ></div>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-dashed border-vintage-ink/30">
        {!isReported ? (
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm font-bold text-vintage-ink/70">Does this intel seem flawed?</p>
             <button 
               onClick={handleReport} // 3. Updated to use handleReport
               disabled={isSubmitting}
               className={`text-xs uppercase tracking-widest font-bold border-2 border-vintage-ink px-4 py-2 transition-colors ${
                 isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-vintage-ink hover:text-vintage-paper'
               }`}
             >
               {isSubmitting ? 'Transmitting...' : 'File Discrepancy Report'}
             </button>
           </div>
        ) : (
          <p className="text-sm font-bold text-vintage-ink text-center uppercase tracking-widest">
             [ Report Filed. The agency thanks you. ]
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;