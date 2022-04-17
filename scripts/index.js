const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const addNoteBtn = document.querySelector('#add-note-btn');
const resultsDiv = document.querySelector('#results');

const createNote = e => {
  e.preventDefault();

  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', '[]');
  }

  const notes = JSON.parse(localStorage.getItem('notes'));

  const hasLength = notes.length > 0 ? true : false;

  const note = {
    id: hasLength ? notes[notes.length - 1].id + 1 : 1,
    title: titleInput.value,
    body: bodyInput.value
  };

  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));

  renderNotes();
};

const renderNotes = () => {
  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', '[]');
  }

  let output = ``;

  const storedNotes = JSON.parse(localStorage.getItem('notes'));

  if (storedNotes.length === 0) {
    resultsDiv.innerHTML = `
      <p>
        <small>No notes yet.</small>
      </p>
    `;
  } else {
    storedNotes.forEach(note => {
      output += `
        <div>
          <p>Title: ${note.title}</p>
          <p>Body: ${note.body}
        </div>
        <hr>
      `;
    });
  
    resultsDiv.innerHTML = output;
  }
};

renderNotes();

addNoteBtn.addEventListener('click', createNote);