// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  // Hide code sections initially
  document.getElementById("code-sections").style.display = "none";
});

// Keep track of selected languages
const selectedLanguages = new Set();
let activeLanguage = null;

// Toggle language selection
function toggleLanguage(language) {
  const checkbox = document.getElementById(`lang-${language}`);
  const codeSection = document.getElementById(`code-${language}`);

  if (checkbox.checked) {
    selectedLanguages.add(language);

    // Show code sections container if at least one language is selected
    if (selectedLanguages.size === 1) {
      document.getElementById("code-sections").style.display = "block";
    }

    // Create tab if it doesn't exist
    const tabsContainer = document.getElementById("code-tabs");
    if (!document.getElementById(`tab-${language}`)) {
      const tab = document.createElement("div");
      tab.id = `tab-${language}`;
      tab.className = "lang-tab";
      tab.textContent = getLanguageDisplayName(language);
      tab.onclick = function () {
        activateLanguageTab(language);
      };
      tabsContainer.appendChild(tab);
    }

    // Activate this language if it's the first one selected
    if (!activeLanguage) {
      activateLanguageTab(language);
    }
  } else {
    selectedLanguages.delete(language);

    // Remove tab
    const tab = document.getElementById(`tab-${language}`);
    if (tab) {
      tab.remove();
    }

    // Hide code section
    codeSection.classList.remove("active");

    // If this was the active language, activate another one if available
    if (activeLanguage === language) {
      activeLanguage = null;
      if (selectedLanguages.size > 0) {
        activateLanguageTab([...selectedLanguages][0]);
      }
    }

    // Hide code sections container if no languages are selected
    if (selectedLanguages.size === 0) {
      document.getElementById("code-sections").style.display = "none";
    }
  }
}

// Activate a language tab and show its code editor
function activateLanguageTab(language) {
  // Deactivate all tabs and code sections
  document.querySelectorAll(".lang-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".code-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Activate the selected tab and code section
  const tab = document.getElementById(`tab-${language}`);
  const codeSection = document.getElementById(`code-${language}`);

  if (tab && codeSection) {
    tab.classList.add("active");
    codeSection.classList.add("active");
    activeLanguage = language;
  }
}

// Get display name for a language
function getLanguageDisplayName(language) {
  const displayNames = {
    python: "Python",
    cpp: "C++",
    java: "Java",
    javascript: "JavaScript",
  };
  return displayNames[language] || language;
}

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

## Code 🖥️\n`;

  // Add code sections for each selected language
  if (selectedLanguages.size > 0) {
    for (const language of selectedLanguages) {
      const codeContent = document.getElementById(
        `code-${language}-editor`
      ).value;
      markdown += `\n### ${getLanguageDisplayName(
        language
      )}\n\`\`\`${language}\n${codeContent}\n\`\`\`\n`;
    }
  } else {
    markdown += "\n*No code provided*\n";
  }

  markdown += `\n## Complexity Analysis ⏳
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
