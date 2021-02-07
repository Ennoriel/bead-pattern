var beadCollection

/**
 * Inits the menu
 */
function main() {

  Color.initBeadCollection().then(() => {
  
    fileNames = localStorage.getItem('__save__');

    if (!fileNames) return;

    html = fileNames.split(';').map((fileName, index) =>
      `<div id="card-${index}" class="card">
        <h1>${fileName}</h1>
        <img onClick="edit('${fileName}')" src="public/icons/edit.svg" name="edition" />
        <img onClick="display('${index}')" class="show-preview" src="public/icons/chevron-up.svg" />
        <img onClick="deleteSave('${index}')" class="show-preview" src="public/icons/x.svg" />
        <div id="preview-${index}" class="preview"></div>
      </div>`
    );

    document.getElementById('content').innerHTML += html.join('');

    fileNames.split(';').forEach((_, i) => display(i))

  })
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
  
  savedWork = getSavedWork(index);
  if (savedWork) {
    color = savedWork.split(';')[0]
    tissage = savedWork.split(';')[1].split('-')[0]
    dimension = new Dimension(...savedWork.split(';')[1].split('-').slice(1, 3))
    bracelet = savedWork.split(';')[1].split('-')[3]
    svgPreview.renderPreview(color, tissage, dimension, bracelet)
  }
}

/**
 * After confirmation, deletes the saved work
 * @param {Integer|String} index index of the preview to display
 */
function deleteSave(index) {
  confirm('Etes-vous sûr de vouloir regénérer la trame du bracelet ?') {
    fileName = getSavedName(index)
    if (fileName) {
      fileNames = localStorage.getItem('__save__');
      fileNames = fileNames.split(";").filter(fn => fn !== fileName).join(";")
      if (fileNames) localStorage.setItem('__save__', fileNames);
      localStorage.removeItem(fileName)
    }
    document.getElementById(`card-${index}`).remove()
  }
}

/**
 * Get saved work name
 * @param {Integer|String} index index of the preview to display
 */
function getSavedName(index) {
  fileNames = localStorage.getItem('__save__');
  if (fileNames) fileNames = fileNames.split(';');
  if (fileNames.length >= index) return fileNames[index]
}

/**
 * Get saved work exported string
 * @param {Integer|String} index index of the preview to display
 */
function getSavedWork(index) {
  fileName = getSavedName(index)
  if (fileName) return localStorage.getItem(fileName)
}