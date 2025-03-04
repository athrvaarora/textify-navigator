
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
  
  // Create a function to process files and return a promise
  const processFile = (file: File, filePath: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      result.totalFiles++;
      result.totalSize += file.size;
      
      // Skip files that are too large
      if (file.size > MAX_FILE_SIZE) {
        result.skippedFiles++;
        errors.push({
          file: filePath,
          error: 'File exceeds maximum size limit',
        });
        resolve();
        return;
      }
      
      // Check if it's a text file we can process
      if (!isTextFile(file)) {
        result.skippedFiles++;
        resolve();
        return;
      }
      
      // Read the file content
      readFileAsText(file)
        .then((content) => {
          result.entries.push({
            path: formatFilePath(filePath),
            content,
            size: file.size,
            type: file.type || 'text/plain', // Default to text/plain if no type
          });
          result.processedFiles++;
          resolve();
        })
        .catch((error) => {
          result.skippedFiles++;
          errors.push({
            file: filePath,
            error: (error as Error).message || 'Unknown error',
          });
          resolve();
        });
    });
  };
  
  // Create a function to recursively traverse directories and return a promise
  const processEntry = async (entry: FileSystemEntry, path: string = ''): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (entry.isFile) {
        const fileEntry = entry as FileSystemFileEntry;
        
        fileEntry.file((file) => {
          const filePath = `${path}/${file.name}`;
          processFile(file, filePath)
            .then(() => resolve())
            .catch((err) => {
              console.error(`Error processing file ${filePath}:`, err);
              resolve(); // Resolve anyway to continue with other files
            });
        }, (error) => {
          console.error(`Error getting file for ${entry.name}:`, error);
          resolve(); // Resolve anyway to continue with other files
        });
      } else if (entry.isDirectory) {
        const dirEntry = entry as FileSystemDirectoryEntry;
        const dirReader = dirEntry.createReader();
        const newPath = path ? `${path}/${entry.name}` : entry.name;
        
        // Function to read all entries in the directory
        const readAllEntries = (): Promise<FileSystemEntry[]> => {
          return new Promise((resolveRead, rejectRead) => {
            const entries: FileSystemEntry[] = [];
            
            // Recursive function to read entries in batches
            function readEntries() {
              dirReader.readEntries((results) => {
                if (results.length) {
                  entries.push(...results);
                  readEntries(); // Continue reading if more entries
                } else {
                  resolveRead(entries); // No more entries, resolve with all entries
                }
              }, rejectRead);
            }
            
            readEntries(); // Start reading
          });
        };
        
        // Process all entries in the directory
        readAllEntries()
          .then(async (entries) => {
            // Process each entry sequentially to avoid too many concurrent operations
            for (const childEntry of entries) {
              await processEntry(childEntry, newPath);
            }
            resolve();
          })
          .catch((error) => {
            console.error(`Error reading directory ${newPath}:`, error);
            resolve(); // Resolve anyway to continue with other files
          });
      } else {
        // Not a file or directory, just resolve
        resolve();
      }
    });
  };
  
  // Process all top-level entries sequentially
  for (const entry of items) {
    await processEntry(entry);
  }
  
  console.log(`Processed ${result.processedFiles} files, skipped ${result.skippedFiles} files`);
  console.log(`Found ${result.entries.length} text entries`);
  
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
