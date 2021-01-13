/**
 * If the element does not have the classname, add it
 * @param {HTMLElement} element 
 * @param {String} classname 
 */
function addClassname(element, classname) {
	if (!element.getAttribute('class')) {
		element.setAttribute('class', classname);
	} else if (!element.getAttribute('class').split(' ').includes(classname)) {
		element.setAttribute('class', element.getAttribute('class') + ' ' + classname);
	}
}

/**
 * Remove the classname of the element
 * @param {HTMLElement} element 
 * @param {String} classname 
 */
function removeClassname(element, classname) {
	actualClasses = element.getAttribute('class');
	if (!actualClasses) {
		return;
	} else if (classname === actualClasses.trim()) {
		element.removeAttribute('class');
	} else if (actualClasses.split(' ').includes(classname)) {
		element.setAttribute(
			'class',
			actualClasses
				.split(' ')
				.filter(actualClass => actualClass !== classname)
				.join(' ')
		);
	}
}

/**
 * Check if a classname is present
 * @param {HTMLElement} element 
 * @param {String} classname 
 */
function hasClassname(element, classname) {
	actualClasses = element.getAttribute('class');
	if (!actualClasses) {
		return false;
	} else if (classname === actualClasses.trim() || actualClasses.split(' ').includes(classname)) {
		return true;
	}
}

/**
 * Returns whether the color is dark according to the hsp medial
 * @param {String} color hexadecimal color
 */
function isDark(color) {
	color = '0x' + color.substring(1, 7);
	r = color >> 16;
	g = (color >> 8) & 255;
	b = color & 255;
	hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp < 127.5;
}
