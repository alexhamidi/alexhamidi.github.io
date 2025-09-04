# Markdown to Blog Converter

A simple tool to convert markdown files to HTML blog posts with your site's styling.

## Usage

```bash
# Basic usage
node md-to-blog.js <markdown-file> [output-file] [date]

# Or using npm script
npm run md-to-blog <markdown-file> [output-file] [date]
```

## Examples

```bash
# Convert with default output name
node md-to-blog.js "my-blog-post.md"

# Specify output file and date
node md-to-blog.js "building SoTA people search @ Clado.md" clado-blog.html "August 2024"

# Using npm script
npm run md-to-blog "my-post.md" blog-post.html "December 2024"
```

## Features

- Converts markdown headers, links, code blocks, and lists
- Maintains your site's consistent styling with Tailwind classes
- Includes syntax highlighting with Prism.js
- Adds navigation and footer with your social links
- Extracts title from first header or filename

## Output

The tool generates a complete HTML file with:
- Your site's header styling and navigation
- Properly formatted blog content
- Back to home link
- Author attribution and social links
- Responsive design matching your main site