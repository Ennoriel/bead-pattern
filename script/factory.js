/**
 * Factory, handles trame generation and events
 */
class Factory {
	constructor() {
		this.bracelet = new Bracelet();
		this.patterns = [];
	}

	/**
	 * gets all trames, bracelet and patterns
	 */
	get all() {
		return [this.bracelet, ...this.patterns];
	}

	/**
	 * Gets the trame associated to the html id
	 * @param {string} htmlId html id of one of a trame
	 */
	getAssociatedTrame(htmlId) {
		return this.all.find(trame => trame.htmlIdHook === htmlId);
	}

	/**
	 * Generate a pattern from scratch or from exported dimension & representation
	 * @param {Dimension} dimension dimension of the exported dimension
	 * @param {String} exportedPattern exported representation of the pattern
	 */
	generatePattern(dimension, exportedPattern) {
		if (dimension) {
			let pattern = new Pattern(this.patterns.length);
			pattern.generateTrame(dimension, exportedPattern);
			this.patterns.push(pattern);
		} else {
			if (this.patterns.length < 5) {
				let pattern = new Pattern(this.patterns.length);
				pattern.generateTrame(new Dimension(Math.min(8, this.bracelet.dimension.width)));
				this.patterns.push(pattern);
			}
		}
	}

	/**
	 * Generates the main bracelet
	 */
	generateBracelet() {
		let braceletDimension = new Dimension(
			document.getElementById('input-largeur').value,
			document.getElementById('input-longueur').value
		);
		this.bracelet.generateTrame(braceletDimension);
	}

	/**
	 * Deletes a pattern
	 * @param {Number} patterNb pattern number to delete
	 */
	deletePattern(patterNb) {
		this.patterns[patterNb].deletePattern();
		this.patterns.splice(patterNb, 1);
	}

	/**
	 * Deletes all patterns
	 */
	deleteAllPatterns() {
		if (this.patterns.length) {
			document.getElementById(this.patterns[0].containerHtmlIdHook).innerHTML = '';
			this.patterns.length = 0;
		}
	}

	/**
	 * Makes the working area in focus mode, to make a snapshot
	 */
	focusDisplay() {
		isFocusDisplay = true;
		document.getElementById('focus-display').setAttribute('hidden', 'true');
		document.getElementById('unfocus-display').removeAttribute('hidden');

		document.getElementById('patterns-container').setAttribute('hidden', 'true');
		removeClassname(document.getElementById('trame-container'), 'trame-container-work');
		addClassname(document.getElementById('trame-container'), 'trame-container-focused');
		document.getElementById('add-color-button').setAttribute('hidden', 'true');

		let actionBeads = document.getElementsByClassName('action-bead');
		Array.prototype.filter.call(actionBeads, function (actionBead) {
			actionBead.setAttribute('hidden', 'true');
		});

		let beadQty = factory.bracelet.countBeadQuantity();
		Array.from(beadQty.keys()).forEach(colorKey => {
			document.getElementById('label-color-' + colorKey).removeAttribute('hidden');
			document.getElementById('label-color-' + colorKey).innerHTML = beadQty.get(colorKey);
			document.getElementById('currentColor-' + colorKey).setAttribute('hidden', 'true');
		});

		this.bracelet.focusDisplay();
	}

	/**
	 * Makes the working area in working mode, to add new beads
	 */
	unfocusDisplay() {
		isFocusDisplay = false;
		document.getElementById('unfocus-display').setAttribute('hidden', 'true');
		document.getElementById('focus-display').removeAttribute('hidden');

		document.getElementById('patterns-container').removeAttribute('hidden');
		addClassname(document.getElementById('trame-container'), 'trame-container-work');
		removeClassname(document.getElementById('trame-container'), 'trame-container-focused');
		document.getElementById('add-color-button').removeAttribute('hidden');

		let actionBeads = document.getElementsByClassName('action-bead');
		Array.prototype.filter.call(actionBeads, function (actionBead) {
			actionBead.removeAttribute('hidden');
		});

		Array.from(colors.keys()).forEach(colorKey => {
			document.getElementById('label-color-' + colorKey).setAttribute('hidden', 'true');
			document.getElementById('label-color-' + colorKey).innerHTML = '';
			document.getElementById('currentColor-' + colorKey).removeAttribute('hidden');
		});

		this.bracelet.unfocusDisplay();
	}
}
