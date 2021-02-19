// Tissage enumeration & current tissage mode
const TISSAGE = Object.freeze({ DROIT: 1, PEYOTE: 2, PEYOTE_V: 3 });
var tissage;

const PERLES_AND_CO = "https://www.perlesandco.com"
const AFFILIATE_PARAM = "affiliate_banner_id=1&ref=2481"

// letters, used to mark bead with a distinctive letter. Each letter matches a color
var alphabet;
// array of colors chosen by the user
var colors;
// current selected color
var currentColor;

// html container for the colorPicker & beadCollection objects
var colorPicker;

// boolean that stores whether the mouse buttons are pressed
var leftClickPressed;
var rightClickPressed;

// boolean that stores whether the focus display is selected
var isFocusDisplay;

// trame factory, handles action on trames
var factory;

// language
var language;
var translations;

/**
 * bead collection, array of DbColor
 */
var beadCollection
