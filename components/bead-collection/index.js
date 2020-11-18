class BeadCollection {

	constructor() {
		this.loadFilters();
		this.loadBeads();
		this.myFilters = []
	}

	loadFilters() {

		fetch('./public/filters.json')
			.then(response => response.json())
			.then(filters => {

				this.filters = filters

				let beadFilters = document.getElementById('bead-filters')

				filters.forEach((filter, filterIndex) => {

					this.myFilters.push({id: filter.id, entries: []})

					let title = document.createElement('h1');
					title.innerHTML = filter.label

					beadFilters.append(title)

					filter.entries.forEach((filterEntry, entryIndex) => {
						let input = document.createElement('input');
						input.type = "checkbox";
						input.setAttribute('onClick', "beadCollection.handleFilter('" + filterIndex + "'," + entryIndex + ")")

						let label = document.createElement('label');
						label.innerHTML = filterEntry;

						beadFilters.append(input)
						beadFilters.append(label)
					});
				})
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
			container.addEventListener('click', () => this.handleSelect(bead.i))

			let label = document.createElement('label');
			label.innerHTML = bead.i;

			let img = document.createElement('img');
			img.loading = 'lazy'
			img.src = 'public/thumbnails/' + bead.i + '.jpg';

			container.append(label);
			container.append(img);

			document.getElementById('thumbnails').append(container);
		})
	}

	handleFilter(filterIndex, entryIndex) {

		if (this.myFilters[filterIndex].entries.includes(entryIndex)) {
			this.myFilters[filterIndex].entries.splice(this.myFilters[filterIndex].entries.indexOf(entryIndex), 1);
		} else {
			this.myFilters[filterIndex].entries.push(entryIndex)
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
					myFilters.append(span)
				})

			}
		})
		if(isOneFilterSelected) {
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
}

const beadCollection = new BeadCollection();