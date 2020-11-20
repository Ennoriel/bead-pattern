/**
 * Bead selector panel component
 */
class BeadPanel {

	constructor() {
		this.initFilters();
		this.initBeads();

		document
			.getElementById('bead-collection')
			.style.setProperty('--collection-height', '200px');
	}

	/**
	 * Inits filters and selectedFilters attributes and then calls the rendering method
	 */
	async initFilters() {
		this.selectedFilters = [];
		await fetch('./public/filters.json')
			.then(response => response.json())
			.then(filters => {
				this.filters = filters;
				filters.forEach(filter => {
					this.selectedFilters.push({ id: filter.id, entries: [] });
				});
				this.renderFilters();
			});
	}

	/**
	 * Renders the filters from the selectedFilters attribute
	 */
	renderFilters() {
		let filterPanel = document.getElementById('bead-filters');
		filterPanel.innerHTML = '';

		this.filters.forEach((filter, filterIndex) => {
			let title = document.createElement('h1');
			title.innerHTML = filter.label;

			filterPanel.append(title);

			filter.entries.forEach((filterEntry, entryIndex) => {
				let input = document.createElement('input');
				input.type = 'checkbox';
				input.setAttribute(
					'onClick',
					'beadPanel.handleFilterChange(' + filterIndex + ',' + entryIndex + ')'
				);
				if (this.selectedFilters[filterIndex].entries.includes(entryIndex)) {
					input.checked = true;
				}

				let label = document.createElement('label');
				label.innerHTML = filterEntry;

				filterPanel.append(input);
				filterPanel.append(label);
			});
		});
	}

	/**
	 * Inits beads attribute and then calls the rendering method
	 */
	async initBeads() {
		this.beads = await fetch('./public/beads.json').then(response => response.json());
		this.renderBeadThumbails();
	}

	/**
	 * Renders the bead thumbnails
	 */
	renderBeadThumbails() {
		const thumbnailContainer = document.getElementById('thumbnails');
		thumbnailContainer.innerHTML = '';

		this.beads.filter(bead => 
			this.selectedFilters.filter(filter => filter.entries.length)
					.every(filter =>
						typeof bead[filter.id] === 'number'
							? filter.entries.length === 1 && filter.entries.includes(bead[filter.id])
							: filter.entries.every(filterEntry => bead[filter.id].includes(filterEntry))
					)
		).forEach(bead => {
			let container = document.createElement('div');
			container.id = bead.i;

			let label = document.createElement('label');
			label.innerHTML = bead.i;

			let cart = document.createElement('img');
			cart.addEventListener('click', () => alert('not yet implemented'));
			cart.src = 'public/icons/shopping-cart.svg';

			let img = document.createElement('img');
			img.loading = 'lazy';
			img.src = 'public/thumbnails/' + bead.i + '.jpg';
			img.addEventListener('click', () => this.handleThumbnailClick(bead.i));

			container.append(label);
			container.append(cart);
			container.append(img);

			thumbnailContainer.append(container);
		});
	}

	/**
	 * Handles addition of a filter and removal of one or all filters. If called without parameters, reset all filters
	 *
	 * @param {number}   filterIndex    filter category index
	 * @param {number}   entryIndex     entry index in the filter category
	 */
	handleFilterChange(filterIndex, entryIndex) {
		this.updateSelectedFilters(filterIndex, entryIndex);
		let isOneFilterSelected = this.renderSelectedFilters();
		this.shiftThumbnailPanel(isOneFilterSelected);
		this.renderBeadThumbails();
	}

	/**
	 * Update the selected filters. If called without parameters, reset all filters
	 *
	 * @param {number}   filterIndex    filter category index
	 * @param {number}   entryIndex     entry index in the filter category
	 */
	updateSelectedFilters(filterIndex, entryIndex) {
		if (!filterIndex && !entryIndex) {
			this.selectedFilters.forEach(filter => (filter.entries = []));
		} else {
			if (this.selectedFilters[filterIndex].entries.includes(entryIndex)) {
				this.selectedFilters[filterIndex].entries.splice(
					this.selectedFilters[filterIndex].entries.indexOf(entryIndex),
					1
				);
			} else {
				this.selectedFilters[filterIndex].entries.push(entryIndex);
			}
		}
	}

