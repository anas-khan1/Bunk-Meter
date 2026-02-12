const subjectList = document.getElementById("subject-list");
const addButton = document.getElementById("add-subject");
const pdfButton = document.getElementById("download-pdf");

const overallSubjects = document.getElementById("overall-subjects");
const overallHappened = document.getElementById("overall-happened");
const overallAttended = document.getElementById("overall-attended");
const overallPercent = document.getElementById("overall-percent");

// Theme toggle
const themeToggle = document.getElementById("mode-toggle");
const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = themeToggle?.querySelector(".toggle-icon");
  if (icon) icon.innerHTML = theme === "light" ? "&#9728;" : "&#9790;";
  localStorage.setItem("bm-theme", theme);
};

const savedTheme = localStorage.getItem("bm-theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

let subjectCounter = 0;
let dragSrcEl = null;

const formatNumber = (value) => {
  if (!Number.isFinite(value)) return "0";
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < 1e-9) {
    return String(rounded);
  }
  return value.toFixed(2);
};

const formatPercent = (value) => {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(2)}%`;
};

const getNumber = (input) => {
  const value = parseFloat(input.value);
  if (Number.isNaN(value) || value < 0) return 0;
  return value;
};

const setOutput = (card, key, value) => {
  const element = card.querySelector(`[data-out="${key}"]`);
  if (element) {
    element.textContent = value;
  }
};

const updateSubject = (card) => {
  const happenedInput = card.querySelector("[data-field='happened']");
  const attendedInput = card.querySelector("[data-field='attended']");
  const totalInput = card.querySelector("[data-field='total']");
  const desiredInput = card.querySelector("[data-field='desired']");

  const happened = getNumber(happenedInput);
  const attended = Math.min(getNumber(attendedInput), happened);
  const total = getNumber(totalInput);
  const desired = getNumber(desiredInput);

  const missed = Math.max(0, happened - attended);
  const remaining = Math.max(0, total - happened);
  const requiredTotal = (desired / 100) * total;
  const minAttendFromRemaining = Math.max(0, requiredTotal - attended);
  const bunkable = Math.max(0, remaining - minAttendFromRemaining);
  const shortfall = Math.max(0, minAttendFromRemaining - remaining);
  const currentPercent = happened > 0 ? (attended / happened) * 100 : 0;

  const notes = [];
  if (attended > happened) {
    notes.push("Attended classes cannot exceed classes happened.");
  }
  if (happened > total) {
    notes.push("Classes happened cannot exceed total semester classes.");
  }
  if (shortfall > 0) {
    notes.push(`Even with full attendance, you will be short by ${formatNumber(shortfall)} classes.`);
  }

  setOutput(card, "happened", formatNumber(happened));
  setOutput(card, "attended", formatNumber(attended));
  setOutput(card, "missed", formatNumber(missed));
  setOutput(card, "remaining", formatNumber(remaining));
  const maxPossibleAttended = attended + remaining;
  const maxPossiblePercent = total > 0 ? (maxPossibleAttended / total) * 100 : 0;

  setOutput(card, "current", formatPercent(currentPercent));
  setOutput(card, "maxPossible", formatPercent(maxPossiblePercent));
  setOutput(card, "bunkable", formatNumber(bunkable));

  const noteEl = card.querySelector("[data-out='note']");
  if (noteEl) {
    noteEl.textContent = notes.join(" ");
    noteEl.style.display = notes.length > 0 ? "" : "none";
  }

  updateOverall();
};

const updateOverall = () => {
  const cards = Array.from(subjectList.querySelectorAll(".subject-card"));
  let totalHappened = 0;
  let totalAttended = 0;

  cards.forEach((card) => {
    const happened = getNumber(card.querySelector("[data-field='happened']"));
    const attended = getNumber(card.querySelector("[data-field='attended']"));
    totalHappened += happened;
    totalAttended += Math.min(attended, happened);
  });

  overallSubjects.textContent = String(cards.length);
  overallHappened.textContent = formatNumber(totalHappened);
  overallAttended.textContent = formatNumber(totalAttended);
  overallPercent.textContent = formatPercent(
    totalHappened > 0 ? (totalAttended / totalHappened) * 100 : 0
  );
};

const createSubjectCard = () => {
  subjectCounter += 1;
  const card = document.createElement("article");
  card.className = "subject-card";

  card.innerHTML = `
    <div class="card-header">
      <div class="card-header-left">
        <button class="drag-handle" type="button" title="Drag to reorder">&#9776;</button>
        <div class="subject-title">
          <span>Subject</span>
          <input class="subject-name" type="text" placeholder="e.g. Mathematics" />
        </div>
      </div>
      <div class="card-header-right">
        <span class="collapse-preview"></span>
        <button class="remove-btn" type="button">Remove</button>
        <button class="close-btn" type="button" aria-label="Remove subject">&times;</button>
      </div>
    </div>
    <div class="card-body">
      <div class="input-grid">
        <label class="field">
          Classes happened so far
          <input type="number" min="0" step="1" value="0" data-field="happened" />
        </label>
        <label class="field">
          Classes attended
          <input type="number" min="0" step="1" value="0" data-field="attended" />
        </label>
        <label class="field">
          Total classes this semester
          <input type="number" min="0" step="1" value="0" data-field="total" />
        </label>
        <label class="field">
          Desired attendance (%)
          <input type="number" min="0" max="100" step="0.01" value="75" data-field="desired" />
        </label>
      </div>
      <div class="output">
        <div class="output-item">
          <span>Classes happened</span>
          <strong data-out="happened">0</strong>
        </div>
        <div class="output-item">
          <span>Classes attended</span>
          <strong data-out="attended">0</strong>
        </div>
        <div class="output-item">
          <span>Classes missed</span>
          <strong data-out="missed">0</strong>
        </div>
        <div class="output-item">
          <span>Classes left</span>
          <strong data-out="remaining">0</strong>
        </div>
        <div class="output-item">
          <span>Current attendance %</span>
          <strong data-out="current">0%</strong>
        </div>
        <div class="output-item">
          <span>Max possible attendance %</span>
          <strong data-out="maxPossible">0%</strong>
        </div>
        <div class="output-item">
          <span>Can bunk from remaining</span>
          <strong data-out="bunkable">0</strong>
        </div>
      </div>
      <div class="note" data-out="note"></div>
    </div>
  `;

  const removeButton = card.querySelector(".remove-btn");
  const closeButton = card.querySelector(".close-btn");
  const dragHandle = card.querySelector(".drag-handle");
  const collapsePreview = card.querySelector(".collapse-preview");

  const removeCard = () => {
    card.style.opacity = "0";
    card.style.transform = "translateY(8px)";
    setTimeout(() => {
      card.remove();
      updateOverall();
    }, 180);
  };
  removeButton.addEventListener("click", removeCard);
  closeButton.addEventListener("click", removeCard);

  // Collapse toggle on drag-handle tap
  const toggleCollapse = () => {
    const isCollapsed = card.classList.toggle("collapsed");
    if (isCollapsed) {
      const name = card.querySelector(".subject-name").value || "Unnamed";
      const currentEl = card.querySelector("[data-out='current']");
      collapsePreview.textContent = `${name} — ${currentEl.textContent}`;
    } else {
      collapsePreview.textContent = "";
    }
  };

  dragHandle.addEventListener("click", toggleCollapse);

  // Click anywhere on card to collapse (except inputs/buttons)
  card.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "button" || tag === "textarea" || e.target.closest("button")) return;
    if (isDragMode) return;
    toggleCollapse();
  });

  // Drag and drop from anywhere on the card (except inputs/buttons)
  let holdTimer = null;
  let isDragMode = false;

  const startHold = (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "button" || tag === "textarea") return;
    isDragMode = false;
    holdTimer = setTimeout(() => {
      isDragMode = true;
      card.setAttribute("draggable", "true");
    }, 300);
  };

  const endHold = () => {
    clearTimeout(holdTimer);
    if (isDragMode) {
      // drag will handle cleanup via dragend
    }
    isDragMode = false;
  };

  card.addEventListener("mousedown", startHold);
  card.addEventListener("mouseup", endHold);
  card.addEventListener("mouseleave", () => clearTimeout(holdTimer));

  card.addEventListener("touchstart", startHold, { passive: true });
  card.addEventListener("touchend", endHold);

  card.addEventListener("dragstart", (e) => {
    dragSrcEl = card;
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    card.removeAttribute("draggable");
    document.querySelectorAll(".subject-card.drag-over").forEach((c) => c.classList.remove("drag-over"));
  });
  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (card !== dragSrcEl) {
      card.classList.add("drag-over");
    }
  });
  card.addEventListener("dragleave", () => {
    card.classList.remove("drag-over");
  });
  card.addEventListener("drop", (e) => {
    e.preventDefault();
    card.classList.remove("drag-over");
    if (dragSrcEl && dragSrcEl !== card) {
      const allCards = Array.from(subjectList.querySelectorAll(".subject-card"));
      const srcIndex = allCards.indexOf(dragSrcEl);
      const destIndex = allCards.indexOf(card);
      if (srcIndex < destIndex) {
        subjectList.insertBefore(dragSrcEl, card.nextSibling);
      } else {
        subjectList.insertBefore(dragSrcEl, card);
      }
    }
    dragSrcEl = null;
  });

  const inputs = card.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => updateSubject(card));
  });

  updateSubject(card);
  return card;
};

addButton.addEventListener("click", () => {
  const card = createSubjectCard();
  subjectList.appendChild(card);
  updateOverall();
  card.scrollIntoView({ behavior: "smooth", block: "start" });
});

subjectList.appendChild(createSubjectCard());
updateOverall();

// PDF Report Generation
pdfButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  const checkPage = (needed) => {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  };

  // Title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Bunk Meter — Attendance Report", pageWidth / 2, y, { align: "center" });
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0);
  y += 12;

  // Overall Summary
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(14, y, pageWidth - 28, 28, 3, 3, "F");
  y += 8;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Overall Summary", 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Subjects: ${overallSubjects.textContent}    |    Classes Happened: ${overallHappened.textContent}    |    Attended: ${overallAttended.textContent}    |    Overall: ${overallPercent.textContent}`, 20, y);
  y += 18;

  // Each Subject
  const cards = Array.from(subjectList.querySelectorAll(".subject-card"));
  cards.forEach((card, index) => {
    checkPage(55);

    const name = card.querySelector(".subject-name").value || `Subject ${index + 1}`;
    const happened = card.querySelector("[data-out='happened']").textContent;
    const attended = card.querySelector("[data-out='attended']").textContent;
    const missed = card.querySelector("[data-out='missed']").textContent;
    const remaining = card.querySelector("[data-out='remaining']").textContent;
    const current = card.querySelector("[data-out='current']").textContent;
    const maxPossible = card.querySelector("[data-out='maxPossible']").textContent;
    const bunkable = card.querySelector("[data-out='bunkable']").textContent;

    // Subject header
    doc.setFillColor(86, 156, 214);
    doc.roundedRect(14, y, pageWidth - 28, 9, 2, 2, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255);
    doc.text(`${index + 1}. ${name}`, 18, y + 6.5);
    doc.setTextColor(0);
    y += 14;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const col1 = 20;
    const col2 = 110;

    doc.text(`Classes Happened: ${happened}`, col1, y);
    doc.text(`Classes Attended: ${attended}`, col2, y);
    y += 6;
    doc.text(`Classes Missed: ${missed}`, col1, y);
    doc.text(`Classes Left: ${remaining}`, col2, y);
    y += 6;
    doc.text(`Current Attendance: ${current}`, col1, y);
    doc.text(`Max Possible: ${maxPossible}`, col2, y);
    y += 6;
    doc.text(`Can Bunk: ${bunkable}`, col1, y);
    y += 12;
  });

  // Footer
  checkPage(15);
  doc.setDrawColor(200);
  doc.line(14, y, pageWidth - 14, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(150);
  const prefix = "Generated by Bunk Meter — ";
  const linkDisplay = "bunkmeter.netlify.app";
  const fullText = prefix + linkDisplay;
  doc.text(fullText, pageWidth / 2, y, { align: "center" });
  const fullWidth = doc.getTextWidth(fullText);
  const linkWidth = doc.getTextWidth(linkDisplay);
  const linkX = (pageWidth / 2) - (fullWidth / 2) + doc.getTextWidth(prefix);
  doc.setTextColor(0, 102, 204);
  doc.textWithLink(linkDisplay, linkX, y, { url: "https://bunkmeter.netlify.app/" });

  doc.save("Bunk_Meter_Report.pdf");
});