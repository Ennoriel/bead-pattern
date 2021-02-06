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
      <div id="preview-${index}" class="preview"></div>
    </div>`
  );

  document.getElementById('content').innerHTML += html.join('');

  fileNames.split(';').forEach((_, i) => display(i))
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

  svgPreview = new SvgPreview(index);
  
  savedWork = getSavedWord(index);
  if (savedWork) {
    color = savedWork.split(';')[0]
    tissage = savedWork.split(';')[1].split('-')[0]
    dimension = new Dimension(...savedWork.split(';')[1].split('-').slice(1, 3))
    bracelet = savedWork.split(';')[1].split('-')[3]
    svgPreview.renderPreview(color, tissage, dimension, bracelet)
  }
}

function getSavedWord(index) {
  fileNames = localStorage.getItem('__save__');

  if (fileNames) fileNames = fileNames.split(';');
  
  if (fileNames.length >= index) return localStorage.getItem(fileNames[index])
}