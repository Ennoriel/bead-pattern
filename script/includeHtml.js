async function importIncludeElements() {
	let includeElements = document.getElementsByTagName('include');
	for (let i = 0; i < includeElements.length; i++) {
		if (!includeElements[i].innerHTML) {
			await fetch('components/' + includeElements[i].getAttribute('src'))
				.then(response => response.text())
				.then(responseText => {
					var parser = new DOMParser();
					var doc = parser.parseFromString(responseText, 'text/html');

					includeElements[i].innerHTML = '<div>' + doc.body.innerHTML + '</div>';

					[...doc.head.children]
						.filter(e => ['SCRIPT', 'LINK'].includes(e.tagName))
						.forEach(s => {
							var script = document.createElement(s.nodeName);
							script.innerHTML = s.innerHTML;
							[...s.attributes].forEach(attribute =>
								script.setAttribute(attribute.nodeName, attribute.nodeValue)
							);
							document.head.appendChild(script);
						});
				});
		}
	}
} // https://stackoverflow.com/questions/44476100/how-to-make-an-xmlhttprequest-that-loads-an-html-file-into-the-div
