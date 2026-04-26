// ─── State ───────────────────────────────────────────────────────────────────
const selectedLanguages = new Set();
let activeLanguage = null;

const STORAGE_KEY = "dsa-md-generator-v1";

// ─── Language helpers ─────────────────────────────────────────────────────────
const LANGUAGE_DISPLAY_NAMES = {
  python: "Python",
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript",
  typescript: "TypeScript",
  go: "Go",
  rust: "Rust",
};

function getLanguageDisplayName(lang) {
  return LANGUAGE_DISPLAY_NAMES[lang] || lang;
}

function getDifficultyEmoji(difficulty) {
  return { Easy: "🟢", Medium: "🟡", Hard: "🔴" }[difficulty] || "🔢";
}

// ─── Language tab management ──────────────────────────────────────────────────
function toggleLanguage(language) {
  const checkbox = document.getElementById(`lang-${language}`);

  if (checkbox.checked) {
    selectedLanguages.add(language);

    if (selectedLanguages.size === 1) {
      document.getElementById("code-sections").style.display = "block";
    }

    // Create code section dynamically on first selection; reuse on re-check
    if (!document.getElementById(`code-${language}`)) {
      const displayName = getLanguageDisplayName(language);
      const section = document.createElement("div");
      section.className = "code-section";
      section.id = `code-${language}`;
      section.innerHTML = `
        <label for="code-${language}-editor">${displayName} Code</label>
        <textarea class="code-editor" id="code-${language}-editor" placeholder="Paste your ${displayName} code here..."></textarea>
      `;
      document.getElementById("code-editors").appendChild(section);
      section.querySelector("textarea").addEventListener("input", scheduleSave);
    }

    if (!document.getElementById(`tab-${language}`)) {
      const tab = document.createElement("div");
      tab.id = `tab-${language}`;
      tab.className = "lang-tab";
      tab.textContent = getLanguageDisplayName(language);
      tab.onclick = () => activateLanguageTab(language);
      document.getElementById("code-tabs").appendChild(tab);
    }

    if (!activeLanguage) activateLanguageTab(language);
  } else {
    selectedLanguages.delete(language);

    const tab = document.getElementById(`tab-${language}`);
    if (tab) tab.remove();

    const section = document.getElementById(`code-${language}`);
    if (section) section.classList.remove("active");

    if (activeLanguage === language) {
      activeLanguage = null;
      if (selectedLanguages.size > 0)
        activateLanguageTab([...selectedLanguages][0]);
    }

    if (selectedLanguages.size === 0) {
      document.getElementById("code-sections").style.display = "none";
    }
  }
  scheduleSave();
}

