
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DirectoryProcessor from '../components/DirectoryProcessor';
import { ProcessingResult } from '../services/fileService';
import { Files, Sparkles } from 'lucide-react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as ProcessingResult | undefined;

  useEffect(() => {
    // If no result is available, redirect to home page
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Header section */}
      <header className="w-full py-6 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-pastel-gradient-3 opacity-20 -z-10"></div>
        <div className="flex items-center gap-3 mb-2 animate-float">
          <div className="bg-primary/20 p-2 rounded-xl shadow-md">
            <Files className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-shadow-sm">Textify Navigator</h1>
          <div className="bg-accent/20 py-0.5 px-2 rounded-full text-xs font-medium text-accent-foreground">
            <Sparkles className="w-3 h-3 inline mr-1" /> Results
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container px-4 max-w-5xl mx-auto flex flex-col py-4">
        <DirectoryProcessor result={result} />
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 border-t border-border mt-8 bg-background">
        <div className="container max-w-5xl mx-auto flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Textify Navigator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResultPage;
