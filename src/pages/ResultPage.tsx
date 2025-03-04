
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DirectoryProcessor from '../components/DirectoryProcessor';
import { ProcessingResult } from '../services/fileService';
import { Files } from 'lucide-react';

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
      <header className="w-full py-6 flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-3 mb-2 animate-fade-in">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Files className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Textify Navigator</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container px-4 max-w-5xl mx-auto flex flex-col py-4">
        <DirectoryProcessor result={result} />
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 border-t border-border mt-8">
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
