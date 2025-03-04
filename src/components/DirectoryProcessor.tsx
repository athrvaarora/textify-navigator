
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { ProcessingResult, downloadTextFile, generateOutputFile } from '../services/fileService';
import { formatFileSize } from '../utils/fileUtils';
import { Check, Download, Copy, ArrowLeft, Clock, FileText, File } from 'lucide-react';
import { toast } from 'sonner';

interface DirectoryProcessorProps {
  result: ProcessingResult;
}

const DirectoryProcessor: React.FC<DirectoryProcessorProps> = ({ result }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time for better UX
    const timer = setTimeout(() => {
      const output = generateOutputFile(result);
      setGeneratedText(output);
      setIsGenerating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [result]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setIsCopied(true);
      toast.success('Content copied to clipboard');
      
      // Reset copy state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    downloadTextFile(generatedText, `code-index-${timestamp}.txt`);
    toast.success('File downloaded successfully');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up opacity-0">
      <Card className="glassmorphism shadow-lg overflow-hidden">
        <div className="h-2 bg-pastel-gradient-2"></div>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Processing Results</h2>
              <p className="text-muted-foreground">
                {result.processedFiles} files processed
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-secondary/80"
              onClick={handleBackToHome}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="shadow-md p-4 bg-background/50 border-accent/20 hover:shadow-lg transition-shadow animate-fade-in-up opacity-0 stagger-1">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Files</p>
                  <p className="text-2xl font-bold">{result.totalFiles}</p>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-md p-4 bg-background/50 border-primary/20 hover:shadow-lg transition-shadow animate-fade-in-up opacity-0 stagger-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <File className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Processed</p>
                  <p className="text-2xl font-bold">{result.processedFiles}</p>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-md p-4 bg-background/50 border-primary/20 hover:shadow-lg transition-shadow animate-fade-in-up opacity-0 stagger-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Size</p>
                  <p className="text-2xl font-bold">{formatFileSize(result.totalSize)}</p>
                </div>
              </div>
            </Card>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Generated Output File</h3>
            
            {isGenerating ? (
              <div className="h-60 bg-secondary/40 rounded-md flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4 animate-pulse-soft">
                  <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  <p className="text-muted-foreground">Generating output file...</p>
                </div>
              </div>
            ) : (
              <div className="relative animate-fade-in-up">
                <div className="h-60 bg-secondary/40 p-4 rounded-md overflow-auto">
                  <pre className="text-xs whitespace-pre-wrap font-mono opacity-80">
                    {generatedText.slice(0, 2000)}
                    {generatedText.length > 2000 && '...'}
                  </pre>
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <Button
                    size="sm" 
                    variant="secondary"
                    className="opacity-90 hover:opacity-100 transition-opacity shadow-sm"
                    onClick={handleCopyToClipboard}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 mr-1" />
                    )}
                    {isCopied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleBackToHome}
              className="flex items-center gap-2 hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all animate-pulse-soft"
              disabled={isGenerating}
            >
              <Download className="w-4 h-4" />
              Download File
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectoryProcessor;
