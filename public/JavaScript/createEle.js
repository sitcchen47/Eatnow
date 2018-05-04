function createEle(html) {
    var divDom = document.createElement('div');
    divDom.innerHTML = html;
    return divDom.firstElementChild;
}

if (typeof window === 'undefined') {
    module.exports = createEle;
} 