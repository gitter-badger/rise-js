(function(global) {
    /**
     * Current version of Rise
     * @type {String}
     * @private
     */
    var VERSION = '0.0.2-alpha';

    /**
     * Rise constuctor
     * @constructor
     */
    function Rise(selector, config) {
        selector = selector || '#rise';
        config = config || {};

        if (Rise.Util.isString(selector)) {
            var node = Rise.$(selector);

            return new Rise(node.get(0), config);
        } else if (selector instanceof Element) {
            this.parentNode = Rise.$(selector);
            this.canvasNode = Rise.$.create('div');

            this.parentNode.append(this.canvasNode);
        } else {
            Rise.Logger.error('Selector -> %O not parsed', selector);
            return false;
        }

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