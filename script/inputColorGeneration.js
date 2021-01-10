/**
 * add color to the color array and render the input color
 * @param {*} color existing color
 */
function addColor(color = null) {
	if (colors.size >= 20) return;

	var key = alphabet[colors.size];
	color = color
		? color
		: '#' +
		  Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0');
	colors.set(key, new HexColor(color));

	inputColorContainer = document.getElementById('input-color');

	spanContainer = document.createElement('span');
	spanContainer.setAttribute('id', 'container-couleur-' + key);
	spanContainer.setAttribute('class', 'container-couleur');

	label = document.createElement('label');
	label.setAttribute('id', 'label-color-' + key);
	label.setAttribute('hidden', 'true');

	input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'input-color-' + key);
	input.setAttribute('class', 'form-input');
	input.setAttribute('autocomplete', 'off');
	input.setAttribute('maxlength', '7');
	input.setAttribute('pattern', '(#[A-Fa-f0-9]{6})|(DB\\d{4}[LF]?)');
	input.setAttribute('value', color);
	addColorStyle(input, color);
	input.setAttribute('onClick', 'colorPicker.handleOpenColorPicker("' + key + '")');

	radioPinceau = renderRadioInput(key);

	spanContainer.appendChild(label);
	spanContainer.appendChild(input);
	spanContainer.appendChild(radioPinceau);

	inputColorContainer.appendChild(spanContainer);
}

/**
 * renders a radio input for color check
 * @param {*} key color key
 */
function renderRadioInput(key) {
	radioPinceau = document.createElement('input');
	radioPinceau.setAttribute('type', 'radio');
	radioPinceau.setAttribute('name', 'currentColor');
	radioPinceau.setAttribute('id', 'currentColor-' + key);
	radioPinceau.setAttribute('class', 'radio-currentColor');
	radioPinceau.setAttribute('value', key);
	radioPinceau.setAttribute('onclick', 'selectPinceau("' + key + '")');
	radioPinceau.setAttribute('autocomplete', 'off');

	return radioPinceau;
}

/**
 * handle color array change
 * @param {String} key 
 * @param {Color} color 
 */
function handleColorChange(key, color) {
	let colorInput = document.getElementById('input-color-' + key);

	if (colorInput.checkValidity()) {
		removeClassname(colorInput, 'blink');
		addColorStyle(colorInput, color.inputColor);
		colors.set(key, color);	

		factory.all.forEach(trame => trame.handleColorChange(key));
	} else {
		addClassname(colorInput, 'blink');
	}
}

/**
 * render input color change
 * @param {*} element input color
 * @param {*} color new color
 */
function addColorStyle(element, color) {
	element.style.backgroundColor = color;
	if (isDark(color)) {
		element.style.color = 'white';
	} else {
		element.style.color = 'black';
	}
}

/**
 * Selects color
 * @param {string} key color key
 */
function selectPinceau(key) {
	currentColor = key;
}

/**
 * Renders initial color inputs
 * @param {Array<String>} newColors exported colors
 */
function renderColors(newColors) {
		// removes color input
		for (let i = 0; i < colors.size; i++) {
			document.getElementById('container-couleur-' + alphabet[i]).remove();
		}
		// init colors
		initColors();
		// imports colors or initialize first color
		if (newColors) {
			newColors.forEach(color => addColor(color));
		} else {
			addColor();
		}
	}
