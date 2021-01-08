/**
 * Base class for Patterns and the Bracelet
 * @property {String} htmlIdHook html id
 * @property {String} varName variable name for dynamically accessing an instance of the class
 * @property {Dimension} dimension
 * @property {Array<Array<String>>} perlesPeintesTab representation of the trame
 * @property {Array<Array<String>>} perlesPeintesTabCurrentPreview preview of the trame, used when previewing a pattern on another trame
 * @property {Array<Array<String>>} perlesPeintesTabFuturePreview future preview of the trame, used when previewing a pattern on another trame
 */
class Trame {
	constructor(htmlIdHook, varName) {
		this.htmlIdHook = htmlIdHook;
		this.varName = 'factory.' + varName;
	}

	/**
	 * Inits the representation array of the pattern
	 * @param {String} exportedPattern exported representation of a pattern
	 */
	initPerlesPeintes(exportedPattern = null) {
		this.perlesPeintesTab = [];
		if (exportedPattern) {
			const width = this.dimension.width;
			for (let iCol = 0; iCol < this.dimension.length; iCol++) {
				this.perlesPeintesTab.push(
					exportedPattern
						.substring(width * iCol, width * (iCol + 1))
						.split('')
						.map(color => color.replace(' ', ''))
				);
			}
		} else {
			for (let iCol = 0; iCol < this.dimension.length; iCol++) {
				this.perlesPeintesTab.push(this.initColPerlesPeintes());
			}
		}
	}

	/**
	 * Inits the preview of the trame
	 */
	initPerlesPeintesTabCurrentPreview() {
		this.perlesPeintesTabCurrentPreview = this.perlesPeintesTab.map(col => col.slice());
	}

	/**
	 * Inits a column of the representation array of the pattern
	 */
	initColPerlesPeintes() {
		return Array.from({length: this.dimension.width}, () => '');
	}

	/**
	 * Generate the first column, field with delete beads
	 */
	generateDeleteCol() {
		// container
		let deleteColDiv = document.createElement('div');
		deleteColDiv.setAttribute('class', 'col delete-col');
		deleteColDiv.setAttribute('id', this.htmlIdHook + '-delete-col');

		// beads
		for (let iRow = 0; iRow < this.dimension.width; iRow++) {
			let deleteRowBead = generateDeleteBead();
			deleteRowBead.setAttribute('onclick', this.objectHook() + 'deleteRow(' + iRow + ')');
			deleteColDiv.appendChild(deleteRowBead);
		}

		document.getElementById(this.htmlIdHook).appendChild(deleteColDiv);
	}

	/**
	 * Generates the second column, filed with insert beads
	 */
	generateInsertCol() {
		// container
		let insertColDiv = document.createElement('div');
		insertColDiv.setAttribute('class', 'col insert-col');
		insertColDiv.setAttribute('id', this.htmlIdHook + '-insert-col');

		// perles
		for (let iRow = 0; iRow < this.dimension.width + 1; iRow++) {
			let insertColBead = generateInsertBead();
			insertColBead.setAttribute('onclick', this.objectHook() + 'addRow(' + iRow + ')');
			insertColDiv.appendChild(insertColBead);
		}

		document.getElementById(this.htmlIdHook).appendChild(insertColDiv);
	}

	/**
	 * Generates all colorable columns of beads
	 */
	generateBeadCols() {
		this.perlesPeintesTab.forEach((col, iCol) => {
			this.generateColCaneva(col, iCol);
		});
		this.generateLastInsertColBead(this.dimension.length);
	}

