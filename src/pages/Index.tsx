
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { ProcessingResult } from '../services/fileService';
import { Button } from '@/components/ui/button';
import { CodeIcon, FileText, Files, Github, Sparkles } from 'lucide-react';

const Index = () => {
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const navigate = useNavigate();

  const handleProcessingComplete = (result: ProcessingResult) => {
    setProcessingResult(result);
    navigate('/result', { state: { result } });
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col overflow-x-hidden">
      {/* Header section */}
      <header className="w-full py-8 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-pastel-gradient-1 opacity-30 -z-10"></div>
        <div className="flex items-center gap-3 mb-3 animate-float">
          <div className="bg-primary/20 p-3 rounded-xl shadow-md">
            <Files className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-shadow-sm">Textify Navigator</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-lg animate-fade-in-up">
          Extract text from all files in your codebase for easy reference and sharing
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 container px-4 max-w-5xl mx-auto flex flex-col items-center justify-center py-8 gap-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left opacity-0">
            <div className="space-y-2">
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent/40 text-accent-foreground mb-2">
                <Sparkles className="w-3 h-3 mr-1" /> Simple & Powerful
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
                Navigate & Extract Your Codebase
              </h2>
              <p className="text-muted-foreground max-w-md">
                Upload your project directory and get a single text file containing all your code, ready to share with AI tools.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/70 transition-colors">
                <div className="bg-primary/15 p-1.5 rounded-md mt-0.5 shadow-sm">
                  <Files className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Process nested directories</h3>
                  <p className="text-sm text-muted-foreground">
                    Navigate through complex folder structures effortlessly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/70 transition-colors">
                <div className="bg-primary/15 p-1.5 rounded-md mt-0.5 shadow-sm">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Support for code files</h3>
                  <p className="text-sm text-muted-foreground">
                    Handles various programming languages and text formats
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/70 transition-colors">
                <div className="bg-primary/15 p-1.5 rounded-md mt-0.5 shadow-sm">
                  <CodeIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">LLM-ready output</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for sharing with AI tools and language models
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full animate-slide-in-right opacity-0">
            <div className="p-2 rounded-2xl bg-pastel-gradient-2/20 shadow-lg">
              <FileUploader onProcessingComplete={handleProcessingComplete} />
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="w-full pt-8 pb-16 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-2xl glassmorphism shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up opacity-0 stagger-1">
              <div className="absolute -top-4 -left-2 bg-primary/90 text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">1</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Upload Directory</h3>
              <p className="text-muted-foreground text-sm">
                Drag & drop your project folder or select it using the file browser
              </p>
            </div>
            
            <div className="relative p-6 rounded-2xl glassmorphism shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up opacity-0 stagger-2">
              <div className="absolute -top-4 -left-2 bg-primary/90 text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">2</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Process Files</h3>
              <p className="text-muted-foreground text-sm">
                We'll extract text content from compatible files in your directory
              </p>
            </div>
            
            <div className="relative p-6 rounded-2xl glassmorphism shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up opacity-0 stagger-3">
              <div className="absolute -top-4 -left-2 bg-primary/90 text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">3</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Download Result</h3>
              <p className="text-muted-foreground text-sm">
                Get a single text file with all content, organized by file path
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border bg-background">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Textify Navigator
          </p>
          
          <div className="flex space-x-4 items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground text-sm hover:text-foreground"
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground text-sm hover:text-foreground"
            >
              Terms of Service
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground hover:text-foreground animate-pulse-soft"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
