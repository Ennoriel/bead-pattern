function addColor(color = null) {
    if(colors.size >= 20) return;

    var key = lettres[colors.size];
    color = color ? color : '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    colors.set(key, color);

    inputColorContainer = document.getElementById("input-color");

    spanContainer = document.createElement("span");
    spanContainer.setAttribute('id', 'container-couleur-' + key);
    spanContainer.setAttribute('class', 'container-couleur');

    label = document.createElement('label');
    label.setAttribute('id', 'label-color-' + key);
    label.setAttribute('hidden', 'true');

    input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'input-color-' + key);
    input.setAttribute('class', 'form-input');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('maxlength', '7');
    input.setAttribute('pattern', '#[A-Fa-f0-9]{6}');
    input.setAttribute('value', color);
    addColorStyle(input, color);
    input.setAttribute('onchange', 'handleColorChange("' + key + '")');
    input.setAttribute('onClick', 'colorPicker.handleOpenColorPicker("' + key + '", this.value)');

    radioPinceau = generateRadioInput(key);

    spanContainer.appendChild(label);
    spanContainer.appendChild(input);
    spanContainer.appendChild(radioPinceau);

    inputColorContainer.appendChild(spanContainer)
}

function generateRadioInput(key) {
    radioPinceau = document.createElement("input");
    radioPinceau.setAttribute('type', 'radio');
    radioPinceau.setAttribute('name', 'pinceau');
    radioPinceau.setAttribute('id', 'pinceau-' + key);
    radioPinceau.setAttribute('class', 'radio-pinceau');
    radioPinceau.setAttribute('value', key);
    radioPinceau.setAttribute('onclick', 'selectPinceau("' + key + '")');
    radioPinceau.setAttribute('autocomplete', 'off');

    return radioPinceau;
}

function handleColorChange(key) {
    let colorInput = document.getElementById("input-color-" + key);
    if(colorInput.checkValidity()) {
        removeClassname(colorInput, 'blink');
        let couleur = colorInput.value;
        addColorStyle(colorInput, couleur);
        colors.set(key, couleur);
        factory.all.forEach(trame => trame.handleColorChange(key));
    } else {
        addClassname(colorInput, 'blink');
    }
}

function addColorStyle(element, color) {
    element.style.backgroundColor = color;
    if (isDark(color)) {
        element.style.color = 'white';
    } else {
        element.style.color = 'black';
    }
}