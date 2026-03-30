import { useState, useEffect } from 'react'
import axios from 'axios'
import InputBox from './components/InputBox'
import ResultCard from './components/ResultCard'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Start in Dark Mode by default for maximum mystery
  const [isDark, setIsDark] = useState(true)

  // Toggle Dark Mode class on the HTML body
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleAnalyze = async (text) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', { text: text });
      setResult(response.data)
    } catch (err) {
      setError("The wire is dead. Cannot connect to the analysis engine.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-typewriter transition-colors duration-1000 dark:bg-vintage-shadow bg-[#d9d0c1] relative overflow-hidden">
      
      {/* Background Images with Overlays */}
      <div className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${isDark ? 'bg-corkboard opacity-40 mix-blend-multiply' : 'opacity-0'}`}></div>
      <div className={`absolute inset-0 z-0 bg-desk bg-cover bg-center transition-opacity duration-1000 ${!isDark ? 'opacity-30 mix-blend-color-burn' : 'opacity-0'}`}></div>

      <div className="relative z-10 max-w-3xl mx-auto py-12 px-6">
        
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-vintage-ink dark:border-vintage-paper dark:text-vintage-paper text-vintage-ink rounded-sm hover:bg-vintage-ink hover:text-vintage-paper dark:hover:bg-vintage-paper dark:hover:text-vintage-shadow transition-all duration-300"
          >
            {isDark ? "Turn on Desk Lamp" : "Go Undercover"}
          </button>
        </div>

        {/* The Mysterious Reveal Header */}
        <div className="text-center mb-12 animate-reveal">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest dark:text-vintage-paper text-vintage-ink uppercase border-b-4 border-vintage-ink dark:border-vintage-paper pb-4 inline-block shadow-sm">
            Behind_The<br/>Headlines
          </h1>
          <p className="mt-6 text-lg dark:text-gray-300 text-vintage-ink/80 font-bold uppercase tracking-widest">
            — Confidential Analysis Engine —
          </p>
        </div>

        {error && (
          <div className="p-4 mb-8 border-4 border-vintage-crimson bg-vintage-paper text-vintage-crimson text-center font-bold uppercase tracking-widest transform -rotate-1 shadow-lg">
            [ ERROR: {error} ]
          </div>
        )}

        <InputBox onAnalyze={handleAnalyze} isLoading={isLoading} />

        <div className="mt-8">
          {result && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  )
}

export default App