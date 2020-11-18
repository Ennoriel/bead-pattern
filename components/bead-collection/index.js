class BeadCollection {

	constructor() {
		this.loadFilters();
		this.loadBeads();
		this.filters = []
	}

	loadFilters() {

		fetch('./public/filters.json')
			.then(response => response.json())
			.then(filters => {
				let beadFilters = document.getElementById('bead-filters')

				filters.forEach((filter, filterIndex) => {

					this.filters.push({id: filter.id, entries: []})

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
			return this.filters.filter(filter => filter.entries.length)
							.every(filter => typeof bead[filter.id] === "number" ? 
											filter.entries.length === 1 && filter.entries.includes(bead[filter.id]) :
											filter.entries.every(filterEntry => bead[filter.id].includes(filterEntry) )
							)
		})

		let beadThumbnails = document.getElementById('bead-thumbnails');
		beadThumbnails.innerHTML = "";

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

			beadThumbnails.append(container);
		})
	}

	handleFilter(filterIndex, entryIndex) {

		// console.log(filter);
		// console.log(filterIndex);

		if (this.filters[filterIndex].entries.includes(entryIndex)) {
			this.filters[filterIndex].entries.splice(this.filters[filterIndex].entries.indexOf(entryIndex), 1);
		} else {
			this.filters[filterIndex].entries.push(entryIndex)
		}
		console.log(this.filters)
		// if (this.filters[filter].includes(filterIndex)) {
		// 	this.filters[filter].splice(this.filters[filter].indexOf(filterIndex), 1);
		// } else {
		// 	this.filters[filter].push(filterIndex);
		// }
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