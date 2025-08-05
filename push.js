const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Directories
const CMS_DIR = './cms';
const WRITING_DIR = './writing';

// HTML template based on existing agi.html structure
function createHTMLTemplate(post, content) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png">
    <link rel="manifest" href="../favicon/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="../styles/styles.css">
    <title>${post.title} - alex's blog</title>
    <style>
        body {
            overflow: auto;
            justify-content: flex-start;
            padding-top: 50px;
        }
        .blog-content {
            max-width: 600px;
            line-height: 1.6;
        }
        .blog-content h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        .blog-content h2 {
            font-size: 20px;
            margin-top: 40px;
            margin-bottom: 15px;
        }
        .blog-content p {
            margin-bottom: 20px;
        }
        .video-container {
            margin: 30px 0;
            text-align: center;
        }
        .date {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="blog-content">
            <span class="toprow"><a href="../writing/index.html">← back to writing</a></span>
            
            <h1>${post.title}</h1>
            <div class="date">${post.date}</div>
            
            ${content}
            
        </div>
    </div>
</body>
</html>`;
}

// Process raw HTML blocks (---raw--- content ---/raw---)
function processRawBlocks(content) {
    return content.replace(/---raw---([\s\S]*?)---\/raw---/g, (match, rawContent) => {
        return rawContent.trim();
    });
}

// Convert markdown to HTML with raw block processing
function convertMarkdownToHTML(markdown) {
    // First process raw blocks
    const processedMarkdown = processRawBlocks(markdown);
    
    // Then convert remaining markdown to HTML
    return marked(processedMarkdown);
}

// Build individual post
function buildPost(filename) {
    const filePath = path.join(CMS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data: frontmatter, content: markdown } = matter(fileContent);
    
    // Skip drafts
    if (frontmatter.status === 'draft') {
        console.log(`⏭️  Skipping draft: ${filename}`);
        return null;
    }
    
    // Convert markdown to HTML
    const htmlContent = convertMarkdownToHTML(markdown);
    
    // Create full HTML page
    const fullHTML = createHTMLTemplate(frontmatter, htmlContent);
    
    // Write to writing directory
    const outputFilename = `${frontmatter.slug || path.parse(filename).name}.html`;
    const outputPath = path.join(WRITING_DIR, outputFilename);
    
    fs.writeFileSync(outputPath, fullHTML);
    console.log(`✅ Generated: ${outputFilename}`);
    
    return {
        title: frontmatter.title,
        date: frontmatter.date,
        slug: frontmatter.slug || path.parse(filename).name,
        filename: outputFilename,
        status: frontmatter.status
    };
}

// Update writing index with all posts
function updateWritingIndex(posts) {
    const publishedPosts = posts.filter(post => post && post.status === 'published');
    
    const postLinks = publishedPosts
        .map(post => `        <span><a href="${post.filename}">${post.title} [blog] (wip)</a></span>`)
        .join('\n');
    
    const indexHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" hrelf="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href = "../styles/styles.css">
    <title>alex's webpage</title>
</head>


<body>
    
    <div class="container">
        <section>
        <span class="toprow"><a  href="../index.html"><- go back</a></span>


${postLinks}
        </span>
        

        </section>

    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(WRITING_DIR, 'index.html'), indexHTML);
    console.log(`✅ Updated writing/index.html with ${publishedPosts.length} posts`);
}

// Main build function
function build() {
    console.log('🚀 Building site...');
    
    // Ensure directories exist
    if (!fs.existsSync(CMS_DIR)) {
        fs.mkdirSync(CMS_DIR, { recursive: true });
        console.log(`📁 Created ${CMS_DIR} directory`);
    }
    
    if (!fs.existsSync(WRITING_DIR)) {
        fs.mkdirSync(WRITING_DIR, { recursive: true });
        console.log(`📁 Created ${WRITING_DIR} directory`);
    }
    
    // Get all markdown files
    const markdownFiles = fs.readdirSync(CMS_DIR)
        .filter(file => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
        console.log('❌ No markdown files found in cms/ directory');
        return;
    }
    
    console.log(`📝 Found ${markdownFiles.length} markdown files`);
    
    // Build all posts
    const posts = markdownFiles.map(buildPost);
    
    // Update writing index
    updateWritingIndex(posts);
    
    console.log('✨ Build complete!');
}

// Run build
build(); 