	/**
	 * Renders the selected filters
	 */
	renderSelectedFilters() {
		let selectedFilters = document.getElementById('selected-filters');
		selectedFilters.innerHTML = '';

		let isOneFilterSelected = false;

		this.selectedFilters.forEach((myFilter, index) => {
			if (myFilter.entries.length) {
				isOneFilterSelected = true;
				let selectedFilters = document.getElementById('selected-filters');

				myFilter.entries.sort().forEach(filterEntry => {
					let span = document.createElement('span');
					span.innerHTML = this.filters[index].entries[filterEntry];
					span.setAttribute(
						'onclick',
						'beadPanel.handleDeleteFilter(' + index + ', ' + filterEntry + ')'
					);
					selectedFilters.append(span);
				});
			}
		});

		if(isOneFilterSelected) {
			let span = document.createElement('span');
			span.innerHTML = 'raz';
			span.setAttribute('onclick', 'beadPanel.handleDeleteAllFilters()');
			document.getElementById('selected-filters').prepend(span);
		}

		return isOneFilterSelected;
	}

	/**
	 * Shift thumbail panel below the selected filters
	 */
	shiftThumbnailPanel(isOneFilterSelected) {
		if (isOneFilterSelected) {
			removeClassname(selectedFilters, 'filters-no-filter');
			addClassname(selectedFilters, 'filters-filter');
			removeClassname(document.getElementById('thumbnails'), 'thumbnails-no-filter');
			addClassname(document.getElementById('thumbnails'), 'thumbnails-filter');
		} else {
			addClassname(selectedFilters, 'filters-no-filter');
			removeClassname(selectedFilters, 'filters-filter');
			addClassname(document.getElementById('thumbnails'), 'thumbnails-no-filter');
			removeClassname(document.getElementById('thumbnails'), 'thumbnails-filter');
		}
	}

	/**
	 * Update and rerenders the selected filters
	 *
	 * @param {number}   filterIndex    filter category index
	 * @param {number}   entryIndex     entry index in the filter category
	 */
	handleDeleteFilter(filterIndex, entryIndex) {
		this.handleFilterChange(filterIndex, entryIndex);
		this.renderFilters();
	}

	/**
	 * delete and rerenders the available filters
	 */
	handleDeleteAllFilters() {
		this.handleFilterChange();
		this.renderFilters();
	}

	/**
	 * Focuses a bead thumbnail and selects it as the brush color
	 * 
	 * @param {string}   beadIndex    bead index
	 */
	handleThumbnailClick(beadIndex) {
		if (this.bigBead === beadIndex) {
			removeClassname(document.getElementById(this.bigBead), 'thumbnail-focus');
			this.bigBead = undefined;
			// TODO put DBxxxx in inputColor
		}
		if (this.bigBead) {
			removeClassname(document.getElementById(this.bigBead), 'thumbnail-focus');
		}
		this.bigBead = beadIndex;
		addClassname(document.getElementById(beadIndex), 'thumbnail-focus');
	}

	/**
	 * handles panel height change
	 */
	handlePanelHeightChange() {
		if (this.isHigh) {
			document
				.getElementById('bead-collection')
				.style.setProperty('--collection-height', '200px');
			removeClassname(document.getElementById('color-picker-higher'), 'color-picker-lower');
			this.isHigh = false;
		} else {
			document
				.getElementById('bead-collection')
				.style.setProperty('--collection-height', 'calc(100vh - 100px)');
			addClassname(document.getElementById('color-picker-higher'), 'color-picker-lower');
			this.isHigh = true;
		}
	}
}

const beadPanel = new BeadPanel();
