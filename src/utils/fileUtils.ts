/**
 * Utility functions for handling file operations
 */

/**
 * Maximum allowed file size in bytes (20MB)
 */
export const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * File types that are typically text-based and can be processed
 */
export const TEXT_FILE_TYPES = [
  // Programming languages
  'text/plain', 'text/html', 'text/css', 'text/javascript', 
  'application/javascript', 'application/json', 'application/xml',
  'text/markdown', 'text/x-python', 'text/x-java', 'text/x-c',
  'text/x-c++', 'text/x-typescript', 'application/x-httpd-php',
  
  // Document formats
  'text/csv', 'text/tab-separated-values',
  
  // Custom handling for common code files without explicit MIME types
];

/**
 * File extensions that are typically text-based
 */
export const TEXT_FILE_EXTENSIONS = [
  // Programming files
  '.js', '.jsx', '.ts', '.tsx', '.html', '.htm', '.css', '.scss', '.sass',
  '.less', '.json', '.xml', '.yml', '.yaml', '.md', '.markdown', '.txt',
  '.rtf', '.csv', '.py', '.rb', '.java', '.c', '.cpp', '.cs', '.go', '.rs',
  '.php', '.pl', '.sh', '.bash', '.zsh', '.ps1', '.swift', '.kt', '.kts',
  '.gradle', '.sql', '.graphql', '.prisma',
  
  // Config files
  '.env', '.gitignore', '.eslintrc', '.prettierrc', '.babelrc', '.editorconfig',
  '.dockerignore', '.htaccess', '.ini', '.conf', '.cfg', '.toml',
  
  // Document files
  '.csv', '.tsv', '.log',
  
  // Additional code file types
  '.vue', '.svelte', '.jsx', '.dart', '.lua', '.r', '.perl', '.m', '.h',
  '.jsp', '.aspx', '.erb', '.haml', '.slim', '.pug', '.jade', '.ex', '.exs',
  '.hbs', '.twig', '.razor', '.elm', '.clj', '.scala', '.groovy',
  '.tf', '.nix', '.cmake', '.make', '.asm', '.s', '.bat', '.cmd',
  '.proto', '.sol', '.hs', '.erl', '.fs', '.fsx',
];

/**
 * File types to be excluded from processing
 */
export const EXCLUDED_FILE_TYPES = [
  'image/', 'audio/', 'video/', 'font/', 
  'application/zip', 'application/x-zip-compressed',
  'application/x-7z-compressed', 'application/x-rar-compressed',
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument',
  'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
];

/**
 * Checks if a file is likely to be text-based by MIME type or extension
 */
export const isTextFile = (file: File): boolean => {
  // Check by MIME type
  if (TEXT_FILE_TYPES.some(type => file.type.includes(type))) {
    return true;
  }
  
  // Check by extension
  const fileName = file.name.toLowerCase();
  if (TEXT_FILE_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
    return true;
  }
  
  // Exclude known binary formats
  if (EXCLUDED_FILE_TYPES.some(type => file.type.includes(type))) {
    return false;
  }
  
  // For files without a recognized MIME type, try to determine by extension
  // Most code files will fall here since browsers often don't recognize specific code file types
  return true; // Default to accepting files that aren't explicitly excluded
};

/**
 * Reads a file and returns its contents as text
 */
export const readFileAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error(`Error reading file: ${file.name}`));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Formats the file path for display
 */
export const formatFilePath = (path: string): string => {
  // Remove leading slashes or backslashes
  return path.replace(/^[\/\\]+/, '');
};

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};
