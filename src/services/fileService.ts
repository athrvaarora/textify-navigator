
import { isTextFile, readFileAsText, formatFilePath, MAX_FILE_SIZE } from '../utils/fileUtils';

export interface FileEntry {
  path: string;
  content: string;
  size: number;
  type: string;
}

export interface ProcessingResult {
  entries: FileEntry[];
  totalFiles: number;
  processedFiles: number;
  skippedFiles: number;
  totalSize: number;
}

export interface ProcessingError {
  file: string;
  error: string;
}

/**
 * Process a directory of files
 */
export const processDirectoryFiles = async (
  items: FileSystemEntry[]
): Promise<ProcessingResult> => {
  const result: ProcessingResult = {
    entries: [],
    totalFiles: 0,
    processedFiles: 0,
    skippedFiles: 0,
    totalSize: 0,
  };
  
  const errors: ProcessingError[] = [];
  
  // Process entries recursively
  const processEntry = async (entry: FileSystemEntry, path: string = '') => {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;
      
      fileEntry.file(async (file) => {
        result.totalFiles++;
        result.totalSize += file.size;
        
        // Skip files that are too large or not text-based
        if (file.size > MAX_FILE_SIZE) {
          result.skippedFiles++;
          errors.push({
            file: `${path}/${file.name}`,
            error: 'File exceeds maximum size limit',
          });
          return;
        }
        
        if (!isTextFile(file)) {
          result.skippedFiles++;
          return;
        }
        
        try {
          const content = await readFileAsText(file);
          result.entries.push({
            path: formatFilePath(`${path}/${file.name}`),
            content,
            size: file.size,
            type: file.type || 'text/plain', // Default to text/plain if no type
          });
          result.processedFiles++;
        } catch (error) {
          result.skippedFiles++;
          errors.push({
            file: `${path}/${file.name}`,
            error: (error as Error).message || 'Unknown error',
          });
        }
      });
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const dirReader = dirEntry.createReader();
      
      // Read all entries in the directory
      const readEntries = (): Promise<FileSystemEntry[]> => {
        return new Promise((resolve, reject) => {
          dirReader.readEntries(
            (entries) => {
              if (entries.length === 0) {
                resolve([]);
              } else {
                readEntries().then((nextEntries) => {
                  resolve([...entries, ...nextEntries]);
                });
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      };
      
      const entries = await readEntries();
      const newPath = path ? `${path}/${entry.name}` : entry.name;
      
      for (const entry of entries) {
        await processEntry(entry, newPath);
      }
    }
  };
  
  // Process all entries concurrently
  await Promise.all(items.map((entry) => processEntry(entry)));
  
  return result;
};

/**
 * Generates a text file with all the content and file paths
 */
export const generateOutputFile = (result: ProcessingResult): string => {
  let output = `# Directory Content Summary\n`;
  output += `Total files: ${result.totalFiles}\n`;
  output += `Processed files: ${result.processedFiles}\n`;
  output += `Skipped files: ${result.skippedFiles}\n\n`;
  
  result.entries.forEach((entry) => {
    output += `\n\n# FILE: ${entry.path}\n`;
    output += `# SIZE: ${entry.size} bytes\n`;
    output += `# TYPE: ${entry.type}\n`;
    output += '```\n';
    output += entry.content;
    output += '\n```\n';
  });
  
  return output;
};

/**
 * Create and download a text file
 */
export const downloadTextFile = (content: string, filename: string = 'code-index.txt'): void => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
