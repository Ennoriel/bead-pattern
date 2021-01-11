
/**
 * Exports current work: the trame, patterns and color
 */
function exportWork() {
  let exportString = this.exportColors();
  exportString += ';';
  exportString += this.exportBracelet();
  exportString += ';';
  exportString += this.exportPatterns();
  
  let fileName = document.getElementById('import-input').value || `export-${Math.floor(Math.random() * 65536).toString(16)}`
  if (!fileName.endsWith('.txt')) fileName += '.txt'

  downloadFile(exportString, fileName)
}

/**
 * Dynamiccaly generates and download a file
 * @param {String} fileContent file content
 * @param {String} fileName filename
 */
function downloadFile(fileContent, fileName) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Exports the color
 */
function exportColors() {
  return Array.from(colors.values()).map(c => c.inputValue).join('-');
}

/**
 * Exports the bracelet
 */
function exportBracelet() {
  return factory.bracelet.export();
}

/**
 * Export all the patterns
 */
function exportPatterns() {
  return factory.patterns.map(pattern => pattern.export()).join('|');
}

/**
 * Fire the click on the file input
 */
function openImport(event) {
  document.getElementById('file-load-input').click()
  event.preventDefault()
}

/**
 * Launches import bracelet from text input
 */
async function importWork(event) {
  const file = event.target.files.item(0)
  const exportString = await file.text();
  
  let exportTab = exportString.split(';');
  this.importBracelet(exportTab[0], exportTab[1]);
  this.importPatterns(exportTab[2]);
}

/**
 * Imports bracelet
 * @param {string} exportedColors string representation of the colors
 * @param {string} exportBracelet string representation of the bracelet
 */
function importBracelet(exportedColors, exportBracelet) {
  let exportBraceletTab = exportBracelet.split('-');

  let importedTissage = parseInt(exportBraceletTab[0]);
  switch (importedTissage) {
    case TISSAGE.DROIT:
      document.getElementById('droit').checked = true;
      break;
    case TISSAGE.PEYOTE:
      document.getElementById('peyote').checked = true;
      break;
    case TISSAGE.PEYOTE_V:
      document.getElementById('peyote-v').checked = true;
      break;
  }

  let importedDimension = new Dimension(exportBraceletTab[1], exportBraceletTab[2]);
  document.getElementById('input-longueur').value = importedDimension.length;
  document.getElementById('input-largeur').value = importedDimension.width;
  factory.bracelet = new Bracelet();
  factory.bracelet.generateTrame(
    importedDimension,
    exportedColors.split('-'),
    exportBraceletTab[3]
  );
}

/**
 * Imports all patterns
 * @param {string} importedPatterns string representation of the patterns
 */
function importPatterns(importedPatterns) {
  factory.deleteAllPatterns();
  if (!!importedPatterns) {
    importedPatterns.split('|').forEach(importedPattern => {
      let importedPatternTab = importedPattern.split('-');
      let importedDimension = new Dimension(importedPatternTab[0], importedPatternTab[1]);
      factory.generatePattern(importedDimension, importedPatternTab[2]);
    });
  }
}
