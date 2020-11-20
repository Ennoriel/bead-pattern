function loadLanguage(lang) {
	fetch('./public/lang/' + lang + '.json')
		.then(response => response.json())
		.then(json => {
			for (let key in json) {
				if (key.includes('label')) document.getElementById(key).innerHTML = json[key];
				if (key.includes('placeholder'))
					document
						.getElementById(key.substring(12, key.length))
						.setAttribute('placeholder', json[key]);
			}
		});
}
