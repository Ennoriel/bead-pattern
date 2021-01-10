/**
 * Generate a delete bead
 */
function generateDeleteBead() {
	let deleteBead = generateActionBead();
	deleteBead.innerHTML = 'x';
	return deleteBead;
}

/**
 * Generate an insert bead
 */
function generateInsertBead() {
	let insertBead = generateActionBead();
	addClassname(insertBead, 'insert-bead');
	insertBead.innerHTML = '+';
	return insertBead;
}

/**
 * Generate an action bead, either a delete or an insert one
 */
function generateActionBead() {
	let actionBead = document.createElement('div');
	actionBead.setAttribute('class', 'bead action-bead');
	actionBead.setAttribute('oncontextmenu', 'return false;');
	return actionBead;
}

/**
 * Add bead coloring
 */
function addBeadStyle(bead, colorKey) {
	var color = colors.get(colorKey);
	if (color) {
		bead.setAttribute('style', color.computeBeadStyle())
	}
}

/**
 * Computes main bracelet length
 */
function computeLengthHint() {
	var nb = document.getElementById('input-longueur').value;
	var perleLength = tissage === TISSAGE.PEYOTE_V ? 0.137 : 0.16;
	document.getElementById('hint-longueur').innerHTML =
		'L : ' + (nb * perleLength).toFixed(1) + ' cm';
}

/**
 * Computes main bracelet width
 */
function computeWidthHint() {
	var nb = document.getElementById('input-largeur').value;
	var perleWidth = tissage === TISSAGE.PEYOTE_V ? 0.16 : 0.137;
	document.getElementById('hint-largeur').innerHTML =
		'l : ' + (nb * perleWidth).toFixed(1) + ' cm';
}