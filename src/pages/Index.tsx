
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { ProcessingResult } from '../services/fileService';
import { Button } from '@/components/ui/button';
import { CodeIcon, FileText, Files, Github } from 'lucide-react';

const Index = () => {
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const navigate = useNavigate();

  const handleProcessingComplete = (result: ProcessingResult) => {
    setProcessingResult(result);
    navigate('/result', { state: { result } });
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Header section */}
      <header className="w-full py-8 flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-3 mb-3 animate-fade-in">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <Files className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Textify Navigator</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-lg animate-slide-up">
          Extract text from all files in your codebase for easy reference and sharing
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 container px-4 max-w-5xl mx-auto flex flex-col items-center justify-center py-8 gap-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-2">
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                Simple & Powerful
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight lg:text-4xl">
                Navigate & Extract Your Codebase
              </h2>
              <p className="text-muted-foreground max-w-md">
                Upload your project directory and get a single text file containing all your code, ready to share with AI tools.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-md mt-0.5">
                  <Files className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Process nested directories</h3>
                  <p className="text-sm text-muted-foreground">
                    Navigate through complex folder structures effortlessly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-md mt-0.5">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Support for code files</h3>
                  <p className="text-sm text-muted-foreground">
                    Handles various programming languages and text formats
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-md mt-0.5">
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

          <div className="w-full animate-scale-in">
            <FileUploader onProcessingComplete={handleProcessingComplete} />
          </div>
        </div>

        {/* How it works section */}
        <div className="w-full pt-8 pb-16 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-2xl glassmorphism shadow-subtle">
              <div className="absolute -top-4 -left-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Upload Directory</h3>
              <p className="text-muted-foreground text-sm">
                Drag & drop your project folder or select it using the file browser
              </p>
            </div>
            
            <div className="relative p-6 rounded-2xl glassmorphism shadow-subtle">
              <div className="absolute -top-4 -left-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Process Files</h3>
              <p className="text-muted-foreground text-sm">
                We'll extract text content from compatible files in your directory
              </p>
            </div>
            
            <div className="relative p-6 rounded-2xl glassmorphism shadow-subtle">
              <div className="absolute -top-4 -left-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="font-semibold text-lg mb-2 mt-3">Download Result</h3>
              <p className="text-muted-foreground text-sm">
                Get a single text file with all content, organized by file path
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 border-t border-border">
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
              className="text-muted-foreground hover:text-foreground"
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
