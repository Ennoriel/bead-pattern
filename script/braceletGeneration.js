class Trame {

    constructor(htmlIdHook, varName) {
        this.htmlIdHook = htmlIdHook;
        this.varName = 'factory.' + varName;
    }
    
    initPerlesPeintes(perlesPeintesString = null) {
        this.perlesPeintesTab = [];
        if (perlesPeintesString) {
            const width = this.dimension.width;
            for (let iCol = 0; iCol < this.dimension.length; iCol++) {
                this.perlesPeintesTab.push(perlesPeintesString.substring(width * iCol, width * (iCol + 1)).split('').map(color => color.replace(' ', '')));
            }
        } else {
            for (let iCol = 0; iCol < this.dimension.length; iCol++) {
                this.perlesPeintesTab.push(this.initColPerlesPeintes());
            }
        }
    }

    initPerlesPeintesTabCurrentPreview (){
        this.perlesPeintesTabCurrentPreview = this.perlesPeintesTab.map( col => col.slice() );
    }

    initColPerlesPeintes() {
        var row = []
        for(let iRow = 0; iRow < this.dimension.width; iRow++) {
            row.push('');
        }
        return row;
    }

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

    generateBeadCols() {
        this.perlesPeintesTab.forEach((col, iCol) => {
            this.generateColCaneva(col, iCol);
        });
        this.generateLastInsertColBead(this.dimension.length);
    }

    generateColCaneva(col, iCol) {
        // container
        let braceletColContainer = document.createElement('div');
        braceletColContainer.setAttribute('class', 'col');
        braceletColContainer.setAttribute('col-nb', iCol);
        braceletColContainer.setAttribute('id', this.htmlIdHook + '-col-' + iCol);

        // delete bead
        let deleteColBead = generateDeleteBead();
        addClassname(deleteColBead, 'top-delete-bead');
        deleteColBead.setAttribute("onclick", this.objectHook() + 'deleteCol(this.parentElement.getAttribute("col-nb"))');
        braceletColContainer.appendChild(deleteColBead);
        
        // insert bead
        let insertColBead = generateInsertBead();
        addClassname(insertColBead, 'top-insert-bead');
        insertColBead.setAttribute("onclick", this.objectHook() + 'addCol(this.parentElement.getAttribute("col-nb"))');
        braceletColContainer.appendChild(insertColBead);

        col.forEach((lettreCouleur, iRow) => {
            braceletColContainer.appendChild(this.generateBead(iCol, iRow, lettreCouleur));
        });

        document.getElementById(this.htmlIdHook).appendChild(braceletColContainer);
    }

    generateLastInsertColBead(iCol) {
        let braceletColContainer = document.createElement('div');
        braceletColContainer.setAttribute('class', 'col');
        braceletColContainer.setAttribute('col-nb', iCol);
        // braceletColContainer.setAttribute('id', this.htmlIdHook + '-col-' + (iCol));

        // delete bead
        let deleteColBead = generateDeleteBead();
        addClassname(deleteColBead, 'top-delete-bead');
        deleteColBead.setAttribute("style", "visibility: hidden;");
        braceletColContainer.appendChild(deleteColBead);
        
        // insert bead
        let insertColBead = generateInsertBead();
        addClassname(insertColBead, 'top-insert-bead');
        insertColBead.setAttribute("onclick", this.objectHook() + 'addCol(this.parentElement.getAttribute("col-nb"))');
        braceletColContainer.appendChild(insertColBead);

        document.getElementById(this.htmlIdHook).appendChild(braceletColContainer);
    }

    generateBead(iCol, iRow, lettreCouleur) {

        let perle = document.createElement("div");
        perle.setAttribute('class', 'color-bead bead')
        if(tissage === TISSAGE.PEYOTE) {
            addClassname(perle, 'bead-peyote')
        } else if(tissage === TISSAGE.PEYOTE_V) {
            addClassname(perle, 'bead-peyote-v')
        }
        perle.setAttribute('id', this.getBeadHtmlId(iCol, iRow));
        perle.setAttribute("col-nb", iCol);
        perle.setAttribute("row-nb", iRow);
        addBeadStyle(perle, lettreCouleur);
        perle.setAttribute("oncontextmenu", "return false;");
        perle.setAttribute('onmouseover', this.objectHook() + 'handleBeadMouseOver(this)');
        return perle;
    }

    addCol(iCol) {
        this.perlesPeintesTab.splice(iCol, 0, this.initColPerlesPeintes());
        this.dimension.length++;
        this.initPerlesPeintesTabCurrentPreview();
        this.generateBraceletCaneva();
    }

    deleteCol(iCol) {
        this.perlesPeintesTab.splice(iCol, 1);
        this.dimension.length--;
        this.initPerlesPeintesTabCurrentPreview();
        this.generateBraceletCaneva();
    }

    addRow(iRow) {
        this.perlesPeintesTab.forEach((col) => {
            col.splice(iRow, 0, '');
        });
        this.dimension.width++;
        this.initPerlesPeintesTabCurrentPreview();
        this.generateBraceletCaneva();
    }

    deleteRow(iRow) {
        this.perlesPeintesTab.forEach((col) => {
            col.splice(iRow, 1);
        });
        this.dimension.width--;
        this.initPerlesPeintesTabCurrentPreview();
        this.generateBraceletCaneva();
    }

    handleColorChange(colorKey) {
        for(let iCol = 0; iCol < this.dimension.length; iCol++) {
            for(let iRow = 0; iRow < this.dimension.width; iRow++) {
                if(this.perlesPeintesTab[iCol][iRow] === colorKey) {
                    addBeadStyle(document.getElementById(this.getBeadHtmlId(iCol, iRow)), colorKey);
                }
            }
        }
    }
    
    handleBeadMouseOver(perle) {
        if(!isFocusDisplay) {
            if (leftClickPressed && pinceau !== undefined) {
                if(pinceau.includes('pattern-')) {
                    this.copyPatternToTab(perle);
                    this.generateBraceletCaneva();
                } else {
                    perle.value = pinceau;
                    this.handlePerle(perle);
                }
            } else if (rightClickPressed) {
                perle.value = '';
                this.handlePerle(perle);
            } else /* no click */ {
                if(pinceau.includes('pattern-')) {
                    this.computeAndRenderPreview(perle);
                }
            }
        }
    }

    copyPatternToTab(perle, preview = false) {
        let patternNb = parseInt(pinceau.charAt(8));
        let iRowBegin = parseInt(perle.getAttribute('row-nb'));
        let iRowEnd = Math.min(
                    iRowBegin + factory.patterns[patternNb].dimension.width,
                    this.dimension.width);
        let iColBegin = parseInt(perle.getAttribute('col-nb'));
        let iColEnd = Math.min(
                    iColBegin + factory.patterns[patternNb].dimension.length,
                    this.dimension.length);
        if(tissage === TISSAGE.DROIT || tissage === TISSAGE.PEYOTE) {
            for(let iRow = iRowBegin; iRow < iRowEnd; iRow++) {
                // extra col used for proper peyote pattern rendering
                // when the pattern is applied to odd rows
                let extraCol = (tissage === TISSAGE.PEYOTE && (iRowBegin % 2 === 1) && (iRow % 2 === 0)) ? 1 : 0;
                for(let iCol = iColBegin; iCol < iColEnd - extraCol; iCol++) {

                    let patternColorKey = factory.patterns[patternNb].perlesPeintesTab[iCol - iColBegin][iRow - iRowBegin];
                    if (patternColorKey !== '') {
                        if(preview) {
                            this.perlesPeintesTabFuturePreview[iCol + extraCol][iRow] = patternColorKey;
                        } else {
                            this.initPerlesPeintesTabCurrentPreview();
                            this.perlesPeintesTab[iCol + extraCol][iRow] = patternColorKey;
                        }
                    }
                }
            }
        } else {
            for(let iCol = iColBegin; iCol < iColEnd; iCol++) {

                // extra row used for proper vertical peyote pattern rendering
                // when the pattern is applied to odd rows
                let extraRow = (tissage === TISSAGE.PEYOTE_V && (iColBegin % 2 === 1) && (iCol % 2 === 0)) ? 1 : 0;

                for(let iRow = iRowBegin; iRow < iRowEnd - extraRow; iRow++) {
                    let patternColorKey = factory.patterns[patternNb].perlesPeintesTab[iCol - iColBegin][iRow - iRowBegin];
                    if (patternColorKey !== '') {
                        if(preview) {
                            this.perlesPeintesTabFuturePreview[iCol][iRow + extraRow] = patternColorKey;
                        } else {
                            this.initPerlesPeintesTabCurrentPreview();
                            this.perlesPeintesTab[iCol][iRow + extraRow] = patternColorKey;
                        }
                    }
                }
            }
        }
    }

    computeAndRenderPreview(perle) {
        this.perlesPeintesTabFuturePreview = this.perlesPeintesTab.map( col => col.slice() );
        this.copyPatternToTab(perle, {preview: true})
        this.renderPreview();
    }

    renderPreview() {
        for(let iCol = 0; iCol < this.dimension.length; iCol++) {
            for(let iRow = 0; iRow < this.dimension.width; iRow++) {
                let currentColor = this.perlesPeintesTab[iCol][iRow];
                let currentPreviewColor = this.perlesPeintesTabCurrentPreview[iCol][iRow];
                let futurePreviewColor = this.perlesPeintesTabFuturePreview[iCol][iRow];
                if(currentPreviewColor !== futurePreviewColor) {
                    let perle = document.getElementById(this.getBeadHtmlId(iCol, iRow));
                    if(futurePreviewColor !== '') {
                        addBeadStyle(perle, futurePreviewColor);
                    } else if(currentColor !== '') {
                        addBeadStyle(perle, currentColor);
                    } else {
                        perle.removeAttribute("style");
                    }
                }
            }
        }
        this.perlesPeintesTabCurrentPreview = this.perlesPeintesTabFuturePreview.map( col => col.slice() );
    }
    
    handlePerle(perle) {
        let colNb = parseInt(perle.getAttribute('col-nb'));
        let rowNb = parseInt(perle.getAttribute('row-nb'));
        if(perle.value == '') {
            perle.removeAttribute('style');
            this.perlesPeintesTab[colNb][rowNb] = '';
        } else {
            var couleur = colors.get(perle.value);
            if(couleur) {
                addBeadStyle(perle, perle.value);
                this.perlesPeintesTab[colNb][rowNb] = perle.value;
            }
        }
    }

    getBeadHtmlId(col, row) {
        return this.htmlIdHook + '-' + col + '-' + row;
    }

    export() {
        let res = this.dimension.export();
        res += this.perlesPeintesTab.map(col => col.map(bead => bead === '' ? ' ' : bead).join('')).join('');
        return res;
    }

    focusDisplay() {
        for(let iCol = 0; iCol < this.dimension.length; iCol++) {
            for(let iRow = 0; iRow < this.dimension.width; iRow++) {
                if(!!!this.perlesPeintesTab[iCol][iRow]) {
                    addClassname(document.getElementById(this.getBeadHtmlId(iCol, iRow)), 'bead-no-border');
                }
            }
            if (this.perlesPeintesTab[iCol].every(bead => bead === '')) {
                document.getElementById(this.htmlIdHook + '-col-' + iCol).setAttribute('hidden', 'true');
            }
        }
    }

    unfocusDisplay() {
        let colorBeads = document.getElementsByClassName('color-bead');
        Array.prototype.filter.call(colorBeads, function(colorBead) {
            removeClassname(colorBead, 'bead-no-border');
        });
        let cols = document.getElementsByClassName('col');
        Array.prototype.filter.call(cols, function(col) {
            col.removeAttribute('hidden');
        });
    }

    countBeadQuantity() {
        let beadQty = new Map();
        Array.from(colors.keys()).forEach(color => beadQty.set(color, 0));
        for(let iCol = 0; iCol < this.dimension.length; iCol++) {
            for(let iRow = 0; iRow < this.dimension.width; iRow++) {
                let beadColor = this.perlesPeintesTab[iCol][iRow];
                if(!!beadColor) {
                    beadQty.set(beadColor, beadQty.get(beadColor) + 1);
                }
            }
        }
        return beadQty;
    }
}

