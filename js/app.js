import { renderNotesTable, renderSummaryTable } from "./ui.js";
import "./events.js";
import { activeNotes, archivedNotes } from "./data.js";

// Function to initialize the app
function initApp() {
  // Initial render
  renderNotesTable(activeNotes, false);
  renderSummaryTable(activeNotes, archivedNotes);
}

// Call the initialization function
initApp();
