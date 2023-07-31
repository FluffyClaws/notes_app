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
    noNotesRow.innerHTML = `
      <td colspan="5" class="table-secondary">
        <h2 class="col-content">There are no notes yet</h2>
      </td>`;
    tableBody.appendChild(noNotesRow);
  } else {
    // If there are notes, render the table rows as before
    notes.forEach((note) => {
      const row = document.createElement("tr");
      const createdAtDate = formatDate(note.createdAt);
      const createdAtTime = formatTime(note.createdAt);

      row.innerHTML = `
        <td class="col-content table-secondary">${createdAtDate} ${createdAtTime}</td>
        <td class="table-secondary">${note.content}</td>
        <td class="col-content table-secondary">${note.category}</td>
        <td class="col-content table-secondary">${getDatesFromNoteContent(
          note.content
        )}</td>
        <td class="col-content table-secondary">
          <button class="edit-btn btn btn-primary" data-id="${
            note.id
          }">Edit</button>
          ${
            note.archived
              ? `<button class="unarchive-btn btn btn-primary" data-id="${note.id}">Restore</button>`
              : `<button class="archive-btn btn btn-primary" data-id="${note.id}">Archive</button>`
          }
          <button class="remove-btn btn btn-primary" data-id="${
            note.id
          }">Remove</button>
        </td>`;
      tableBody.appendChild(row);
    });
  }
}

// Function to render summary table
export function renderSummaryTable(activeNotes, archivedNotes) {
  const summaryTable = document.querySelector("#summary-table");

  const allNotes = [...activeNotes, ...archivedNotes];
  const allNotesCounts = getNotesCountByCategory(allNotes);

  if (allNotes.length === 0) {
    // If there are no notes, display "There are no notes yet" message
    summaryTable.innerHTML = `
      <tr>
        <td colspan="3" class="table-secondary">
          <h2 class="col-content">There are no notes yet</h2>
        </td>
      </tr>`;
  } else {
    // Render the summary table with all categories and their note counts
    summaryTable.innerHTML = `
      <tr class="table-primary">
        <th>Category</th>
        <th>Active Notes</th>
        <th>Archived Notes</th>
      </tr>

      ${Object.entries(allNotesCounts)
        .map(
          ([category, count]) => `
            <tr class="table-secondary">
              <td>${category}</td>
              <td>${
                activeNotes.filter((note) => note.category === category).length
              }</td>
              <td>${
                archivedNotes.filter((note) => note.category === category)
                  .length
              }</td>
            </tr>`
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
