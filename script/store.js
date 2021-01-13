// Tissage enumeration & current tissage mode
const TISSAGE = Object.freeze({ DROIT: 1, PEYOTE: 2, PEYOTE_V: 3 });
var tissage;

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
 * bead collection, array of
 *   {
 *     "i":"DB0001",  -- id
 *     "c":6,         -- Color         [may be a string or an array]
 *     "g":1,         -- Glass           | |
 *     "f":11,        -- Finish          | |
 *     "d":2,         -- Die             | |
 *     "z":2,         -- Galvanizing     | |
 *     "p":3,         -- Plating         | |
 *     "o":"#09090f", -- dominant color in the picture
 *     "m":"#d3d7e2"  -- lightest color of the 4 average colors in the picture
 *   }
 */
var beadCollection
