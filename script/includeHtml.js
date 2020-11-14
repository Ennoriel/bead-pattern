async function importIncludeElements() {
  let includeElements = document.getElementsByTagName('include');
  for(let i = 0; i < includeElements.length; i++) {
      if(!includeElements[i].innerHTML) {
          await fetch('includes/' + includeElements[i].getAttribute('src'))
              .then(response => response.text())
              .then(responseText => includeElements[i].innerHTML = '<div>' + responseText + '</div>')
      }
  }
}