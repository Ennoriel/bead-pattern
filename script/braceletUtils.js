function generateDeleteBead() {
	let deleteBead = generateActionBead();
	deleteBead.innerHTML = 'x';
	return deleteBead;
}

function generateInsertBead() {
	let insertBead = generateActionBead();
	addClassname(insertBead, 'insert-bead');
	insertBead.innerHTML = '+';
	return insertBead;
}

function generateActionBead() {
	let actionBead = document.createElement('div');
	actionBead.setAttribute('class', 'bead action-bead');
	actionBead.setAttribute('oncontextmenu', 'return false;');
	return actionBead;
}

function addBeadStyle(bead, colorKey) {
	var color = colors.get(colorKey);
	if (color) {
		if (tissage === TISSAGE.PEYOTE_V) {
			bead.setAttribute(
				'style',
				'background: linear-gradient(' + color + 'bb, ' + color + ', ' + color + 'bb);'
			);
		} else {
			bead.setAttribute(
				'style',
				'background: linear-gradient(0.25turn, ' +
					color +
					'bb, ' +
					color +
					', ' +
					color +
					'bb);'
			);
		}
	}
}
