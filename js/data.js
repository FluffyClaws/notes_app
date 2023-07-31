// Initial notes data
const initialNotes = [
  {
    id: 1,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Random Thought",
  },
  {
    id: 2,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
  },
  {
    id: 3,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Random Thought",
  },
  {
    id: 4,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Idea",
  },
  {
    id: 5,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Random Thought",
  },
  {
    id: 6,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
  },
  {
    id: 7,
    createdAt: "2023-07-30T10:00:00",
    content:
      "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Idea",
  },
];

// Current notes and archived notes arrays
export let activeNotes = [...initialNotes];
export let archivedNotes = [];

// Function to add a new note
export function addNote(note) {
  activeNotes.push(note);
}

// Function to edit a note
export function editNote(id, updatedNote) {
  const index = activeNotes.findIndex((note) => note.id === id);
  if (index !== -1) {
    activeNotes[index] = updatedNote;
  }
}

// Function to remove a note
export function removeNote(id) {
  activeNotes = activeNotes.filter((note) => note.id !== id);
}

// Function to archive a note
export function archiveNote(id, archived = true) {
  const noteIndex = activeNotes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    activeNotes[noteIndex].archived = archived;
    if (archived) {
      archivedNotes.push(activeNotes[noteIndex]);
      activeNotes.splice(noteIndex, 1);
    }
  }
}

// Function to unarchive a note
export function unarchiveNote(id, archived = false) {
  const noteIndex = archivedNotes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    archivedNotes[noteIndex].archived = archived;
    if (!archived) {
      activeNotes.push(archivedNotes[noteIndex]);
      archivedNotes.splice(noteIndex, 1);
    }
  }
}

// Function to get the count of notes by category
export function getNotesCountByCategory(notes) {
  const countByCategory = {};

  for (const note of notes) {
    const category = note.category;
    if (countByCategory[category]) {
      countByCategory[category]++;
    } else {
      countByCategory[category] = 1;
    }
  }

  return countByCategory;
}
