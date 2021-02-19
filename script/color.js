class Color {
  computeBeadStyle(dominantColor, lightestColor) {
    let rotation = tissage === TISSAGE.PEYOTE_V ? '': '0.25turn,'
    return `background: linear-gradient(${rotation}${lightestColor},${dominantColor},${lightestColor});`
  }

  /**
   * return a new instance of DbColor or HexColor
   * @param {String} stringColor string color, either #abcdef or DB1234 
   */
  static newInstance(stringColor) {
    if (stringColor.startsWith('DB')) {
      return beadCollection.filter(bead => bead.index === stringColor)[0]
    } else {
      return new HexColor(stringColor)
    }
  }

  /**
   * Inits the color bead variable
   */
  static initBeadCollection() {
    return fetch('./public/beads.json')
          .then(response => response.json())
          .then(beads => beads.map(bead => new DbColor(bead)))
          .then(beads => beadCollection = beads)
  }
}

class HexColor extends Color {
  constructor(hex) {
    super()
    this.hex = hex
  }

  get inputValue() {
    return this.hex
  }

  get inputColor() {
    return this.hex
  }

  computeBeadStyle() {
    return super.computeBeadStyle(this.hex, `${this.hex}bb`)
  }
}

class DbColor extends Color {
  constructor(dbBead) {
    super()

    // index
    this.index = dbBead.i

    // affiliate link
    this.h = dbBead.h

    // categories used for filtering
    this.c = dbBead.c
    this.g = dbBead.g
    this.f = dbBead.f
    this.d = dbBead.d
    this.z = dbBead.z
    this.p = dbBead.p

    // corresponding color
    this.dominantColor = dbBead.o
    this.lightestColor = dbBead.m
  }

  get inputValue() {
    return this.index
  }

  get inputColor() {
    return this.dominantColor
  }

  computeBeadStyle() {
    return super.computeBeadStyle(this.dominantColor, this.lightestColor)
  }
}