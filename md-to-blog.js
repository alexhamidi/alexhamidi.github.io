#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function parseMarkdownTables(html) {
  const tableRegex = /(\|.*\|\n\|[\s\-\|:]+\|\n(?:\|.*\|\n?)*)/g;
  
  return html.replace(tableRegex, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 2) return match;
    
    const headerLine = lines[0];
    const separatorLine = lines[1];
    const dataLines = lines.slice(2);
    
    // Parse header
    const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
    
    // Parse alignment from separator line
    const alignments = separatorLine.split('|').map(s => {
      s = s.trim();
      if (s.startsWith(':') && s.endsWith(':')) return 'center';
      if (s.endsWith(':')) return 'right';
      return 'left';
    }).filter((_, i) => i < headers.length);
    
    // Parse data rows
    const rows = dataLines.map(line => 
      line.split('|').map(cell => cell.trim()).filter(cell => cell)
    ).filter(row => row.length > 0);
    
    // Generate HTML table
    let tableHtml = '<table class="min-w-full border-collapse border border-gray-300 my-6 text-sm">\n';
    
    // Header
    tableHtml += '  <thead class="bg-gray-50">\n    <tr>\n';
    headers.forEach((header, i) => {
      const align = alignments[i] || 'left';
      const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
      tableHtml += `      <th class="border border-gray-300 px-4 py-2 font-semibold ${alignClass}">${header}</th>\n`;
    });
    tableHtml += '    </tr>\n  </thead>\n';
    
    // Body
    tableHtml += '  <tbody>\n';
    rows.forEach(row => {
      tableHtml += '    <tr>\n';
      row.forEach((cell, i) => {
        const align = alignments[i] || 'left';
        const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
        tableHtml += `      <td class="border border-gray-300 px-4 py-2 ${alignClass}">${cell}</td>\n`;
      });
      tableHtml += '    </tr>\n';
    });
    tableHtml += '  </tbody>\n</table>';
    
    return tableHtml;
  });
}

function parseMarkdown(markdown) {
  let html = markdown;
  
  // Parse headers
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6">$1</h1>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>');
  
  // Parse bold text
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Parse Desmos link and replace with interactive graph
  html = html.replace(/\[https:\/\/www\.desmos\.com\/calculator\]\(https:\/\/www\.desmos\.com\/calculator\)/g, '<div id="tanh-graph" class="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200"><div class="text-center mb-4 text-sm font-semibold text-gray-700">Score VS Quantity as Expected Quantity Increases</div><div class="mb-4 flex items-center justify-center gap-4"><label class="text-sm font-medium text-gray-600">E(q) = </label><input type="range" id="n-slider" min="1" max="100" value="10" step="1" class="w-48 accent-gray-800"><span id="n-value" class="text-sm font-mono bg-white px-2 py-1 rounded border">10</span></div><div id="plot-container" style="height: 350px;" class="bg-white rounded border"></div></div>');
  
  // Parse images (must come before links since they use similar syntax)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="../public/$2" alt="$1" class="max-w-full h-auto my-6 rounded-lg border border-gray-200">');
  
  // Parse other links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline text-gray-900 transition-all duration-500 hover:text-gray-50 hover:bg-gray-700 px-0.5">$1</a>');
  
  // Parse LaTeX block equations
  html = html.replace(/\$\$\n([\s\S]*?)\n\$\$/g, '<div class=" my-6 bg-gray-50 p-4 border border-gray-200 rounded-lg text-center">$$\n$1\n$$</div>');
  
  // Parse inline LaTeX
  html = html.replace(/\$([^$\n]+)\$/g, '<span class="math-inline">$$$1$$</span>');
  
  // Parse code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code class="language-$1">$2</code></pre>');
  
  // Parse inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm">$1</code>');
  
  // Parse tables
  html = parseMarkdownTables(html);
  
  // Parse paragraphs (split by double newlines, but preserve existing structure)
  const sections = html.split(/\n\s*\n/);
  html = sections.map(section => {
    section = section.trim();
    if (!section) return '';
    
    // Skip if already wrapped in HTML tags
    if (section.match(/^<[h1-6|pre|ul|ol|div|table]/)) {
      return section;
    }
    
    // Handle lists
    if (section.includes('\n') && (section.match(/^\d+\./m) || section.match(/^-/m))) {
      const lines = section.split('\n');
      let listHtml = '';
      let inList = false;
      let listType = '';
      
      lines.forEach(line => {
        line = line.trim();
        if (line.match(/^\d+\./)) {
          if (!inList || listType !== 'ol') {
            if (inList) listHtml += `</${listType}>`;
            listHtml += '<ol class="list-decimal pl-6 mb-4 space-y-2">';
            listType = 'ol';
            inList = true;
          }
          listHtml += `<li>${line.replace(/^\d+\.\s*/, '')}</li>`;
        } else if (line.match(/^-/)) {
          if (!inList || listType !== 'ul') {
            if (inList) listHtml += `</${listType}>`;
            listHtml += '<ul class="list-disc pl-6 mb-4 space-y-2">';
            listType = 'ul';
            inList = true;
          }
          listHtml += `<li>${line.replace(/^-\s*/, '')}</li>`;
        } else if (line && inList) {
          // Continue previous list item
          listHtml = listHtml.replace(/<\/li>$/, ` ${line}</li>`);
        } else if (line) {
          if (inList) {
            listHtml += `</${listType}>`;
            inList = false;
          }
          listHtml += `<p class="mb-4 leading-relaxed">${line}</p>`;
        }
      });
      
      if (inList) {
        listHtml += `</${listType}>`;
      }
      
      return listHtml;
    }
    
    return `<p class="mb-4 leading-relaxed">${section}</p>`;
  }).join('\n');
  
  return html;
}

