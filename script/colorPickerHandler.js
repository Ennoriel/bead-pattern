/**
 * color picker handler, exposes util methods to open, close and handle a color change
 * @property {boolean} isOpen indicates whether the bead panel and color picker are open or not
 */
class ColorPickerHandler {

	constructor(htmlIdHook) {
		this.container = document.getElementById(htmlIdHook);

		this.container.innerHTML = 
				`<include src="bead-collection/index.html"></include>
         <div id="picker" class="cp-default"></div>`;

		this.pickerContainer = document.getElementById('picker');

		this.colorPickerObject = ColorPicker(this.pickerContainer, hex =>
			this.handleColorPickerChange(new HexColor(hex))
		);
		this.isOpen = false;

		// after mouse enter the container once, a class is set to opacify when the mouse is leaving the container
		this.container.addEventListener('mouseenter', e =>
			addClassname(this.container, 'color-picker-opacity')
		);

		// Event that tracks click in order to close the color picker when needed
		window.addEventListener('mousedown', e => this.handleInputColorAutoClosing(e.target));
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
	 * @param {Color} color color
	 */
	handleColorPickerChange(color) {

		// Condition to prevent the propagation of the events when the picker and the bead panel open
		if (!this.isOpen) return;
		if (color instanceof HexColor && this.color instanceof DbColor && color.hex === this.color.dominantColor) return;

		this.color = color
		if (color instanceof DbColor) {
			this.colorPickerObject.setHex(this.color.inputColor);
		} else {
			this.beadPanel.setBead()
		}
		document.getElementById('input-color-' + this.key).value = this.color.inputValue;
		handleColorChange(this.key, this.color);
	}

	/**
	 * Handles color picker opening
	 * @param {String} key key of the color
	 */
	handleOpenColorPicker(key) {
		this.key = key;
		this.color = colors.get(key)
		
		this.container.removeAttribute('hidden');

		this.colorPickerObject.setHex(this.color.inputColor);
		if(this.color instanceof DbColor) {
			this.beadPanel.setBead(this.color)
		} else {
			this.beadPanel.setBead()
		}
		
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

	handleBeadCollectionLoad() {
		this.beadPanel = new BeadPanel((bead) => {this.handleColorPickerChange(bead)});
	}
}