class Bracelet extends Trame {
    constructor() {
        super('bracelet', 'bracelet');
        this.containerHtmlIdHook = 'bracelet-container';

        this.aEteGenere = false;
    }

    objectHook() {
        return this.varName + '.'
    }
    
    generateTrame(dimension, newColors, perlesPeintesString) {

        if(this.aEteGenere && !confirm('Etes-vous sûr de vouloir regénérer la trame du bracelet ?')) {
            return;
        }

        initTissage();

        factory.removeAllPatterns();

        this.aEteGenere = true;

        this.dimension = dimension;
        
        this.initColors(newColors);

        this.initPerlesPeintes(perlesPeintesString);
        this.generateBraceletCaneva();

        this.initPerlesPeintesTabCurrentPreview();
    }

    initColors(newColors) {
        resetColor();
        if(newColors) {
            newColors.forEach(color => addColor(color));
        } else {
            addColor();
        }
    }

    generateBraceletCaneva() {
        this.generateContainer();
        this.generateDeleteCol();
        this.generateInsertCol();
        this.generateBeadCols();
    }

    generateContainer() {
        
        document.getElementById(this.containerHtmlIdHook).innerHTML = "";
        let flexContainer = document.createElement('div');
        flexContainer.setAttribute('class', 'caneva-container-flex');
        flexContainer.setAttribute('id', this.htmlIdHook);

        document.getElementById(this.containerHtmlIdHook).appendChild(flexContainer);

    }

