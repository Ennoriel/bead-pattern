class Factory {
	constructor() {
		this.bracelet = new Bracelet();
		this.patterns = [];
	}

	get all() {
		return [this.bracelet, ...this.patterns];
	}

	get lastPattern() {
		return this.patterns[this.patterns.size];
	}

	get htmlHooks() {
		return [...this.all.htmlIdHook];
	}

	getAssociatedTrame(htmlId) {
		return this.all.find(trame => trame.htmlIdHook === htmlId);
	}

	generatePattern(dimension, perlesPeintesString) {
		if (dimension) {
			let pattern = new Pattern(this.patterns.length);
			pattern.generateTrame(dimension, perlesPeintesString);
			this.patterns.push(pattern);
		} else {
			if (this.patterns.length < 5) {
				let pattern = new Pattern(this.patterns.length);
				pattern.generateTrame(new Dimension(Math.min(8, this.bracelet.dimension.width)));
				this.patterns.push(pattern);
			}
		}
	}

	deletePattern(patterNb) {
		this.patterns[patterNb].deletePattern();
		this.patterns.splice(patterNb, 1);
	}

	generateTrame() {
		let braceletDimension = new Dimension(
			document.getElementById('input-largeur').value,
			document.getElementById('input-longueur').value
		);
		this.bracelet.generateTrame(braceletDimension);
	}

	removeAllPatterns() {
		if (this.patterns.length) {
			document.getElementById(this.patterns[0].containerHtmlIdHook).innerHTML = '';
			this.patterns.length = 0;
		}
	}

	export() {
		let exportString = this.exportColors();
		exportString += ';';
		exportString += this.exportBracelet();
		exportString += ';';
		exportString += this.exportPatterns();
		document.getElementById('import-input').value = exportString;
		document.getElementById('import-input').select();
	}

	exportColors() {
		return Array.from(colors.values()).join('-');
	}

	exportBracelet() {
		return this.bracelet.export();
	}

	exportPatterns() {
		return this.patterns.map(pattern => pattern.export()).join('|');
	}

	import() {
		let exportString = document.getElementById('import-input').value;
		let exportTab = exportString.split(';');
		this.importBracelet(exportTab[0], exportTab[1]);
		this.importPatterns(exportTab[2]);
	}

	importBracelet(exportedColors, exportBracelet) {
		let exportBraceletTab = exportBracelet.split('-');

		let importedTissage = parseInt(exportBraceletTab[0]);
		switch (importedTissage) {
			case TISSAGE.DROIT:
				document.getElementById('droit').checked = true;
				break;
			case TISSAGE.PEYOTE:
				document.getElementById('peyote').checked = true;
				break;
			case TISSAGE.PEYOTE_V:
				document.getElementById('peyote-v').checked = true;
				break;
		}

		let importedDimension = new Dimension(exportBraceletTab[1], exportBraceletTab[2]);
		document.getElementById('input-longueur').value = importedDimension.length;
		document.getElementById('input-largeur').value = importedDimension.width;
		this.bracelet = new Bracelet();
		this.bracelet.generateTrame(
			importedDimension,
			exportedColors.split('-'),
			exportBraceletTab[3]
		);
	}

	importPatterns(importedPatterns) {
		this.removeAllPatterns();
		if (!!importedPatterns) {
			importedPatterns.split('|').forEach(importedPattern => {
				let importedPatternTab = importedPattern.split('-');
				let importedDimension = new Dimension(importedPatternTab[0], importedPatternTab[1]);
				this.generatePattern(importedDimension, importedPatternTab[2]);
			});
		}
	}

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
			document.getElementById('pinceau-' + colorKey).setAttribute('hidden', 'true');
		});

		this.bracelet.focusDisplay();
	}

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
			document.getElementById('pinceau-' + colorKey).removeAttribute('hidden');
		});

		this.bracelet.unfocusDisplay();
	}
}
