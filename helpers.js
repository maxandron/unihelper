function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function sanitizeNumber(num) {
    /* Turns a number from its shortened form (e.g. $412.34m) into a full
     * integer
     */
    num = num.replace("$", "");

    switch (num[num.length - 1]) {
        case "b":
            num = parseInt(num.slice(0, -1)) * Math.pow(10, 9);
            break;
        case "m":
            num = parseInt(num.slice(0, -1)) * Math.pow(10, 6);
            break;
        case "k":
            num = parseInt(num.slice(0, -1)) * Math.pow(10, 3);
            break;
        default:
            num = parseInt(num);
    }
    return num;
}

function div(classname) {
    return "div." + classname;
}