function createBlogHTML(title, content, date = 'August 2024') {
  return `<!DOCTYPE html>
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
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
      }
    };
  </script>
  <title>${title} - Alex Hamidi</title>
</head>

<body class="flex flex-col items-center text-gray-900 font-mono overflow-x-hidden bg-[#fcfcfa] color-[#121212]">

  <div class="flex flex-col gap-8 max-w-[700px] px-[20px] mb-12">

    <div class="flex items-center justify-between mt-8 mb-4">
      <a href="/" class="text-sm text-gray-600 hover:text-gray-900 underline">← back to home</a>
      <div class="text-xs text-gray-500">${date}</div>
    </div>

    <article class="blog-content text-sm">
      ${content}
    </article>

    <div class="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
      <div class="text-sm text-gray-600">
        Written by <a href="/" class="underline hover:text-gray-900">Alex Hamidi</a>
      </div>
      <div class="flex gap-4 text-sm">
        <a href="https://twitter.com/ahamidi_" class="text-gray-600 hover:text-gray-900 underline">Twitter</a>
        <a href="https://github.com/alexhamidi/" class="text-gray-600 hover:text-gray-900 underline">GitHub</a>
      </div>
    </div>

  </div>

  <script>
    // Initialize the tanh graph if the element exists
    document.addEventListener('DOMContentLoaded', function() {
      const plotContainer = document.getElementById('plot-container');
      const slider = document.getElementById('n-slider');
      const nValue = document.getElementById('n-value');
      
      if (plotContainer && slider && nValue) {
        function updateGraph() {
          const n = parseFloat(slider.value);
          nValue.textContent = n;
          
          // Generate data points for x > 0
          const x = [];
          const y = [];
          for (let i = 0.1; i <= 100; i += 0.1) {
            x.push(i);
            y.push(Math.tanh(2 * i / n));
          }
          
          const trace = {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines',
            name: \`n = \${n}\`,
            line: {
              color: '#000000',
              width: 3
            },
            hovertemplate: '|D|: %{x:.1f}<br>score: %{y:.3f}<extra></extra>'
          };
          
          const layout = {
            xaxis: {
              title: { text: '|D|', font: { size: 14, family: 'ui-monospace, monospace' } },
              range: [0, 100],
              gridcolor: '#e5e7eb',
              gridwidth: 1,
              zeroline: true,
              zerolinecolor: '#9ca3af',
              zerolinewidth: 2
            },
            yaxis: {
              title: { text: 'score', font: { size: 14, family: 'ui-monospace, monospace' } },
              range: [0, 1.1],
              gridcolor: '#e5e7eb',
              gridwidth: 1,
              zeroline: true,
              zerolinecolor: '#9ca3af',
              zerolinewidth: 1
            },
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            font: { family: 'ui-monospace, monospace', size: 12, color: '#374151' },
            margin: { t: 20, r: 30, b: 50, l: 60 },
            showlegend: false
          };
          
          const config = {
            responsive: true,
            displayModeBar: false
          };
          
          Plotly.newPlot(plotContainer, [trace], layout, config);
        }
        
        // Initial plot
        updateGraph();
        
        // Update on slider change with smooth animation
        slider.addEventListener('input', updateGraph);
      }
    });
  </script>

</body>

</html>`;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node md-to-blog.js <markdown-file> [output-file] [date]');
  console.log('Example: node md-to-blog.js "building SoTA people search @ Clado 25f02c15b1828048a17fed7d2cc45f88.md" clado-blog.html "August 2024"');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || 'blog-output.html';
const date = args[2] || 'August 2024';

if (!fs.existsSync(inputFile)) {
  console.error(`Error: File "${inputFile}" not found.`);
  process.exit(1);
}

try {
  const markdown = fs.readFileSync(inputFile, 'utf8');
  
  // Extract title from first line or filename
  const lines = markdown.split('\n');
  const title = lines[0].startsWith('#') ? lines[0].replace(/^#\s*/, '') : path.basename(inputFile, '.md');
  
  const htmlContent = parseMarkdown(markdown);
  const fullHTML = createBlogHTML(title, htmlContent, date);
  
  fs.writeFileSync(outputFile, fullHTML);
  console.log(`✅ Successfully converted "${inputFile}" to "${outputFile}"`);
  console.log(`📝 Title: ${title}`);
  console.log(`📅 Date: ${date}`);
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}