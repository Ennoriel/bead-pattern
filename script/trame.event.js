/**
 * Event that assigns store variables a boolean indicating
 * whether the left or right click has been pressed.
 * Also paint the clicked bead 
 */
document.addEventListener('mousedown', function (event) {
	if (event.button == 0) {
		leftClickPressed = true;
		getFocusedBead(event.target)?.paintBead(event.target, true);
	} else if (event.button == 2) {
		rightClickPressed = true;
		getFocusedBead(event.target)?.paintBead(event.target, false);
	}
});

/**
 * Event that assigns store variables a boolean indicating
 * whether the left or right click has been pressed.
 */
document.addEventListener('mouseup', function (event) {
	if (event.button == 0) {
		leftClickPressed = false;
	} else if (event.button == 2) {
		rightClickPressed = false;
	}
});

/**
 * Reset the trame preview if the mouse pointer leaves a trame
 * The way the event works is that it stores the previous element as a variable of a singleton
 */
document.addEventListener('mouseover', function () {
	let lastTrameHovered = undefined;

	return function (event) {
		if (!isFocusDisplay) {
			if (lastTrameHovered) {
				if (!event.target.getAttribute('class')?.split(' ').includes('color-bead')) {
					lastTrameHovered?.generateBraceletCaneva();
					lastTrameHovered?.initPerlesPeintesTabCurrentPreview();
					lastTrameHovered = undefined;
				}
			} else if (event.target.getAttribute('class')?.split(' ').includes('color-bead')) {
				lastTrameHovered = getTrameAttachedToBead(event.target);
			}
		}
	};
}())

/**
 * Check if the element is a colorable bead and if so,
 * returns the bracelet or pattern containing that bead
 * @param {HTMLElement} element
 * @return colorable bead element if it exists
 */
function getFocusedBead(element) {
	if (
		element?.getAttribute('class')?.split(' ').includes('bead') &&
		!element.getAttribute('class')?.split(' ').includes('action-bead')
	) {
		return getTrameAttachedToBead(element);
	}
	return null;
}

/**
 * Find the bracelet or pattern containing that bead by reading the DOM tree
 * @param {HTMLElement} bead
 * @return {Trame} returns the bracelet or pattern containing that bead
 */
function getTrameAttachedToBead(bead) {
	if (!(bead instanceof HTMLDocument)) {
		bracelet = factory.getAssociatedTrame(bead.getAttribute('id'));
		return !!bracelet ? bracelet : getTrameAttachedToBead(bead.parentNode);
	}
}
