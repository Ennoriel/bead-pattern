/**
 * Inits all scripts
 */
function main() {
	initBeadCollection().then(() => {
		initColors();
		initMouse();
		initTissage();
		initDimension();
		initFactory();
		initColorPicker();
		loadLanguage('fr');
		factory.generateBracelet();
		importIncludeElements();
	})
}

/**
 * Inits the bead collection store variable
 */
async function initBeadCollection() {
	return fetch('./public/beads.json')
				.then(response => response.json())
				.then(beads => beads.map(bead => new DbColor(bead)))
				.then(beads => beadCollection = beads)
}

/**
 * Inits the color map
 */
function initColors() {
	alphabet = [...Array(20).keys()].map(x => String.fromCharCode(x + 97));
	colors = new Map();
	currentColor = '';
}

/**
 * Inits the mouse tracking variables
 */
function initMouse() {
	leftClickPressed = false;
	rightClickPressed = false;
	isFocusDisplay = false;
}

/**
 * Inits the tissage variable
 */
function initTissage() {
	if (document.getElementById('droit').checked) {
		tissage = TISSAGE.DROIT;
	} else if (document.getElementById('peyote').checked) {
		tissage = TISSAGE.PEYOTE;
	} else {
		tissage = TISSAGE.PEYOTE_V;
	}
}

/**
 * Inits the main bracelet dimension
 */
function initDimension() {
	document.getElementById('input-largeur').value = 6;
	document.getElementById('input-longueur').value = 6;

	computeLengthHint();
	computeWidthHint();
}

/**
 * Inits the factory
 */
function initFactory() {
	factory = new Factory();
}

/**
 * Inits color picker
 */
function initColorPicker() {
	colorPicker = new ColorPickerHandler('color-picker');
}

/**
 * Handle saving if asked and go to menu
 */
function goBack() {
	if (confirm(translations['confirm-save'])) {
		saveWork()
	}
	window.location.href = './menu';
}