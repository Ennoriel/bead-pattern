/**
 * Inits the menu
 */
function main() {
  fileNames = localStorage.getItem('__save__');

  if (!fileNames) return;

  html = fileNames.split(';').map((fileName, index) =>
    `<div id="card-${index}" class="card">
      <h1>${fileName}</h1>
      <img onClick="edit('${fileName}')" src="public/icons/edit.svg" name="edition" />
      <img onClick="display('${index}')" class="show-preview" src="public/icons/chevron-up.svg" />
      <div class="preview"></div>
    </div>`
  );

  document.getElementById('content').innerHTML += html.join('');
}

/**
 * Delete all saved bracelets
 */
function deleteAll() {
  if (confirm('Sûr ?')) {
    fileNames = localStorage.getItem('__save__');
    if (fileNames) {
      fileNames.split(';').forEach(fileName => localStorage.removeItem(fileName));
    }
    localStorage.removeItem('__save__');
    document.getElementById('content').innerHTML = '';
  }
}

/**
 * Edit a bracelet
 * @param {String} fileName filename stored in localstore
 */
function edit(fileName) {
  localStorage.setItem('__current_work__', fileName);
  window.location.href = './';
}

/**
 * Show bracelet preview
 * @param {Integer|String} index index of the preview to display
 */
function display(index) {
  preview = document.getElementById(`card-${index}`)

  if (hasClassname(preview, 'preview-displayed')) {
    removeClassname(preview, 'preview-displayed')
  } else {
    addClassname(preview, 'preview-displayed')
  }
}