function activateLanguageTab(language) {
  document
    .querySelectorAll(".lang-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".code-section")
    .forEach((s) => s.classList.remove("active"));

  const tab = document.getElementById(`tab-${language}`);
  const section = document.getElementById(`code-${language}`);
  if (tab && section) {
    tab.classList.add("active");
    section.classList.add("active");
    activeLanguage = language;
  }
}

// ─── Rich text formatting ─────────────────────────────────────────────────────
function formatText(elementId, format) {
  const editor = document.getElementById(elementId);
  const selection = window.getSelection();
  if (!selection.rangeCount || !isWithinEditor(selection, editor)) return;

  const range = selection.getRangeAt(0);

  // Wraps selection in element; places cursor inside if nothing was selected.
  function wrapSelection(tagName) {
    const el = document.createElement(tagName);
    el.appendChild(range.extractContents());
    range.insertNode(el);
    const newRange = document.createRange();
    newRange.setStart(
      el,
      el.textContent.trim() !== "" ? el.childNodes.length : 0,
    );
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  // Walk up from cursor to find an ancestor with the given tag inside the editor
  function findAncestor(tagName) {
    let node =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentNode
        : range.startContainer;
    while (node && node !== editor) {
      if (node.tagName && node.tagName.toLowerCase() === tagName) return node;
      node = node.parentNode;
    }
    return null;
  }

  switch (format) {
    // execCommand handles toggle, partial selections, and future-typing state
    case "bold":
      editor.focus();
      document.execCommand("bold", false, null);
      break;
    case "italic":
      editor.focus();
      document.execCommand("italic", false, null);
      break;

    // H3: toggle block format; execCommand("formatBlock") is the only reliable way
    case "heading":
      editor.focus();
      document.execCommand(
        "formatBlock",
        false,
        findAncestor("h3") ? "p" : "h3",
      );
      break;

    // Code: wrap selection, or unwrap if cursor is already inside <code>
    case "code": {
      const existing = findAncestor("code");
      if (existing) {
        const parent = existing.parentNode;
        while (existing.firstChild)
          parent.insertBefore(existing.firstChild, existing);
        parent.removeChild(existing);
      } else {
        wrapSelection("code");
      }
      break;
    }

    case "bullets":
      editor.focus();
      document.execCommand("insertUnorderedList", false, null);
      break;
    case "orderedList":
      editor.focus();
      document.execCommand("insertOrderedList", false, null);
      break;
  }

  updateToolbarState();
}

function isWithinEditor(selection, editor) {
  if (!selection.rangeCount) return false;
  return editor.contains(selection.getRangeAt(0).commonAncestorContainer);
}

// ─── Toolbar active state ─────────────────────────────────────────────────────
function updateToolbarState() {
  document
    .querySelectorAll(".toolbar button")
    .forEach((btn) => btn.classList.remove("toolbar-active"));

  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const anchor = sel.getRangeAt(0).startContainer;
  let activeEditor = null;
  for (const ed of document.querySelectorAll(".rich-text-editor")) {
    if (ed.contains(anchor)) {
      activeEditor = ed;
      break;
    }
  }
  if (!activeEditor) return;

  const toolbar = document.getElementById(`${activeEditor.id}-toolbar`);
  if (!toolbar) return;

  // Walk the DOM for formats that have no queryCommandState equivalent
  let inH3 = false,
    inCode = false;
  let node = anchor.nodeType === Node.TEXT_NODE ? anchor.parentNode : anchor;
  while (node && node !== activeEditor) {
    const t = node.tagName && node.tagName.toLowerCase();
    if (t === "h3") inH3 = true;
    if (t === "code") inCode = true;
    node = node.parentNode;
  }

  const isActive = {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    bullets: document.queryCommandState("insertUnorderedList"),
    orderedList: document.queryCommandState("insertOrderedList"),
    heading: inH3,
    code: inCode,
  };

  toolbar.querySelectorAll("button[onclick]").forEach((btn) => {
    const m = btn.getAttribute("onclick").match(/,\s*'([^']+)'\s*\)/);
    if (m && isActive[m[1]]) btn.classList.add("toolbar-active");
  });
}

// ─── HTML → Markdown ──────────────────────────────────────────────────────────
function htmlToMarkdown(html) {
  if (!html || html.trim() === "") return "";

  const container = document.createElement("div");
  container.innerHTML = html;

  function processNode(node, depth = 0) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const tag = node.tagName.toLowerCase();
    const children = () =>
      [...node.childNodes].map((c) => processNode(c, depth)).join("");

    switch (tag) {
      case "h1":
        return `# ${children()}\n\n`;
      case "h2":
        return `## ${children()}\n\n`;
      case "h3":
        return `### ${children()}\n\n`;
      case "strong":
      case "b":
        return `**${children()}**`;
      case "em":
      case "i":
        return `*${children()}*`;
      case "code":
        return `\`${children()}\``;
      case "pre":
        return `\`\`\`\n${children()}\n\`\`\`\n\n`;
      case "ul": {
        const indent = "  ".repeat(depth);
        let out = "";
        for (const child of node.childNodes) {
          if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === "li"
          ) {
            out += `${indent}- ${processNode(child, depth + 1).trim()}\n`;
          }
        }
        return out + (depth === 0 ? "\n" : "");
      }
      case "ol": {
        const indent = "  ".repeat(depth);
        let out = "";
        let n = 1;
        for (const child of node.childNodes) {
          if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === "li"
          ) {
            out += `${indent}${n++}. ${processNode(child, depth + 1).trim()}\n`;
          }
        }
        return out + (depth === 0 ? "\n" : "");
      }
      case "li":
        return children();
      case "br":
        return "  \n";
      case "p":
        return `${children()}\n\n`;
      case "div":
        return `${children()}\n`;
      default:
        return children();
    }
  }

  return processNode(container)
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+$/gm, "")
    .trim();
}