	/**
	 * the n-th (n > 2) column,
	 * composed of a delete bead, an insert bead and the colorable beads
	 * @param {Array<String>} col reprensentation of the column
	 * @param {number} iCol column id
	 */
	generateColCaneva(col, iCol) {
		// container
		let braceletColContainer = document.createElement('div');
		braceletColContainer.setAttribute('class', 'col');
		braceletColContainer.setAttribute('col-nb', iCol);
		braceletColContainer.setAttribute('id', this.htmlIdHook + '-col-' + iCol);

		// delete bead
		let deleteColBead = generateDeleteBead();
		addClassname(deleteColBead, 'top-delete-bead');
		deleteColBead.setAttribute(
			'onclick',
			this.objectHook() + 'deleteCol(this.parentElement.getAttribute("col-nb"))'
		);
		braceletColContainer.appendChild(deleteColBead);

		// insert bead
		let insertColBead = generateInsertBead();
		addClassname(insertColBead, 'top-insert-bead');
		insertColBead.setAttribute(
			'onclick',
			this.objectHook() + 'addCol(this.parentElement.getAttribute("col-nb"))'
		);
		braceletColContainer.appendChild(insertColBead);

		col.forEach((lettreCouleur, iRow) => {
			braceletColContainer.appendChild(this.generateBead(iCol, iRow, lettreCouleur));
		});

		document.getElementById(this.htmlIdHook).appendChild(braceletColContainer);
	}

	/**
	 * generates the last insert bead, after the last colorable column
	 * @param {number} iCol last column id
	 */
	generateLastInsertColBead(iCol) {
		let braceletColContainer = document.createElement('div');
		braceletColContainer.setAttribute('class', 'col');
		braceletColContainer.setAttribute('col-nb', iCol);
		// braceletColContainer.setAttribute('id', this.htmlIdHook + '-col-' + (iCol));

		// delete bead
		let deleteColBead = generateDeleteBead();
		addClassname(deleteColBead, 'top-delete-bead');
		deleteColBead.setAttribute('style', 'visibility: hidden;');
		braceletColContainer.appendChild(deleteColBead);

		// insert bead
		let insertColBead = generateInsertBead();
		addClassname(insertColBead, 'top-insert-bead');
		insertColBead.setAttribute(
			'onclick',
			this.objectHook() + 'addCol(this.parentElement.getAttribute("col-nb"))'
		);
		braceletColContainer.appendChild(insertColBead);

		document.getElementById(this.htmlIdHook).appendChild(braceletColContainer);
	}

	/**
	 * Generates a colorable bead
	 * @param {number} iCol column id
	 * @param {number} iRow row id
	 * @param {string} lettreCouleur color
	 */
	generateBead(iCol, iRow, lettreCouleur) {
		let perle = document.createElement('div');
		perle.setAttribute('class', 'color-bead bead');
		if (tissage === TISSAGE.PEYOTE) {
			addClassname(perle, 'bead-peyote');
		} else if (tissage === TISSAGE.PEYOTE_V) {
			addClassname(perle, 'bead-peyote-v');
		}
		perle.setAttribute('id', this.getBeadHtmlId(iCol, iRow));
		perle.setAttribute('col-nb', iCol);
		perle.setAttribute('row-nb', iRow);
		addBeadStyle(perle, lettreCouleur);
		perle.setAttribute('oncontextmenu', 'return false;');
		perle.setAttribute('onmouseover', this.objectHook() + 'paintBead(this)');
		return perle;
	}

	/**
	 * Adds a column, rerenders the all trame
	 * @param {number} iCol column id after wich to insert
	 */
	addCol(iCol) {
		this.perlesPeintesTab.splice(iCol, 0, this.initColPerlesPeintes());
		this.dimension.length++;
		this.initPerlesPeintesTabCurrentPreview();
		this.generateBraceletCaneva();
	}

	/**
	 * Deletes a column, rerenders the all trame
	 * @param {number} iCol column id to delete
	 */
	deleteCol(iCol) {
		this.perlesPeintesTab.splice(iCol, 1);
		this.dimension.length--;
		this.initPerlesPeintesTabCurrentPreview();
		this.generateBraceletCaneva();
	}

	/**
	 * Adds a row, rerenders the all trame
	 * @param {number} iRow row id to insert
	 */
	addRow(iRow) {
		this.perlesPeintesTab.forEach(col => {
			col.splice(iRow, 0, '');
		});
		this.dimension.width++;
		this.initPerlesPeintesTabCurrentPreview();
		this.generateBraceletCaneva();
	}

