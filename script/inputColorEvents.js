function resetColor() {
	for (i = 0; i < colors.size; i++) {
		document.getElementById('container-couleur-' + lettres[i]).remove();
	}
	initColors();
}

function selectPinceau(key) {
	pinceau = key;
}
