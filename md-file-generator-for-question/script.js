// Format text in rich text editor
function formatText(elementId, format) {
  const editor = document.getElementById(elementId);
  const selection = window.getSelection();

  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  switch (format) {
    case "bold":
      document.execCommand("bold", false, null);
      break;
    case "italic":
      document.execCommand("italic", false, null);
      break;
    case "heading":
      if (isWithinEditor(selection, editor)) {
        const heading = document.createElement("h1");
        heading.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(heading);
      }
      break;
    case "subheading":
      if (isWithinEditor(selection, editor)) {
        const subheading = document.createElement("h2");
        subheading.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(subheading);
      }
      break;
    case "bullets":
      if (isWithinEditor(selection, editor)) {
        document.execCommand("insertUnorderedList", false, null);
      }
      break;
    case "code":
      if (isWithinEditor(selection, editor)) {
        const code = document.createElement("code");
        code.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(code);
      }
      break;
  }
}

// Check if selection is within the editor
function isWithinEditor(selection, editor) {
  if (selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  return editor.contains(range.commonAncestorContainer);
}

// Convert HTML content to Markdown
function htmlToMarkdown(html) {
  let markdown = html;

  // Handle headings
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");

  // Handle bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");

  // Handle italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");

  // Handle lists
  markdown = markdown.replace(
    /<ul[^>]*>(.*?)<\/ul>/gi,
    function (match, content) {
      return content.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
    }
  );

  // Handle code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");

  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, "");

  // Fix extra line breaks
  markdown = markdown.replace(/\n{3,}/g, "\n\n");

  // Decode HTML entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = markdown;
  markdown = textarea.value;

  return markdown.trim();
}

// Generate Markdown
function generateMarkdown() {
  const problemTitle = document.getElementById("problem-title").value.trim();
  const source = document.getElementById("source").value.trim();
  const problemUrl = document.getElementById("problem-url").value.trim();
  const problemStatement = htmlToMarkdown(
    document.getElementById("problem-statement").innerHTML
  );
  const understanding = htmlToMarkdown(
    document.getElementById("understanding").innerHTML
  );
  const approach = htmlToMarkdown(
    document.getElementById("approach").innerHTML
  );
  const language = document.getElementById("language").value;
  const code = document.getElementById("code").value;
  const complexity = htmlToMarkdown(
    document.getElementById("complexity").innerHTML
  );
  const edgeCases = htmlToMarkdown(
    document.getElementById("edge-cases").innerHTML
  );

  // Format edge cases as list items if they're not already
  let formattedEdgeCases = "";
  if (edgeCases.includes("\n- ") || edgeCases.startsWith("- ")) {
    formattedEdgeCases = edgeCases; // Already formatted as list
  } else {
    // Split by commas or newlines and format as list
    const cases = edgeCases.split(/,|\n/).filter((c) => c.trim());
    formattedEdgeCases = cases.map((c) => `- ✔️ ${c.trim()}`).join("\n");
  }

  let markdown = `# ${problemTitle} (${source}) 🔢`;

  // Add URL if provided
  if (problemUrl) {
    markdown += `\n\n[Problem Link](${problemUrl})`;
  }

  markdown += `\n\n## Problem Statement
${problemStatement}

## Understanding 💡
${understanding}

## Approach 🚀
${approach}

## Code 🖥️
\`\`\`${language}
${code}
\`\`\`

## Complexity Analysis ⏳
**Time Complexity:** ${complexity.split("\n")[0]}  
**Space Complexity:** ${complexity.split("\n")[1] || complexity.split("\n")[0]}

## Edge Cases 🔍
${formattedEdgeCases}
`;

  document.getElementById("output-content").value = markdown;
  document.getElementById("output-section").style.display = "block";

  // Scroll to output
  document
    .getElementById("output-section")
    .scrollIntoView({ behavior: "smooth" });
}

// Copy to clipboard
function copyToClipboard() {
  const output = document.getElementById("output-content");
  output.select();
  document.execCommand("copy");

  // Show feedback
  const copyBtn = document.querySelector(".copy-btn");
  const originalText = copyBtn.textContent;
  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = originalText;
  }, 2000);
}

// Download markdown file
function downloadMarkdown() {
  const problemTitle = document.getElementById("problem-title").value.trim();
  const markdown = document.getElementById("output-content").value;

  // Create safe filename
  const safeTitle = problemTitle
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
  const fileName = `${safeTitle}.md`;

  // Create and download file
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initialize placeholders for contenteditable elements
document.querySelectorAll(".rich-text-editor").forEach((editor) => {
  editor.addEventListener("focus", function () {
    if (this.textContent.trim() === "") {
      this.textContent = "";
    }
  });

  editor.addEventListener("blur", function () {
    if (this.textContent.trim() === "") {
      this.innerHTML = "";
    }
  });
});