	/**
	 * Deletes a row, rerenders the all trame
	 * @param {number} iRow column id to delete
	 */
	deleteRow(iRow) {
		this.perlesPeintesTab.forEach(col => {
			col.splice(iRow, 1);
		});
		this.dimension.width--;
		this.initPerlesPeintesTabCurrentPreview();
		this.generateBraceletCaneva();
	}

	/**
	 * Handles the color change of a bead in the all trame
	 * @param {string} colorKey key of the color that changed
	 */
	handleColorChange(colorKey) {
		for (let iCol = 0; iCol < this.dimension.length; iCol++) {
			for (let iRow = 0; iRow < this.dimension.width; iRow++) {
				if (this.perlesPeintesTab[iCol][iRow] === colorKey) {
					addBeadStyle(document.getElementById(this.getBeadHtmlId(iCol, iRow)), colorKey);
				}
			}
		}
	}

	/**
	 * Adds style to a bead
	 * @param {HTMLElement} perle bead
	 */
	paintBead(perle) {
		if (!isFocusDisplay) {
			if (leftClickPressed && currentColor !== undefined) {
				if (currentColor.includes('pattern-')) {
					this.copyPatternToTab(perle);
					this.generateBraceletCaneva();
				} else {
					this.handlePerle(perle, currentColor);
				}
			} else if (rightClickPressed) {
				this.handlePerle(perle, '');
			} /* no click = fast pattern rendering */ else {
				if (currentColor.includes('pattern-')) {
					this.computeAndRenderPreview(perle);
				}
			}
		}
	}

	/**
	 * Paint a pattern to a trame
	 * @param {HTMLElement} perle bead to start from
	 * @param {boolean} preview is it for preview rendering
	 */
	copyPatternToTab(perle, preview = false) {
		let patternNb = parseInt(currentColor.charAt(8));
		let patternStartingPoint = currentColor.substring(10, 12);

		let iRowBegin = parseInt(perle.getAttribute('row-nb'));
		let iRowEnd = Math.min(
			iRowBegin + factory.patterns[patternNb].dimension.width,
			this.dimension.width
		);
		let iColBegin = parseInt(perle.getAttribute('col-nb'));
		let iColEnd = Math.min(
			iColBegin + factory.patterns[patternNb].dimension.length,
			this.dimension.length
		);
		// index deltas between the bracelet and the pattern
		let deltaCol = iColBegin;
		let deltaRow = iRowBegin;

		if (patternStartingPoint === 'br') {
			iRowEnd = 1 + parseInt(perle.getAttribute('row-nb'));
			iRowBegin = Math.max(iRowEnd - factory.patterns[patternNb].dimension.width, 0);
			iColEnd = 1 + parseInt(perle.getAttribute('col-nb'));
			iColBegin = Math.max(iColEnd - factory.patterns[patternNb].dimension.length, 0);
			deltaCol = iColEnd - factory.patterns[patternNb].dimension.width;
			deltaRow = iRowEnd - factory.patterns[patternNb].dimension.length;
		}

		if (tissage === TISSAGE.DROIT || tissage === TISSAGE.PEYOTE) {
			for (let iRow = iRowBegin; iRow < iRowEnd; iRow++) {
				// extra col used for proper peyote pattern rendering
				// when the pattern is applied to odd rows
				let extraCol =
					tissage === TISSAGE.PEYOTE && iRowBegin % 2 === 1 && iRow % 2 === 0 ? 1 : 0;
				if (patternStartingPoint === 'br') {
					// in case of a pattern truncated on the top,
					// iRowBegin = 0 is not representative,
					// thus iRowEnd - patternWidth is used
					extraCol =
						tissage === TISSAGE.PEYOTE &&
						Math.abs(iRowEnd - factory.patterns[patternNb].dimension.width) % 2 === 1 &&
						iRow % 2 === 0
							? 1
							: 0;
				}
				for (let iCol = iColBegin; iCol < iColEnd; iCol++) {
					// TODO remove extraCol from the for loop but add a max when used afterwards

					let patternColorKey =
						factory.patterns[patternNb].perlesPeintesTab[iCol - deltaCol][
							iRow - deltaRow
						];

					if (patternColorKey !== '') {
						if (preview) {
							if (extraCol && iCol === this.dimension.length - 1) continue;
							this.perlesPeintesTabFuturePreview[iCol + extraCol][
								iRow
							] = patternColorKey;
						} else {
							this.initPerlesPeintesTabCurrentPreview();
							this.perlesPeintesTab[iCol + extraCol][iRow] = patternColorKey;
						}
					}
				}
			}
		} /* PEYOTE_V */ else {
			for (let iCol = iColBegin; iCol < iColEnd; iCol++) {
				// extra row used for proper vertical peyote pattern rendering
				// when the pattern is applied to odd rows
				let extraRow =
					tissage === TISSAGE.PEYOTE_V && iColBegin % 2 === 1 && iCol % 2 === 0 ? 1 : 0;
				if (patternStartingPoint === 'br') {
					extraRow =
						tissage === TISSAGE.PEYOTE_V &&
						Math.abs(iColEnd - factory.patterns[patternNb].dimension.length) % 2 ===
							1 &&
						iCol % 2 === 0
							? 1
							: 0;
				}
				for (let iRow = iRowBegin; iRow < iRowEnd; iRow++) {
					let patternColorKey =
						factory.patterns[patternNb].perlesPeintesTab[iCol - deltaCol][
							iRow - deltaRow
						];
					if (patternColorKey !== '') {
						if (preview) {
							if (extraRow && iRow === this.dimension.width - 1) continue;
							this.perlesPeintesTabFuturePreview[iCol][
								iRow + extraRow
							] = patternColorKey;
						} else {
							this.initPerlesPeintesTabCurrentPreview();
							this.perlesPeintesTab[iCol][iRow + extraRow] = patternColorKey;
						}
					}
				}
			}
		}
	}

