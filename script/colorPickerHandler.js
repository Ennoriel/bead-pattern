class ColorPickerHandler {
    constructor(htmlIdHook) {
        this.htmlContainer = document.getElementById(htmlIdHook);
        this.colorPickerObject = ColorPicker(this.htmlContainer, (hex) => this.handleColorPickerChange(hex));
        this.isOpen = false;

        this.initMouseDragElement()
        // this.htmlContainer.style.left = (window.innerWidth - 260 - 50) + 'px'
        // this.htmlContainer.style.top = (window.innerHeight - 220 - 50) + 'px'

        window.addEventListener('click', e => {
            if (this.isOpen && !this.htmlContainer.contains(e.target)
                            && !e.target.classList.contains('form-input')){
                this.handleCloseColorPicker();
            }
        });
    }

    initMouseDragElement() {
        this.htmlContainer.addEventListener('mousedown', function (e) {
            if(e.target.id === 'color-picker') {
                this.isDown = true;
                this.offset = [
                    this.offsetLeft - e.clientX,
                    this.offsetTop - e.clientY
                ];
            }
            console.log(e.target.id)
            console.log(e.target.id === 'color-picker')
        }, true)

        this.htmlContainer.addEventListener('mouseenter', e =>
            addClassname(this.htmlContainer, 'color-picker-opacity')
        )

        document.addEventListener('mouseup', () => {
            this.htmlContainer.isDown = false;
        }, true);

        document.addEventListener('mousemove', event => {
            if (this.htmlContainer.isDown) {
                event.preventDefault();
                this.htmlContainer.style.right = (window.innerWidth - event.clientX - this.htmlContainer.offset[0] - 260) + 'px';
                this.htmlContainer.style.bottom  = (window.innerHeight - event.clientY - this.htmlContainer.offset[1] - 220) + 'px';
            }
        }, true);
    }

    handleColorPickerChange(hex) {
        this.hex = hex;
        document.getElementById('input-color-' + this.key).value = this.hex;
        handleColorChange(this.key);
    }

    handleOpenColorPicker(key, color) {
        this.key = key;
        this.hex = color;
        this.htmlContainer.removeAttribute('hidden');
        this.colorPickerObject.setHex(this.hex);
        setTimeout(() => this.isOpen = true, 1);

        this.htmlContainer.addEventListener('mouseover', function() {
        console.log('Event triggered');
        });

        var event = new MouseEvent('mouseover', {
        'view': window,
        'bubbles': true,
        'cancelable': true
        });

        this.htmlContainer.dispatchEvent(event);
    }

    handleCloseColorPicker() {
        this.isOpen = false;
        this.key = undefined;
        this.htmlContainer.setAttribute('hidden', 'true');
        removeClassname(this.htmlContainer, 'color-picker-opacity')
    }
}
