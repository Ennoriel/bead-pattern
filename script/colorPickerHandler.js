class ColorPickerHandler {
    constructor(htmlIdHook) {
        this.container = document.getElementById(htmlIdHook);

        this.container.innerHTML = 
            `<include src="bead-collection/index.html"></include>
            <div id="picker" class="cp-default"></div>`

        this.pickerContainer = document.getElementById('picker');

        this.colorPickerObject = ColorPicker(this.pickerContainer, (hex) => this.handleColorPickerChange(hex));
        this.isOpen = false;

        // after mouse enter the container once, a class is set to opacify when the mouse is leaving the container
        this.container.addEventListener('mouseenter', e =>
            addClassname(this.container, 'color-picker-opacity')
        )

        window.addEventListener('click', e => {
            if (this.isOpen && !this.container.contains(e.target)
                            && !e.target.classList.contains('form-input')){
                this.handleCloseColorPicker();
            }
        });
    }

    handleColorPickerChange(hex) {
        this.hex = hex;
        document.getElementById('input-color-' + this.key).value = this.hex;
        handleColorChange(this.key);
    }

    handleOpenColorPicker(key, color) {
        this.key = key;
        this.hex = color;
        this.container.removeAttribute('hidden');
        this.colorPickerObject.setHex(this.hex);
        setTimeout(() => this.isOpen = true, 1);
    }

    handleCloseColorPicker() {
        this.isOpen = false;
        this.key = undefined;
        this.container.setAttribute('hidden', 'true');
        removeClassname(this.pickerContainer, 'color-picker-opacity')
    }
}
