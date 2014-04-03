module.exports = (function () {
    "use strict";
    var _chunks = function (array, size) {
        var results = [];
        if (array && array.length) {
            while (array.length) {
                results.push(array.splice(0, size));
            }
        }
        return results;
    };
    
    return {
        chunks: _chunks
    };
}());