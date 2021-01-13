/**
 * Loads language file
 * @param {string} lang language code [available: fr en] 
 */
function loadLanguage(lang) {
	language = lang
	document.getElementById('lang-svg').src = `public/lang/${lang}.svg`
	fetch('./public/lang/' + lang + '.json')
		.then(response => response.json())
		.then(json => {
			translations = json.store
			for (let key in json) {
				if (key.includes('label')) document.getElementById(key).innerHTML = json[key];
				if (key.includes('placeholder'))
					document
						.getElementById(key.substring(12, key.length))
						.setAttribute('placeholder', json[key]);
			}
		});
		if(colorPicker && colorPicker.beadPanel) {
			colorPicker.beadPanel.initFilters()
		}
}