	/**
	 * Computes and renders preview starting from the clicked bead
	 * @param {HTMLElement} perle starting bead
	 */
	computeAndRenderPreview(perle) {
		this.perlesPeintesTabFuturePreview = this.perlesPeintesTab.map(col => col.slice());
		this.copyPatternToTab(perle, { preview: true });
		this.renderPreview();
	}

	/**
	 * Renders preview from the perlesPeintesTabFuturePreview property
	 */
	renderPreview() {
		for (let iCol = 0; iCol < this.dimension.length; iCol++) {
			for (let iRow = 0; iRow < this.dimension.width; iRow++) {
				let currentColor = this.perlesPeintesTab[iCol][iRow];
				let currentPreviewColor = this.perlesPeintesTabCurrentPreview[iCol][iRow];
				let futurePreviewColor = this.perlesPeintesTabFuturePreview[iCol][iRow];
				if (currentPreviewColor !== futurePreviewColor) {
					let perle = document.getElementById(this.getBeadHtmlId(iCol, iRow));
					if (futurePreviewColor !== '') {
						addBeadStyle(perle, futurePreviewColor);
					} else if (currentColor !== '') {
						addBeadStyle(perle, currentColor);
					} else {
						perle.removeAttribute('style');
					}
				}
			}
		}
		this.perlesPeintesTabCurrentPreview = this.perlesPeintesTabFuturePreview.map(col =>
			col.slice()
		);
	}

	/**
	 * Handle bead painting
	 * @param {HTMLElement} perle clicked bead
	 * @param {string} newColor new color, empty string if the color is removed
	 */
	handlePerle(perle, newColor) {
		let colNb = parseInt(perle.getAttribute('col-nb'));
		let rowNb = parseInt(perle.getAttribute('row-nb'));
		if (newColor == '') {
			perle.value = ''
			perle.removeAttribute('style');
			this.perlesPeintesTab[colNb][rowNb] = '';
		} else {
			perle.value = newColor
			var couleur = colors.get(perle.value);
			if (couleur) {
				addBeadStyle(perle, perle.value);
				this.perlesPeintesTab[colNb][rowNb] = perle.value;
			}
		}
	}

