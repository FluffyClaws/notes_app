import {
  activeNotes,
  archivedNotes,
  addNote,
  editNote,
  removeNote,
  archiveNote,
  unarchiveNote,
} from "./data.js";
import { renderNotesTable, renderSummaryTable } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Function to set up event listeners after the DOM is loaded
  function setUpEventListeners() {
    const summaryButton = document.querySelector("#summary-button");

    // Event listener for clicking the "Summary" button
    summaryButton.addEventListener("click", () => {
      const summaryContainer = document.querySelector("#summary-container");
      const summaryTable = document.querySelector("#summary-table");

      if (summaryContainer.style.display === "none") {
        renderSummaryTable(activeNotes, archivedNotes);
        summaryContainer.style.display = "block";
        summaryButton.textContent = "Hide Summary";
      } else {
        summaryContainer.style.display = "none";
        summaryButton.textContent = "Show Summary";
      }
    });

    // Event listener for adding a new note
    document
      .querySelector("#add-note-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const content = event.target.elements.content.value.trim();
        const category = event.target.elements.category.value.trim();

        if (content && category) {
          const newNote = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            content,
            category,
          };
          addNote(newNote);
          renderNotesTable(activeNotes);
          renderSummaryTable(activeNotes, archivedNotes);
          event.target.reset();
        }
      });

    // Event listener for editing a note
    document
      .querySelector("#notes-table")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
          const id = Number(event.target.dataset.id);
          const updatedContent = prompt("Enter updated content:");
          if (updatedContent !== null) {
            const updatedNote = {
              ...activeNotes.find((note) => note.id === id),
              content: updatedContent.trim(),
            };
            editNote(id, updatedNote);
            renderNotesTable(activeNotes);
            renderSummaryTable(activeNotes, archivedNotes);
          }
        }
      });

    // Event listener for archiving/unarchiving a note
    document
      .querySelector("#notes-table")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("archive-btn")) {
          const id = Number(event.target.dataset.id);
          const noteToArchive = activeNotes.find((note) => note.id === id);
          archiveNote(id, !noteToArchive.archived); // Toggle archived status
          renderNotesTable(activeNotes);
          renderSummaryTable(activeNotes, archivedNotes);
        } else if (event.target.classList.contains("unarchive-btn")) {
          const id = Number(event.target.dataset.id);
          const noteToUnarchive = archivedNotes.find((note) => note.id === id);
          unarchiveNote(id, !noteToUnarchive.archived); // Toggle archived status
          renderNotesTable(archivedNotes, true); // Render all unarchived notes
          renderSummaryTable(activeNotes, archivedNotes);
        }
      });
    // Event listener for removing a note
    document
      .querySelector("#notes-table")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
          const id = Number(event.target.dataset.id);
          removeNote(id);
          renderNotesTable(activeNotes);
          renderSummaryTable(activeNotes, archivedNotes);
        }
      });

    // Event listener for viewing archived notes
    document
      .querySelector("#view-archived-btn")
      .addEventListener("click", () => {
        renderNotesTable(archivedNotes); // Render all archived notes
        renderSummaryTable(activeNotes, archivedNotes);

        // Update the header to "Archived Notes"
        document.querySelector("#notes-table-header").textContent =
          "Archived Notes";
      });

    // Event listener for viewing active notes
    document.querySelector("#view-active-btn").addEventListener("click", () => {
      renderNotesTable(activeNotes, false);
      renderSummaryTable(activeNotes, archivedNotes);

      // Update the header to "Active Notes"
      document.querySelector("#notes-table-header").textContent =
        "Active Notes";
    });

    // Event listener for unarchiving a note
    const archivedNotesTable = document.querySelector("#archived-notes-table");
    if (archivedNotesTable) {
      archivedNotesTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("unarchive-btn")) {
          const id = Number(event.target.dataset.id);
          unarchiveNote(id);
          renderNotesTable(archivedNotes);
          renderSummaryTable(activeNotes, archivedNotes);
        }
      });
    }
  }

  // Call the function to set up the event listeners after the DOM is loaded
  setUpEventListeners();
});
