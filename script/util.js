function addClassname(element, classname) {
    if (!element.getAttribute('class').split(' ').includes(classname))
        element.setAttribute('class', element.getAttribute('class') + ' ' + classname)
}

function removeClassname(element, classname) {
    actualClasses = element.getAttribute('class');
    if (!actualClasses) {
        return;
    } else if (classname === actualClasses.trim()) {
        element.removeAttribute('class');
    } else if (actualClasses.split(' ').includes(classname)) {
        element.setAttribute('class', actualClasses.split(' ').filter(actualClass => actualClass !== classname).join(' '))
    }
}

function isDark(color) {
    color = '0x' + color.substring(1, 7);
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    return hsp < 127.5
}

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) { // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { // Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