	/**
	 * Get the html id of a bead
	 * @param {number} col column index
	 * @param {number} row row index
	 */
	getBeadHtmlId(col, row) {
		return this.htmlIdHook + '-' + col + '-' + row;
	}

	/**
	 * Exports the trame
	 */
	export() {
		let res = this.dimension.export();
		res += this.perlesPeintesTab
			.map(col => col.map(bead => (bead === '' ? ' ' : bead)).join(''))
			.join('');
		return res;
	}

	/**
	 * Handles the focused mode, i.e. the borders are rendered only if the bead is painted
	 */
	focusDisplay() {
		for (let iCol = 0; iCol < this.dimension.length; iCol++) {
			for (let iRow = 0; iRow < this.dimension.width; iRow++) {
				if (!!!this.perlesPeintesTab[iCol][iRow]) {
					addClassname(
						document.getElementById(this.getBeadHtmlId(iCol, iRow)),
						'bead-no-border'
					);
				}
			}
			if (this.perlesPeintesTab[iCol].every(bead => bead === '')) {
				document
					.getElementById(this.htmlIdHook + '-col-' + iCol)
					.setAttribute('hidden', 'true');
			}
		}
	}

	/**
	 * Handles the unfocused mode
	 */
	unfocusDisplay() {
		let colorBeads = document.getElementsByClassName('color-bead');
		Array.prototype.filter.call(colorBeads, function (colorBead) {
			removeClassname(colorBead, 'bead-no-border');
		});
		let cols = document.getElementsByClassName('col');
		Array.prototype.filter.call(cols, function (col) {
			col.removeAttribute('hidden');
		});
	}

	/**
	 * Counts bead quantity
	 */
	countBeadQuantity() {
		let beadQty = new Map();
		Array.from(colors.keys()).forEach(color => beadQty.set(color, 0));
		for (let iCol = 0; iCol < this.dimension.length; iCol++) {
			for (let iRow = 0; iRow < this.dimension.width; iRow++) {
				let beadColor = this.perlesPeintesTab[iCol][iRow];
				if (!!beadColor) {
					beadQty.set(beadColor, beadQty.get(beadColor) + 1);
				}
			}
		}
		return beadQty;
	}
}

/**
 * class for the Bracelet
 * @property {String} containerHtmlIdHook html id of the bracelet container
 * @property {boolean} aEteGenere true if it has already been generated, false otherwise
 */
class Bracelet extends Trame {

	constructor() {
		super('bracelet', 'bracelet');
		this.containerHtmlIdHook = 'bracelet-container';
		this.aEteGenere = false;
	}

	/**
	 * Get objet hook, used to fire event to the object
	 */
	objectHook() {
		return this.varName + '.';
	}

	/**
	 * generates the trame
	 * @param {Dimension} dimension dimension of the trame
	 * @param {Array} newColors exported colors
	 * @param {String} exportedPattern exported patterns
	 */
	generateTrame(dimension, newColors, exportedPattern) {
		if (
			this.aEteGenere &&
			!confirm('Etes-vous sûr de vouloir regénérer la trame du bracelet ?')
		) {
			return;
		}

		initTissage();

		factory.deleteAllPatterns();

		this.aEteGenere = true;

		this.dimension = dimension;

		renderColors(newColors);

		this.initPerlesPeintes(exportedPattern);
		this.generateBraceletCaneva();

		this.initPerlesPeintesTabCurrentPreview();
	}

	/**
	 * Generates the bracelet caneva
	 */
	generateBraceletCaneva() {
		this.generateContainer();
		this.generateDeleteCol();
		this.generateInsertCol();
		this.generateBeadCols();
	}

	/**
	 * Generates an html container
	 */
	generateContainer() {
		document.getElementById(this.containerHtmlIdHook).innerHTML = '';
		let flexContainer = document.createElement('div');
		flexContainer.setAttribute('class', 'caneva-container-flex');
		flexContainer.setAttribute('id', this.htmlIdHook);

		document.getElementById(this.containerHtmlIdHook).appendChild(flexContainer);
	}

	/**
	 * Exports the pattern
	 */
	export() {
		return tissage + '-' + super.export();
	}

