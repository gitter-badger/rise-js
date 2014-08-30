(function(global) {
    /**
     * Current version of Rise
     * @type {String}
     * @private
     */
    var VERSION = '0.0.1';

    /**
     * Rise constuctor
     * @constructor
     */
    function Rise() {
        return this;
    }

    Rise.prototype = Object.create({});

    /**
     * Get current version
     * @static
     * @return {String} Returns current version
     */
    Rise.getVersion = function() {
        return VERSION;
    };

    global.Rise = Rise;

})(this);