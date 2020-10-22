document.addEventListener('keydown', function(event) {
    if(!factory.bracelet.aEteGenere && event.keyCode == 13) {
        bracelets.get('bracelet').generateTrame();
    }
});

document.addEventListener('mousedown', function(event) {
    if(factory.bracelet.aEteGenere && event.button == 0) {
        leftClickPressed = true;
        handleBeadClick(event.target)?.handleBeadMouseOver(event.target);
    }
    if(factory.bracelet.aEteGenere && event.button == 2) {
        rightClickPressed = true;
        handleBeadClick(event.target)?.handleBeadMouseOver(event.target);
    }
});

document.addEventListener('mouseup', function(event) {
    if(factory.bracelet.aEteGenere && event.button == 0) {
        leftClickPressed = false;
    }
    if(factory.bracelet.aEteGenere && event.button == 2) {
        rightClickPressed = false;
    }
});


function handleBeadClick(element) {
    if(element?.getAttribute('class')?.split(' ').includes('bead') &&
                !element.getAttribute('class')?.split(' ').includes('action-bead')) {
        return getTrameAttachedToBead(element);
    }
    return null;
}

function getTrameAttachedToBead(element) {
    if(!(element instanceof HTMLDocument)) {
        bracelet = factory.getAssociatedTrame(element.getAttribute('id'));
        return !!bracelet ? bracelet : getTrameAttachedToBead(element.parentNode);
    }
}

document.addEventListener('mouseover', handleBeadMouseLeave());

function handleBeadMouseLeave() {
    let isPreviousElementABead = false;
    return function(event) {
        if(!isFocusDisplay) {
            if(isPreviousElementABead) {
                if(!event.target.getAttribute('class')?.split(' ').includes('color-bead')) {
                    let trameAttachedToBead = getTrameAttachedToBead(event.target);
                    trameAttachedToBead?.generateBraceletCaneva();
                    trameAttachedToBead?.initPerlesPeintesTabCurrentPreview();
                    isPreviousElementABead = false;
                }
            } else if(event.target.getAttribute('class')?.split(' ').includes('color-bead')) {
                isPreviousElementABead = true;
            }
        }
    }
}