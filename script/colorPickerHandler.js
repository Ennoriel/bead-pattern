class ColorPickerHandler {
    constructor(htmlIdHook) {
        this.colorPickerContainer = document.getElementById(htmlIdHook);
        this.colorPickerObject = ColorPicker(this.colorPickerContainer, (hex) => this.handleColorPickerChange(hex));
        this.isOpen = false;

        window.addEventListener('click', e => {
            if (this.isOpen && !this.colorPickerContainer.contains(e.target)
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
        this.colorPickerContainer.removeAttribute('hidden');
        this.colorPickerObject.setHex(this.hex);
        setTimeout(() => this.isOpen = true, 1);
    }

    handleCloseColorPicker() {
        this.isOpen = false;
        this.key = undefined;
        this.colorPickerContainer.setAttribute('hidden', 'true');
    }
}