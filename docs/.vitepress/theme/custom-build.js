// Custom build script to generate clean HTML files from Markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';

const md = new MarkdownIt();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read a Markdown file and convert it to HTML
function convertMarkdownToHtml(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse frontmatter
  const { content: markdownContent, data: frontmatter } = matter(fileContent);

  // Render markdown to HTML
  const content = md.render(markdownContent);

  // Get title from frontmatter or use default
  const title = frontmatter.title || path.basename(filePath, '.md') || 'AI Demo';

  // Create a simple HTML template
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #2c3e50;
    }
    a {
      color: #3eaf7c;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    img {
      max-width: 100%;
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      background-color: #f8f8f8;
      padding: 0.25rem 0.5rem;
      border-radius: 3px;
    }
    pre {
      background-color: #f8f8f8;
      padding: 1rem;
      border-radius: 3px;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;
}

// Function to process all Markdown files in a directory
function processDirectory(directory, outputDir) {
  // Skip certain directories to avoid infinite recursion
  const skipDirs = ['.vitepress/dist', '.vitepress/cache', 'node_modules'];
  for (const skipDir of skipDirs) {
    if (directory.includes(skipDir)) {
      console.log(`Skipping directory: ${directory}`);
      return;
    }
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all files in the directory
  const files = fs.readdirSync(directory);

  // Process each file
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (file === 'node_modules' || file === '.vitepress') {
        console.log(`Skipping directory: ${filePath}`);
        return;
      }

      // Recursively process subdirectories
      const subOutputDir = path.join(outputDir, file);
      processDirectory(filePath, subOutputDir);
    } else if (file.endsWith('.md')) {
      // Convert Markdown file to HTML
      const html = convertMarkdownToHtml(filePath);

      // Write HTML file
      const outputFile = path.join(outputDir, file.replace('.md', '.html'));
      fs.writeFileSync(outputFile, html);
      console.log(`Converted ${filePath} to ${outputFile}`);
    }
  });
}

// Main function
function main() {
  const docsDir = path.resolve(__dirname, '../../');
  const outputDir = path.resolve(__dirname, '../../../src/docs');

  // Process all Markdown files in the docs directory
  processDirectory(docsDir, outputDir);
}

// Run the main function
main();
