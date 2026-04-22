import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.mjs";

const ARCHIVE_RE = /\/news\/season-(?!2026)\d+|\/practices-20\d{2}|\/armllocal\/|\/qr\//;

let fuse = null;

async function loadIndex() {
  if (fuse) return;
  try {
    const res = await fetch("/search_index.en.json");
    const data = await res.json();
    fuse = new Fuse(data, {
      keys: [
        { name: "title", weight: 3 },
        { name: "description", weight: 2 },
        { name: "body", weight: 1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      includeMatches: true,
    });
  } catch (e) {
    console.error("Failed to load search index:", e);
  }
}

function getSnippets(result, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const snippets = [];
  const MAX = 3;
  for (const field of ["body", "description"]) {
    const text = result.item[field];
    if (!text) continue;
    const lower = text.toLowerCase();
    let searchFrom = 0;
    while (snippets.length < MAX) {
      let bestIdx = -1, bestTerm = "";
      for (const term of terms) {
        const idx = lower.indexOf(term, searchFrom);
        if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
          bestIdx = idx;
          bestTerm = term;
        }
      }
      if (bestIdx === -1) break;
      const start = Math.max(0, bestIdx - 40);
      const end = Math.min(text.length, bestIdx + bestTerm.length + 80);
      const before = (start > 0 ? "..." : "") + escapeHtml(text.slice(start, bestIdx));
      const mark = `<mark class="bg-yellow-200 dark:bg-yellow-800 text-inherit rounded px-0.5">${escapeHtml(text.slice(bestIdx, bestIdx + bestTerm.length))}</mark>`;
      const after = escapeHtml(text.slice(bestIdx + bestTerm.length, end)) + (end < text.length ? "..." : "");
      snippets.push(before + mark + after);
      searchFrom = bestIdx + bestTerm.length + 80;
    }
    if (snippets.length) break;
  }
  return snippets;
}

const modal = document.getElementById("search-modal");
const input = document.getElementById("search-input");
const resultsEl = document.getElementById("search-results");
const emptyEl = document.getElementById("search-empty");
const archiveCheckbox = document.getElementById("search-include-archive");

function openSearch() {
  modal.classList.remove("hidden");
  input.focus();
  loadIndex();
}

function closeSearch() {
  modal.classList.add("hidden");
  input.value = "";
  resultsEl.innerHTML = "";
  resultsEl.appendChild(emptyEl);
  emptyEl.textContent = "Type to search...";
}

function renderResults(query) {
  if (!fuse || !query.trim()) {
    resultsEl.innerHTML = "";
    resultsEl.appendChild(emptyEl);
    emptyEl.textContent = query.trim() ? "Loading..." : "Type to search...";
    return;
  }
  const all = fuse.search(query.trim());
  const results = (archiveCheckbox.checked ? all : all.filter((r) => !ARCHIVE_RE.test(r.item.url))).slice(0, 10);
  if (results.length === 0) {
    resultsEl.innerHTML = "";
    resultsEl.appendChild(emptyEl);
    emptyEl.textContent = "No results found.";
    return;
  }
  resultsEl.innerHTML = results
    .map((r) => {
      const snippets = getSnippets(r, query);
      return `
      <a href="${r.item.url}" class="flex flex-col gap-1 px-4 py-3 hover:bg-background-secondary dark:hover:bg-background-secondary-dark transition-colors text-left">
        <span class="font-medium text-content-primary dark:text-content-primary-dark">${escapeHtml(r.item.title)}</span>
        ${snippets.map((s) => `<span class="text-sm text-content-tertiary dark:text-content-tertiary-dark line-clamp-1">${s}</span>`).join("")}
      </a>`;
    })
    .join("");
}

function escapeHtml(str) {
  const el = document.createElement("span");
  el.textContent = str;
  return el.innerHTML;
}

document.getElementById("search-open").addEventListener("click", openSearch);
document.getElementById("search-backdrop").addEventListener("click", closeSearch);
archiveCheckbox.addEventListener("change", () => renderResults(input.value));

input.addEventListener("input", () => renderResults(input.value));

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    openSearch();
  }
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeSearch();
  }
});
