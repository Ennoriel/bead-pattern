function main() {
    initColors();
    initMouse();
    initTissage();
    initDimension();
    initFactory();
    initColorPicker();
    loadLanguage('fr');
}

function initColorPicker() {
    colorPicker = new ColorPickerHandler('color-picker');
}

function initColors() {
    lettres = [...Array(20).keys()].map(x => String.fromCharCode(x + 97));
    colors = new Map();
    pinceau = '';
}

function initMouse() {
    leftClickPressed = false;
    rightClickPressed = false;
    isFocusDisplay = false;
}

function computeLengthHint() {
    var nb = document.getElementById("input-longueur").value;
    var perleLength = tissage === TISSAGE.PEYOTE_V ? 0.137 : 0.16;
    document.getElementById("hint-longueur").innerHTML = "L : " + (nb * perleLength).toFixed(1) + " cm";
}

function computeWidthHint() {
    var nb = document.getElementById("input-largeur").value;
    var perleWidth = tissage === TISSAGE.PEYOTE_V ? 0.16 : 0.137;
    document.getElementById("hint-largeur").innerHTML = "l : " + (nb * perleWidth).toFixed(1) + " cm";
}

function initDimension() {
    document.getElementById("input-largeur").value = 5;
    document.getElementById("input-longueur").value = 40;
    
    computeLengthHint();
    computeWidthHint();
}

function initTissage() {
    if(document.getElementById("droit").checked) {
        tissage = TISSAGE.DROIT;
    } else if (document.getElementById("peyote").checked) {
        tissage = TISSAGE.PEYOTE;
    } else {
        tissage = TISSAGE.PEYOTE_V;
    }
}

function initFactory() {
    factory = new Factory();
}