	/**
	 * @param {number} iCol column id after wich to insert
	 */
	addCol(iCol) {
		super.addCol(iCol);
		document.getElementById('input-longueur').value = this.dimension.length;
		computeLengthHint();
	}

	/**
	 * @param {number} iCol column id to delete
	 */
	deleteCol(iCol) {
		super.deleteCol(iCol);
		document.getElementById('input-longueur').value = this.dimension.length;
		computeLengthHint();
	}

	/**
	 * @param {number} iRow row id to insert
	 */
	addRow(iRow) {
		super.addRow(iRow);
		document.getElementById('input-largeur').value = this.dimension.width;
		computeWidthHint();
	}

	/**
	 * @param {number} iRow column id to delete
	 */
	deleteRow(iRow) {
		super.deleteRow(iRow);
		document.getElementById('input-largeur').value = this.dimension.width;
		computeWidthHint();
	}
}

/**
 * class for the patterns
 * @property {String} containerHtmlIdHook html id of the bracelet container
 * @property {number} patternNb pattern number
 * @property {boolean} aEteGenere true if it has already been generated, false otherwise
 */
class Pattern extends Trame {

	constructor(patternNb) {
		super('pattern-' + patternNb, 'patterns');

		this.patternNb = patternNb;
		this.containerHtmlIdHook = 'patterns-container';
		this.aEteGenere = false;
	}

	/**
	 * Get the object hooks
	 */
	objectHook() {
		return this.varName + '[' + this.patternNb + '].';
	}

	/**
	 * Generates the trame
	 * @param {Dimension} dimension 
	 * @param {string} exportedPattern 
	 */
	generateTrame(dimension, exportedPattern) {
		this.dimension = dimension;

		if (this.aEteGenere) {
			document.getElementById(this.htmlIdHook).innerHTML = '';
		}

		this.initPerlesPeintes(exportedPattern);
		this.generateBraceletCaneva();
		this.rendersPatternActions();

		this.initPerlesPeintesTabCurrentPreview();

		this.aEteGenere = true;
	}

	/**
	 * Generates the trame caneva
	 */
	generateBraceletCaneva() {
		this.generateContainer();
		this.generateDeleteCol();
		this.generateInsertCol();
		this.generateBeadCols();
	}

	/**
	 * Generates an html container
	 */
	generateContainer() {
		if (this.aEteGenere) {
			document.getElementById(this.htmlIdHook).innerHTML = '';
			if (currentColor === 'currentColor-' + this.patternNb) {
				selectPinceau(undefined);
			}
		} else {
			let flexContainerSub = document.createElement('div');
			flexContainerSub.setAttribute('style', 'display:flex;');
			flexContainerSub.setAttribute('id', this.htmlIdHook + '-sub');

			let flexContainer = document.createElement('div');
			flexContainer.setAttribute('class', 'caneva-container-flex');
			flexContainer.setAttribute('id', this.htmlIdHook);

			flexContainerSub.appendChild(flexContainer);
			document.getElementById(this.containerHtmlIdHook).appendChild(flexContainerSub);
		}
	}

	/**
	 * Renders the pattern actions
	 */
	rendersPatternActions() {
		let flexDiv = document.createElement('div');
		flexDiv.setAttribute('class', 'pattern-actions');

		let radioSelectPatternTL = renderRadioInput(this.htmlIdHook + '-tl');
		let radioSelectPatternBR = renderRadioInput(this.htmlIdHook + '-br');
		let crossDeletePattern = generateDeleteBead();
		crossDeletePattern.setAttribute('onclick', 'factory.deletePattern(' + this.patternNb + ')');

		flexDiv.appendChild(radioSelectPatternTL);
		flexDiv.appendChild(radioSelectPatternBR);
		flexDiv.appendChild(crossDeletePattern);
		document.getElementById(this.htmlIdHook + '-sub').appendChild(flexDiv);
	}

	/**
	 * Delete the pattern
	 */
	deletePattern() {
		document.getElementById(this.htmlIdHook + '-sub').remove();
	}
}