// ─── Generate Markdown ────────────────────────────────────────────────────────
function generateMarkdown() {
  const titleInput = document.getElementById("problem-title");
  const problemTitle = titleInput.value.trim();

  if (!problemTitle) {
    titleInput.classList.add("field-error");
    titleInput.focus();
    return;
  }
  titleInput.classList.remove("field-error");

  const source = document.getElementById("source").value.trim();
  const problemUrl = document.getElementById("problem-url").value.trim();
  const difficulty = document.getElementById("difficulty").value;

  const problemStatement = htmlToMarkdown(
    document.getElementById("problem-statement").innerHTML,
  );
  const understanding = htmlToMarkdown(
    document.getElementById("understanding").innerHTML,
  );
  const approach = htmlToMarkdown(
    document.getElementById("approach").innerHTML,
  );
  const complexity = htmlToMarkdown(
    document.getElementById("complexity").innerHTML,
  );
  const edgeCases = htmlToMarkdown(
    document.getElementById("edge-cases").innerHTML,
  );
  const notes = htmlToMarkdown(document.getElementById("notes").innerHTML);

  let formattedEdgeCases = "";
  if (edgeCases.includes("\n- ") || edgeCases.startsWith("- ")) {
    formattedEdgeCases = edgeCases;
  } else {
    formattedEdgeCases = edgeCases
      .split(/,|\n/)
      .filter((c) => c.trim())
      .map((c) => `- ✔️ ${c.trim()}`)
      .join("\n");
  }

  const difficultyEmoji = getDifficultyEmoji(difficulty);
  const sourceStr = source ? ` (${source})` : "";

  let md = `# ${problemTitle}${sourceStr} ${difficultyEmoji}`;
  md += `\n\n**Difficulty:** ${difficulty}`;
  if (problemUrl) md += `\n\n[Problem Link](${problemUrl})`;

  md += `\n\n## Problem Statement\n${problemStatement}`;
  md += `\n\n## Understanding 💡\n${understanding}`;
  md += `\n\n## Approach 🚀\n${approach}`;
  md += `\n\n## Code 🖥️\n`;

  if (selectedLanguages.size > 0) {
    for (const lang of selectedLanguages) {
      const code = document.getElementById(`code-${lang}-editor`).value;
      md += `\n### ${getLanguageDisplayName(lang)}\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    }
  } else {
    md += "\n*No code provided*\n";
  }

  md += `\n## Complexity Analysis ⏳\n${complexity}`;
  md += `\n\n## Edge Cases 🔍\n${formattedEdgeCases}`;

  if (notes.trim()) {
    md += `\n\n## Notes / Key Takeaways 📝\n${notes}`;
  }

  document.getElementById("output-content").value = md;

  // Switch layout: hide form, show output full-width, render preview
  document.getElementById("form-card").style.display = "none";
  document.querySelector(".playground").classList.add("preview-mode");
  document.getElementById("output-section").classList.add("active");
  showPreview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Markdown → HTML renderer ─────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  // Protect inline code before HTML-escaping
  const codes = [];
  text = text.replace(/`([^`\n]+)`/g, (_, c) => {
    codes.push(escapeHtml(c));
    return `\x00c${codes.length - 1}\x00`;
  });

  text = escapeHtml(text);

  // Bold before italic (handles ***)
  text = text.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  codes.forEach((c, i) => {
    text = text.replace(`\x00c${i}\x00`, `<code>${c}</code>`);
  });

  return text;
}

function markdownToHtml(md) {
  if (!md.trim()) return "";

  // Extract fenced code blocks to protect their content
  const blocks = [];
  md = md.replace(/```(\w*)\n([\s\S]*?)\n?```/g, (_, lang, code) => {
    blocks.push({ lang: lang || "", code: code.trimEnd() });
    return `\x00B${blocks.length - 1}\x00`;
  });

  const lines = md.split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block placeholder
    const bm = trimmed.match(/^\x00B(\d+)\x00$/);
    if (bm) {
      const { lang, code } = blocks[parseInt(bm[1])];
      out.push(
        `<pre><code class="lang-${lang}">${escapeHtml(code)}</code></pre>`,
      );
      i++;
      continue;
    }

    // Headings
    if (/^### /.test(line)) {
      out.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (/^## /.test(line)) {
      out.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (/^# /.test(line)) {
      out.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // Unordered list — consume consecutive lines
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) {
        items.push(`<li>${inlineMarkdown(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(
          `<li>${inlineMarkdown(lines[i].replace(/^\d+\. /, ""))}</li>`,
        );
        i++;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // Paragraph
    out.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    i++;
  }

  return out.join("\n");
}

// ─── View switching ───────────────────────────────────────────────────────────
function showPreview() {
  const md = document.getElementById("output-content").value;
  document.getElementById("preview-pane").innerHTML = markdownToHtml(md);
  document.getElementById("preview-pane").classList.add("active");
  document.getElementById("output-content").classList.remove("active");
  document.getElementById("btn-preview").classList.add("active");
  document.getElementById("btn-code").classList.remove("active");
}

function showCode() {
  document.getElementById("preview-pane").classList.remove("active");
  document.getElementById("output-content").classList.add("active");
  document.getElementById("btn-preview").classList.remove("active");
  document.getElementById("btn-code").classList.add("active");
}

function backToForm() {
  document.getElementById("form-card").style.display = "block";
  document.getElementById("output-section").classList.remove("active");
  document.querySelector(".playground").classList.remove("preview-mode");
}
function copyToClipboard() {
  const text = document.getElementById("output-content").value;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  });
}

