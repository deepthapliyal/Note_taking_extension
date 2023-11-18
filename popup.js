document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const notesList = document.getElementById('notesList');
    const clearButton = document.getElementById('clearButton');
  
    // Load existing notes on startup
    chrome.storage.sync.get('notes', function (data) {
      const notes = data.notes || [];
      displayNotes(notes);
    });
  
    // Save a new note
    saveButton.addEventListener('click', function () {
      const newNote = noteInput.value.trim();
  
      if (newNote !== '') {
        // Retrieve existing notes
        chrome.storage.sync.get('notes', function (data) {
          const notes = data.notes || [];
  
          // Add the new note
          notes.push(newNote);
  
          // Save updated notes
          chrome.storage.sync.set({ 'notes': notes }, function () {
            displayNotes(notes);
            noteInput.value = '';
          });
        });
      }
    });

    clearButton.addEventListener('click', function () {
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
            // do something more
        });
        chrome.storage.sync.clear();
        const notes = [];
        displayNotes(notes);

    })
  
    // Display notes in the popup
    function displayNotes(notes) {
      notesList.innerHTML = '';
  
      if (notes.length === 0) {
        notesList.innerHTML = '<li>No notes yet.</li>';
      } else {
        for (const note of notes) {
          const noteItem = document.createElement('div');
          noteItem.textContent = note;
          notesList.appendChild(noteItem);
        }
      }
    }
  });
  