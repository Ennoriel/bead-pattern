class BeadCollection {

	constructor() {
		this.initFilters();
		this.loadBeads();

		document.getElementById('bead-collection').style.setProperty("--collection-height", "200px");
	}

	async initFilters() {
		this.myFilters = []
		await fetch('./public/filters.json')
			.then(response => response.json())
			.then(filters => {
				this.filters = filters
				filters.forEach(filter => {
					this.myFilters.push({id: filter.id, entries: []})
				})
				this.loadFilters()
			})
	}

	loadFilters() {

		let beadFilters = document.getElementById('bead-filters')
		beadFilters.innerHTML = "";

		this.filters.forEach((filter, filterIndex) => {

			let title = document.createElement('h1');
			title.innerHTML = filter.label

			beadFilters.append(title)

			filter.entries.forEach((filterEntry, entryIndex) => {
				let input = document.createElement('input');
				input.type = "checkbox";
				input.setAttribute('onClick', "beadCollection.handleFilter(" + filterIndex + "," + entryIndex + ")")
				if (this.myFilters[filterIndex].entries.includes(entryIndex)) {
					input.checked = true
				}

				let label = document.createElement('label');
				label.innerHTML = filterEntry;

				beadFilters.append(input)
				beadFilters.append(label)
			});
		});
	}

	async loadBeads() {

		if (!this.beads) {
			this.beads = await fetch('./public/beads.json')
			.then(response => response.json());
		}

		let beadsToLoad = this.beads.filter(bead => {
			return this.myFilters.filter(filter => filter.entries.length)
							.every(filter => typeof bead[filter.id] === "number" ? 
											filter.entries.length === 1 && filter.entries.includes(bead[filter.id]) :
											filter.entries.every(filterEntry => bead[filter.id].includes(filterEntry) )
							)
		})

		document.getElementById('thumbnails').innerHTML = "";

		beadsToLoad.forEach(bead => {
			let container = document.createElement('div');
			container.id = bead.i

			let label = document.createElement('label');
			label.innerHTML = bead.i;

			let cart = document.createElement('img');
			cart.addEventListener('click', () => 	alert('not yet implemented'))
			cart.src = 'public/icons/shopping-cart.svg'

			let img = document.createElement('img');
			img.loading = 'lazy'
			img.src = 'public/thumbnails/' + bead.i + '.jpg';
			img.addEventListener('click', () => this.handleSelect(bead.i))

			container.append(label);
			container.append(cart)
			container.append(img);

			document.getElementById('thumbnails').append(container);
		})
	}

	handleFilter(filterIndex, entryIndex) {

		if(!filterIndex && !entryIndex) {
			this.myFilters.forEach(filter => filter.entries = []);
		} else {
			if (this.myFilters[filterIndex].entries.includes(entryIndex)) {
				this.myFilters[filterIndex].entries.splice(this.myFilters[filterIndex].entries.indexOf(entryIndex), 1);
			} else {
				this.myFilters[filterIndex].entries.push(entryIndex)
			}
		}
		
		let myFilters = document.getElementById('my-filters');
		myFilters.innerHTML = '';
		
		let isOneFilterSelected = false;
		
		this.myFilters.forEach((myFilter, index) => {
			if(myFilter.entries.length) {
				isOneFilterSelected = true;
				let myFilters = document.getElementById('my-filters');

				myFilter.entries.sort().forEach(filterEntry => {
					let span = document.createElement('span')
					span.innerHTML = this.filters[index].entries[filterEntry]
					span.setAttribute('onclick', 'beadCollection.handleDeleteFilter(' + index + ', ' + filterEntry + ')')
					myFilters.append(span)
				})

			}
		})
		if(isOneFilterSelected) {
			let span = document.createElement('span')
			span.innerHTML = 'raz'
			span.setAttribute('onclick', 'beadCollection.handleDeleteAllFilters()')
			document.getElementById('my-filters').prepend(span)

			removeClassname(myFilters, 'filters-no-filter')
			addClassname(myFilters, 'filters-filter')
			removeClassname(document.getElementById('thumbnails'), 'thumbnails-no-filter')
			addClassname(document.getElementById('thumbnails'), 'thumbnails-filter')
		} else {
			addClassname(myFilters, 'filters-no-filter')
			removeClassname(myFilters, 'filters-filter')
			addClassname(document.getElementById('thumbnails'), 'thumbnails-no-filter')
			removeClassname(document.getElementById('thumbnails'), 'thumbnails-filter')
		}

		this.loadBeads();
	}

	handleDeleteFilter(filterIndex, entryIndex) {
		this.handleFilter(filterIndex, entryIndex);
		this.loadFilters();
	}

	handleDeleteAllFilters() {
		this.handleFilter();
		this.loadFilters();
	}

	handleSelect(beadIndex) {
		if(this.bigBead === beadIndex) {
			removeClassname(document.getElementById(this.bigBead), 'big')
			this.bigBead = undefined
			// put DB... in inputColor
		}
		if(this.bigBead) {
			removeClassname(document.getElementById(this.bigBead), 'big')
		}
		this.bigBead = beadIndex
		addClassname(document.getElementById(beadIndex), 'big')
	}

	increaseSize() {
		
		if(this.isHigh) {
			document.getElementById('bead-collection').style.setProperty("--collection-height", "200px");
			removeClassname(document.getElementById('color-picker-higher'), 'color-picker-lower');
			this.isHigh = false
		} else {
			document.getElementById('bead-collection').style.setProperty("--collection-height", "calc(100vh - 100px)");
			addClassname(document.getElementById('color-picker-higher'), 'color-picker-lower');
			this.isHigh = true
		}
	}
}

const beadCollection = new BeadCollection();