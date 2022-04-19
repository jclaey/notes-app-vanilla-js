const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const clearBtn = document.querySelector('#clear-btn');
const resultsDiv = document.querySelector('#results');

const filter = e => {
  e.preventDefault();

  const notes = JSON.parse(localStorage.getItem('notes'));

  let filteredList;

  if (titleInput.checked && bodyInput.checked) {
    filteredList = notes.filter(note => note.title.toLowerCase().includes(searchInput.value) || note.body.toLowerCase().includes(searchInput.value));
  } else if (titleInput.checked) {
    filteredList = notes.filter(note => note.title.toLowerCase().includes(searchInput.value));
  } else if (bodyInput.checked) {
    filteredList = notes.filter(note => note.body.toLowerCase().includes(searchInput.value));
  } else if (!titleInput.checked && !bodyInput.checked) {
    filteredList = -1;
  }

  renderNotes(filteredList);
};

const renderNotes = arr => {
  let output = ``;

  if (!localStorage.getItem('notes')) {
    output += `
      <div>
        <p>You have no notes.</p>
        <p>
          Create one <a href="home.html">here</a>
        </p>
      </div>
    `;
  } else {
    if (arr === -1) {
      output += '<p style="color: red;">Please choose to search by title, body, or both.</p>';
    } else if (arr.length > 0) {
      arr.forEach(el => {
        output += `
          <div>
            <div>
              <p>Title: ${el.title}</p>
              <p>Body: ${el.body}
            </div>
            <div>
              <button class="delete-btn" data-noteid=${el.id}>Delete</button>
            </div>
          </div>
          <hr>
        `;
      });
    } else {
      output += `
        <p id="no-results">No results for that search.</p>
      `;
    }
  }

  resultsDiv.innerHTML = output;

  document.querySelectorAll('.delete-btn').forEach(node => node.addEventListener('click', deleteNote));
};

const clearSearch = e => {
  e.preventDefault();
  titleInput.checked = false;
  bodyInput.checked = false;
  searchInput.value = '';
  resultsDiv.innerHTML = '';
};

const deleteNote = e => {
  e.preventDefault();
  const notes = JSON.parse(localStorage.getItem('notes'));
  localStorage.setItem('notes', JSON.stringify(notes.filter(note => note.id !== Number(e.target.getAttribute('data-noteid')))));
  renderNotes(JSON.parse(localStorage.getItem('notes')));
};

searchBtn.addEventListener('click', filter);
clearBtn.addEventListener('click', clearSearch);