    export() {
        return tissage + '-' + super.export();;
    }
}

class Pattern extends Trame {
    constructor(patternNb) {
        super('pattern-' + patternNb, 'patterns');
        this.patternNb = patternNb;
        this.containerHtmlIdHook = 'patterns-container';

        this.aEteGenere = false;
    }

    objectHook() {
        return this.varName + '[' + this.patternNb + '].'
    }

    generatePatternSpanContainer() {
        let patternSpan = document.createElement('span');
        patternSpan.setAttribute('id', this.htmlIdHook);

        document.getElementById('patterns-container').appendChild(patternSpan);
    }
    
    generateTrame(dimension, perlesPeintesString) {

        this.dimension = dimension;

        if (this.aEteGenere) {
            document.getElementById(this.htmlIdHook).innerHTML = "";
        }

        this.initPerlesPeintes(perlesPeintesString);
        this.generateBraceletCaneva();
        this.generateRadioPinceau();    

        this.initPerlesPeintesTabCurrentPreview();

        this.aEteGenere = true;
    }

    generateBraceletCaneva() {
        this.generateContainer();
        this.generateDeleteCol();
        this.generateInsertCol();
        this.generateBeadCols();
    }

    generateContainer() {
        
        if(this.aEteGenere) {
            document.getElementById(this.htmlIdHook).innerHTML = "";
            if(pinceau === 'pinceau-' + this.patternNb) {
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

    generateRadioPinceau() {
        let radioInput = generateRadioInput(this.htmlIdHook);
        document.getElementById(this.htmlIdHook + '-sub').appendChild(radioInput);
    }
}
