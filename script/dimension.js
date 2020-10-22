class Dimension {

    constructor(width, length = width) {
        this.width = parseInt(width);
        this.length = parseInt(length);
    }

    addCol() {
        this.length++;
    }

    addRow() {
        this.width--;
    }

    export() {
        return this.width + '-' + this.length + '-';
    }
}