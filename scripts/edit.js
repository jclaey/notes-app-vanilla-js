const title = document.querySelector('#title');
const body = document.querySelector('#body');
const saveBtn = document.querySelector('#save-btn');
const noteId = location.hash.substring(1);
const notes = JSON.parse(localStorage.getItem('notes'));
const note = notes.find(note => note.id === Number(noteId));

if (!note) {
  location.assign('../index.html');
} else {
  title.value = note.title;
  body.value = note.body;

  saveBtn.addEventListener('click', e => {
    e.preventDefault();

    note.title = title.value;
    note.body = body.value;

    localStorage.setItem('notes', JSON.stringify(notes));

    location.assign('../index.html');
  });
}