function downloadMarkdown() {
  const markdown = document.getElementById("output-content").value;
  if (!markdown.trim()) {
    alert("Generate markdown first before downloading.");
    return;
  }

  const problemTitle = document.getElementById("problem-title").value.trim();
  const difficulty = document.getElementById("difficulty").value.toLowerCase();
  const safeTitle = problemTitle
    ? problemTitle
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w\-]/g, "")
    : "untitled";

  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${difficulty}_${safeTitle}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Clear all ────────────────────────────────────────────────────────────────
function clearAll() {
  if (!confirm("Clear all fields and start fresh?")) return;

  ["problem-title", "source", "problem-url"].forEach((id) => {
    const el = document.getElementById(id);
    el.value = "";
    el.classList.remove("field-error");
  });
  document.getElementById("difficulty").value = "Easy";

  [
    "problem-statement",
    "understanding",
    "approach",
    "complexity",
    "edge-cases",
    "notes",
  ].forEach((id) => {
    document.getElementById(id).innerHTML = "";
  });

  document.querySelectorAll(".code-editor").forEach((ta) => {
    ta.value = "";
  });

  [...selectedLanguages].forEach((lang) => {
    const cb = document.getElementById(`lang-${lang}`);
    if (cb) cb.checked = false;
    toggleLanguage(lang);
  });

  document.getElementById("output-content").value = "";
  document.getElementById("preview-pane").innerHTML = "";
  document.getElementById("output-section").classList.remove("active");
  document.getElementById("form-card").style.display = "block";
  document.querySelector(".playground").classList.remove("preview-mode");

  localStorage.removeItem(STORAGE_KEY);
}

// ─── LocalStorage persistence ─────────────────────────────────────────────────
let saveTimer = null;

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveToStorage, 500);
}

function saveToStorage() {
  const data = {
    title: document.getElementById("problem-title").value,
    source: document.getElementById("source").value,
    url: document.getElementById("problem-url").value,
    difficulty: document.getElementById("difficulty").value,
    problemStatement: document.getElementById("problem-statement").innerHTML,
    understanding: document.getElementById("understanding").innerHTML,
    approach: document.getElementById("approach").innerHTML,
    complexity: document.getElementById("complexity").innerHTML,
    edgeCases: document.getElementById("edge-cases").innerHTML,
    notes: document.getElementById("notes").innerHTML,
    languages: [...selectedLanguages],
    code: {},
  };
  for (const lang of selectedLanguages) {
    const editor = document.getElementById(`code-${lang}-editor`);
    if (editor) data.code[lang] = editor.value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    if (data.title) document.getElementById("problem-title").value = data.title;
    if (data.source) document.getElementById("source").value = data.source;
    if (data.url) document.getElementById("problem-url").value = data.url;
    if (data.difficulty)
      document.getElementById("difficulty").value = data.difficulty;

    const fields = [
      ["problem-statement", "problemStatement"],
      ["understanding", "understanding"],
      ["approach", "approach"],
      ["complexity", "complexity"],
      ["edge-cases", "edgeCases"],
      ["notes", "notes"],
    ];
    fields.forEach(([id, key]) => {
      if (data[key]) document.getElementById(id).innerHTML = data[key];
    });

    if (data.languages && data.languages.length > 0) {
      for (const lang of data.languages) {
        const cb = document.getElementById(`lang-${lang}`);
        if (cb) {
          cb.checked = true;
          toggleLanguage(lang);
        }
      }
      if (data.code) {
        for (const [lang, code] of Object.entries(data.code)) {
          const editor = document.getElementById(`code-${lang}-editor`);
          if (editor) editor.value = code;
        }
      }
    }
  } catch {
    // ignore corrupted storage
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("code-sections").style.display = "none";

  // Prevent toolbar buttons from stealing focus so the editor selection is
  // still valid when the click handler runs.
  document.querySelectorAll(".toolbar button").forEach((btn) => {
    btn.addEventListener("mousedown", (e) => e.preventDefault());
  });

  ["problem-title", "source", "problem-url"].forEach((id) => {
    document.getElementById(id).addEventListener("input", scheduleSave);
  });
  document
    .getElementById("difficulty")
    .addEventListener("change", scheduleSave);
  document.addEventListener("selectionchange", updateToolbarState);

  document.querySelectorAll(".rich-text-editor").forEach((editor) => {
    editor.addEventListener("input", scheduleSave);
    editor.addEventListener("focus", () => {
      if (editor.textContent.trim() === "") editor.textContent = "";
    });
    editor.addEventListener("blur", () => {
      if (editor.textContent.trim() === "") editor.innerHTML = "";
    });
  });

  loadFromStorage();
});
