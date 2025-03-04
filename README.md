
# Textify Navigator

<div align="center">
  <img src="public/og-image.png" alt="Textify Navigator" width="300" />
  <h3>Extract text from all files in your codebase for easy reference and sharing</h3>
</div>

## Overview

Textify Navigator is a web application that processes directories and extracts text content from code and text files. It creates a single text file containing all code with file paths, making it perfect for sharing codebases with Language Models (LLMs) like ChatGPT, Claude, or Gemini.

## 🚀 Features

- **Directory Processing**: Uploads and navigates through entire directory structures
- **Nested Folder Support**: Traverses and processes nested directories automatically
- **Code File Extraction**: Extracts code from various programming languages and file formats
- **Clean Output Format**: Organizes extracted text by file paths for clear context
- **Browser-Based**: Works entirely in the browser with no server dependencies
- **Large File Support**: Handles files up to 20MB in size
- **Fast Processing**: Efficiently processes even large codebases

## 🛠️ Supported File Types

Textify Navigator supports a wide range of file types, including:

### Programming Languages
- JavaScript/TypeScript (.js, .jsx, .ts, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp, .h)
- Ruby (.rb)
- Go (.go)
- PHP (.php)
- Rust (.rs)
- Swift (.swift)
- Kotlin (.kt)
- And many more...

### Configuration & Markup
- JSON (.json)
- YAML (.yml, .yaml)
- XML (.xml)
- HTML (.html, .htm)
- CSS/SCSS/SASS (.css, .scss, .sass)
- Markdown (.md)

### Other Text Formats
- Plain text (.txt)
- CSV (.csv)
- Configuration files (.env, .config, etc.)

## 🔍 Use Cases

- **AI Code Assistance**: Share your codebase with LLMs for context-aware assistance
- **Code Reviews**: Quickly create a browsable text version of your project
- **Documentation**: Generate a comprehensive view of your codebase
- **Knowledge Sharing**: Share code structure with team members or clients
- **Backup**: Create searchable text backups of your code projects

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/textify-navigator.git
   cd textify-navigator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## 📖 How to Use

1. **Open the Application**: Access Textify Navigator in your browser
2. **Upload Your Directory**: 
   - Click "Select Directory" to choose a folder
   - Or drag and drop a folder onto the upload area
3. **Wait for Processing**: The application will scan all files and extract text content
4. **Review Results**: See a summary of processed files and preview the output
5. **Download Output**: Click "Download File" to save the compiled text document
6. **Use with AI Tools**: Copy the content or upload the file to your favorite LLM

## ⚙️ Technical Details

Textify Navigator is built with:

- React + TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui for component library
- File System Access API for directory traversal

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The shadcn/ui team for their excellent component library
- The React and Vite teams for their amazing tools

---

<div align="center">
  <p>Made with ❤️ for developers and AI enthusiasts</p>
</div>
