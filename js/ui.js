import { getNotesCountByCategory } from "./data.js";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Function to render notes table
export function renderNotesTable(notes) {
  const tableBody = document.querySelector("#notes-table tbody");
  tableBody.innerHTML = "";

  if (notes.length === 0) {
    // If the notes array is empty, display the "No notes yet" message
    const noNotesRow = document.createElement("tr");
    noNotesRow.innerHTML = `<td colspan="5">There are no notes yet</td>`;
    tableBody.appendChild(noNotesRow);
  } else {
    // If there are notes, render the table rows as before
    notes.forEach((note) => {
      const row = document.createElement("tr");
      const createdAtDate = formatDate(note.createdAt);
      const createdAtTime = formatTime(note.createdAt);

      row.innerHTML = `
      <td>${createdAtDate} ${createdAtTime}</td>
      <td>${note.content}</td>
          <td>${note.category}</td>
          <td>${getDatesFromNoteContent(note.content)}</td>
          <td>
            <button class="edit-btn" data-id="${note.id}">Edit</button>
            ${
              note.archived
                ? `<button class="unarchive-btn" data-id="${note.id}">Restore</button>`
                : `<button class="archive-btn" data-id="${note.id}">Archive</button>`
            }
            <button class="remove-btn" data-id="${note.id}">Remove</button>
          </td>
        `;
      tableBody.appendChild(row);
    });
  }
}

// Function to render summary table
export function renderSummaryTable(activeNotes, archivedNotes) {
  const summaryTable = document.querySelector("#summary-table");

  if (activeNotes.length === 0) {
    // If there are no active notes, render the summary table with archived notes only
    if (archivedNotes.length === 0) {
      // If there are no archived notes, display "There are no notes yet" message
      summaryTable.innerHTML = `
      <td colspan="3"><h2>Summary</h2></td>
      <tr><td colspan="3">There are no notes yet</td></tr>`;
    } else {
      summaryTable.innerHTML = `
          <tr>
            <th>Category</th>
            <th>Active Notes</th>
            <th>Archived Notes</th>
          </tr>
          ${Object.entries(getNotesCountByCategory(archivedNotes))
            .map(
              ([category, count]) =>
                `<tr><td>${category}</td><td>0</td><td>${count}</td></tr>`
            )
            .join("")}
        `;
    }
  } else {
    // Render the summary table with both active and archived notes
    const allNotes = [...activeNotes, ...archivedNotes];
    const activeNotesCounts = getNotesCountByCategory(activeNotes);
    const archivedNotesCounts = getNotesCountByCategory(archivedNotes);

    summaryTable.innerHTML = `
    <td colspan="3"><h2>Summary</h2></td>
          <tr>
            <th>Category</th>
            <th>Active Notes</th>
            <th>Archived Notes</th>
          </tr>

          ${Object.entries(activeNotesCounts)
            .map(
              ([category, count]) =>
                `<tr><td>${category}</td><td>${count}</td><td>${
                  archivedNotesCounts[category] || 0
                }</td></tr>`
            )
            .join("")}
        `;
  }
}

// Function to extract dates from note content
function getDatesFromNoteContent(content) {
  const datePatterns = [
    /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g, // Matches dates in format 05/07/1997
    /\b\d{1,2}\.\d{1,2}\.\d{4}\b/g, // Matches dates in format 05.07.1997
  ];

  const allMatches = [];

  for (const pattern of datePatterns) {
    const matches = content.match(pattern);
    if (matches) {
      const formattedDates = matches.map((dateStr) => {
        const parts = dateStr.split(/[./]/);
        const day = parts[0].padStart(2, "0");
        const month = parts[1].padStart(2, "0");
        const year = parts[2];
        return `${day}/${month}/${year}`;
      });
      allMatches.push(...formattedDates);
    }
  }

  return allMatches.join(", ");
}
