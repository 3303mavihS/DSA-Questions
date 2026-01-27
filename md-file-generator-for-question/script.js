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

// Get difficulty emoji
function getDifficultyEmoji(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "🟢";
    case "Medium":
      return "🟡";
    case "Hard":
      return "🔴";
    default:
      return "🔢";
  }
}

// Format text in rich text editor
function formatText(elementId, format) {
  const editor = document.getElementById(elementId);
  const selection = window.getSelection();

  if (selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  // Make sure we're working within the editor
  if (!isWithinEditor(selection, editor)) return;

  switch (format) {
    case "bold":
      document.execCommand("bold", false, null);
      break;
    case "italic":
      document.execCommand("italic", false, null);
      break;
    case "heading":
      // Use execCommand for consistent behavior
      const h1 = document.createElement("h1");
      h1.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(h1);
      // Set cursor position after the inserted heading
      selection.removeAllRanges();
      break;
    case "subheading":
      const h2 = document.createElement("h2");
      h2.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(h2);
      selection.removeAllRanges();
      break;
    case "bullets":
      document.execCommand("insertUnorderedList", false, null);
      break;
    case "code":
      const code = document.createElement("code");
      code.innerHTML = range.toString();
      range.deleteContents();
      range.insertNode(code);
      selection.removeAllRanges();
      break;
  }
}

// Check if selection is within the editor
function isWithinEditor(selection, editor) {
  if (selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  return editor.contains(range.commonAncestorContainer);
}

// Convert HTML content to Markdown - FIXED FUNCTION
function htmlToMarkdown(html) {
  if (!html || html.trim() === "") return "";

  const container = document.createElement("div");
  container.innerHTML = html;

  function processNode(node, listPrefix = "") {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const tag = node.tagName.toLowerCase();
    let result = "";

    // Process children with appropriate context
    let childResults = [];
    for (const child of node.childNodes) {
      // For list items, pass the appropriate prefix
      const prefix = tag === "ul" ? "- " : tag === "ol" ? "1. " : "";
      childResults.push(processNode(child, prefix));
    }
    let children = childResults.join("");

    switch (tag) {
      case "h1":
        return `# ${children}\n\n`;
      case "h2":
        return `## ${children}\n\n`;
      case "h3":
        return `### ${children}\n\n`;
      case "strong":
      case "b":
        return `**${children}**`;
      case "em":
      case "i":
        return `*${children}*`;
      case "code":
        return `\`${children}\``;
      case "pre":
        return `\`\`\`\n${children}\n\`\`\`\n\n`;
      case "ul":
        // Process list items separately to ensure proper formatting
        let ulResult = "";
        for (const child of node.childNodes) {
          if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === "li"
          ) {
            ulResult += `- ${processNode(child, "").trim()}\n`;
          }
        }
        return ulResult + "\n";
      case "ol":
        // Process ordered list items with numbers
        let olResult = "";
        let counter = 1;
        for (const child of node.childNodes) {
          if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === "li"
          ) {
            olResult += `${counter}. ${processNode(child, "").trim()}\n`;
            counter++;
          }
        }
        return olResult + "\n";
      case "li":
        // Don't include the prefix here as it's handled by the parent list
        return children;
      case "br":
        return "  \n";
      case "p":
        return `${children}\n\n`;
      case "div":
        return `${children}\n`;
      default:
        return children;
    }
  }

  const result = processNode(container);

  // Clean up extra line breaks and whitespace
  return result
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+$/gm, "") // Remove trailing whitespace
    .trim();
}

// Generate Markdown
function generateMarkdown() {
  const problemTitle = document.getElementById("problem-title").value.trim();
  const source = document.getElementById("source").value.trim();
  const problemUrl = document.getElementById("problem-url").value.trim();
  const difficulty = document.getElementById("difficulty").value;

  // Use the improved htmlToMarkdown function for all content fields
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

  // Get difficulty emoji
  const difficultyEmoji = getDifficultyEmoji(difficulty);

  let markdown = `# ${problemTitle} (${source}) ${difficultyEmoji}`;

  // Add difficulty level
  markdown += `\n\n**Difficulty :** ${difficulty}`;

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
${complexity}

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
  const difficulty = document.getElementById("difficulty").value.toLowerCase();
  const markdown = document.getElementById("output-content").value;

  // Create safe filename with difficulty
  const safeTitle = problemTitle
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
  const fileName = `${difficulty}_${safeTitle}.md`;

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
