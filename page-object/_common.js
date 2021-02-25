module.exports = {
    //helper for specifing xpath selector
    xpathSelector: function(selector) {
        return {
            selector: selector,
            locateStrategy: 'xpath'
        }
    },
    //css helper just to be consistent
    cssSelector: function(selector) {
        return {
            selector: selector,
            locateStrategy: 'css'
        }
    }
};
