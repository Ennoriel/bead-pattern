/**
 * Bead selector panel component
 */
class BeadPanel {

	constructor(callback) {
		this.clickCallback = callback

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
		await fetch(`./public/filters-${language}.json`)
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

			filter.entries.
			// map() and sort() used to sort filters according to the language but keep the default indexes (english order)
				map((filterEntry, entryIndex) => ({filterEntry, entryIndex}))
				.sort((a, b) => a.filterEntry.localeCompare(b.filterEntry))
				.forEach(entry => {

				let filterEntry = entry.filterEntry
				let entryIndex = entry.entryIndex

				let input = document.createElement('input');
				input.type = 'checkbox';
				input.addEventListener('click', () => this.handleFilterChange(filterIndex, entryIndex));
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
		this.renderBeadThumbails();
	}

	/**
	 * Renders the bead thumbnails
	 */
	renderBeadThumbails() {
		const thumbnailContainer = document.getElementById('thumbnails');
		thumbnailContainer.innerHTML = '';

		beadCollection.filter(bead => 
			this.selectedFilters.filter(filter => filter.entries.length)
					.every(filter =>
						typeof bead[filter.id] === 'number'
							? filter.entries.length === 1 && filter.entries.includes(bead[filter.id])
							: filter.entries.every(filterEntry => bead[filter.id].includes(filterEntry))
					)
		).forEach(bead => {
			let container = document.createElement('div');
			container.id = bead.index;
			if (this.selectedBead && this.selectedBead.index === bead.index) addClassname(container, 'thumbnail-focus')

			let label = document.createElement('label');
			label.innerHTML = bead.index;

			let cartA = document.createElement('a')
			if (bead.h) cartA.href = `${PERLES_AND_CO}/${bead.h}?${AFFILIATE_PARAM}`
			cartA.target = "_blank"

			let cart = document.createElement('img');
			
			cart.src = bead.h ? 'public/icons/shopping-cart.svg' : 'public/icons/cart-unavailable.svg';

			cartA.append(cart)

			let img = document.createElement('img');
			img.loading = 'lazy';
			img.src = 'public/thumbnails/' + bead.index + '.jpg';
			img.addEventListener('click', () => this.handleThumbnailClick(bead));

			container.append(label);
			container.append(cartA);
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
		if (filterIndex === undefined && entryIndex === undefined) {
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
					span.addEventListener('click', () => this.handleDeleteFilter(index, filterEntry));
					selectedFilters.append(span);
				});
			}
		});

		if(isOneFilterSelected) {
			let span = document.createElement('span');
			span.innerHTML = 'raz';
			span.addEventListener('click', () => this.handleDeleteAllFilters());
			document.getElementById('selected-filters').prepend(span);
		}

		return isOneFilterSelected;
	}

	/**
	 * Shift thumbail panel below the selected filters
	 */
	shiftThumbnailPanel(isOneFilterSelected) {
		let selectedFilters = document.getElementById('selected-filters');
		
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
	 * Focuses a bead thumbnail and adds propagate the event
	 * 
	 * @param {DbColor}   bead    bead
	 */
	handleThumbnailClick(bead) {
		this.setBead(bead);
		this.clickCallback(bead);
	}

	setBead(bead) {
		if (this.selectedBead) {
			let element = document.getElementById(this.selectedBead.index)
			if (element) removeClassname(element, 'thumbnail-focus');
		}
		if (!bead) return;
		this.selectedBead = bead;
		addClassname(document.getElementById(bead.index), 'thumbnail-focus');
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

colorPicker.handleBeadCollectionLoad()
