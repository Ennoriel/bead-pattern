/**
 * color picker handler, exposes util methods to open, close and handle a color change
 */
class ColorPickerHandler {

	constructor(htmlIdHook) {
		this.container = document.getElementById(htmlIdHook);

		this.container.innerHTML = 
				`<include src="bead-collection/index.html"></include>
         <div id="picker" class="cp-default"></div>`;

		this.pickerContainer = document.getElementById('picker');

		this.colorPickerObject = ColorPicker(this.pickerContainer, hex =>
			this.handleColorPickerChange(hex)
		);
		this.isOpen = false;

		// after mouse enter the container once, a class is set to opacify when the mouse is leaving the container
		this.container.addEventListener('mouseenter', e =>
			addClassname(this.container, 'color-picker-opacity')
		);

		// Event that tracks click in order to close the color picker when needed
		window.addEventListener('click', e => this.handleInputColorAutoClosing(e.target));
	}

	/**
	 * Allows the color picker to be closed every time it is needed. The method is
	 * executed at every click on the window and check wether it is part of the color
	 * picker or not
	 * @param {HTMLElement} target clicked element
	 */
	handleInputColorAutoClosing(target) {
		if (this.isOpen &&
			!this.container.contains(target) && // element should not be in color picker
			!target.classList.contains('form-input') && // can click on another color input
			target.parentNode !== null
		) {
			this.handleCloseColorPicker();
		}
	}

	/**
	 * Handles user color change from the color picker
	 * @param {string} hex hexadecimal color
	 */
	handleColorPickerChange(hex) {
		this.hex = hex;
		document.getElementById('input-color-' + this.key).value = this.hex;
		handleColorChange(this.key);
	}

	/**
	 * Handles color picker opening
	 * @param {*} key key of the color
	 * @param {*} color initial color
	 */
	handleOpenColorPicker(key, color) {
		this.key = key;
		this.hex = color;
		this.container.removeAttribute('hidden');
		this.colorPickerObject.setHex(this.hex);
		setTimeout(() => (this.isOpen = true), 1);
	}

	/**
	 * Handles color picker closing
	 */
	handleCloseColorPicker() {
		this.isOpen = false;
		this.key = undefined;
		this.container.setAttribute('hidden', 'true');
		removeClassname(this.container, 'color-picker-opacity');
	}
}
