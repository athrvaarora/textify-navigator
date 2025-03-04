
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { processDirectoryFiles, ProcessingResult } from '../services/fileService';
import { MAX_FILE_SIZE, formatFileSize } from '../utils/fileUtils';
import { Loader2, FolderUp, FileText, Folder } from 'lucide-react';

interface FileUploaderProps {
  onProcessingComplete: (result: ProcessingResult) => void;
}

// Create a type definition for the webkitdirectory attribute
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string | boolean;
    directory?: string | boolean;
  }
}

const FileUploader: React.FC<FileUploaderProps> = ({ onProcessingComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const processFiles = useCallback(async (items: DataTransferItemList | null) => {
    if (!items || items.length === 0) {
      toast.error('No files selected');
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      const entries: FileSystemEntry[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Only process files and directories (not process DataTransferItem of kind 'string')
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            entries.push(entry);
          }
        }
      }

      if (entries.length === 0) {
        toast.error('No valid files or directories found');
        setIsProcessing(false);
        return;
      }

      setProgress(30);
      
      // Simple progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 5;
          return next < 90 ? next : prev;
        });
      }, 500);

      const result = await processDirectoryFiles(entries);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (result.entries.length === 0) {
        toast.warning('No text files found to process');
        setIsProcessing(false);
        return;
      }

      onProcessingComplete(result);
      
      // Success notification
      toast.success(`Processed ${result.processedFiles} files successfully`);
      
      // Navigate to results page after a brief delay to let the animation complete
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
      
    } catch (error) {
      console.error('Processing error:', error);
      toast.error(`Error: ${(error as Error).message || 'Failed to process files'}`);
      setIsProcessing(false);
    }
  }, [onProcessingComplete]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    processFiles(e.dataTransfer.items);
  }, [processFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to DataTransferItemList-like structure
      const dataTransferItems = e.target.files;
      
      // Create a proper DataTransferItemList with required methods
      const items = {
        length: dataTransferItems.length,
        [Symbol.iterator]: function* () {
          for (let i = 0; i < this.length; i++) {
            yield this[i];
          }
        }
      } as DataTransferItemList;

      for (let i = 0; i < dataTransferItems.length; i++) {
        const file = dataTransferItems[i];
        // Cast to unknown first and then to DataTransferItem to satisfy TypeScript
        (items[i] as unknown) = {
          kind: 'file',
          type: file.type,
          getAsFile: () => file,
          webkitGetAsEntry: () => {
            return {
              isFile: true,
              isDirectory: false,
              name: file.name,
              file: (callback: (file: File) => void) => {
                callback(file);
              }
            } as FileSystemFileEntry;
          },
          // Add the required getAsString method to satisfy the DataTransferItem interface
          getAsString: (callback: FunctionStringCallback) => {
            callback(file.name);
          }
        } as DataTransferItem;
      }

      processFiles(items);
    }
  }, [processFiles]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card
        ref={dropzoneRef}
        className={`p-8 border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-primary/70 bg-primary/5 scale-[1.02]'
            : 'border-border'
        } relative overflow-hidden glassmorphism`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <h3 className="text-xl font-medium text-center">Processing Files</h3>
            <p className="text-center text-muted-foreground max-w-md">
              We're analyzing your files and extracting text content. This may take a moment depending on the size of your directory.
            </p>
            <div className="w-full max-w-md mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-right mt-2 text-muted-foreground">{progress}%</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <FolderUp className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-medium">Upload Your Directory</h3>
              <p className="text-muted-foreground max-w-md">
                Drag & drop your project folder or click to browse. We'll extract text from all compatible files.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Button
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-5 py-6 shadow-subtle"
              >
                <FileText className="w-5 h-5" />
                <span>Select Files</span>
              </Button>
              
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="flex items-center gap-2 px-5 py-6 shadow-subtle"
              >
                <Folder className="w-5 h-5" />
                <span>Select Directory</span>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple
          webkitdirectory=""
          directory=""
        />
      </Card>
    </div>
  );
};

export default FileUploader;
