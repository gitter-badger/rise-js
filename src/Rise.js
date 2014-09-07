(function(global) {
    'use strict';

    /**
     * Current version of Rise
     * @type {String}
     * @private
     */
    var VERSION = '0.0.5-alpha';

    /**
     * Default configuration object
     * @type {Object}
     * @private
     */
    var defaultConfig = {
        canvas: {
            width: 640,
            height: 480,
            css: {
                outline: '1px solid black',
                position: 'relative'
            }
        }
    };

    /**
     * Rise constuctor
     * @param {String|Element} selector String selector or already parsed Element
     * @param {Object} config Configuration object for Rise
     * @constructor
     * @example
     * var Editor = new Rise('#rise-example', {
     *     draggable: {
     *         enabled: false
     *     }
     * })
     */
    function Rise(selector, config) {
        selector = selector || '#rise';
        config = config || {};

        if (selector instanceof Rise) {
            return selector;
        } else if (Rise.Util.isString(selector)) {
            var node = Rise.$(selector);

            if (node.count() === 0) {
                Rise.Logger.error('Selector -> %s nodes not founded', selector);
            } else {
                if (node.count() > 1) {
                    Rise.Logger.warning('Selector -> %s has found more than 1 nodes');
                    Rise.Logger.warning('Initializing only for node -> %O', noge.get(0));
                }

                return new Rise(node.get(0), config);
            }
        } else if (selector instanceof Element) {
            this.setConfig(defaultConfig, config);
            this.setParentNode(selector);
            this.setCanvasNode(Rise.$.create('div'));

            this.getCanvasNode()
                .css(this.getConfig('canvas.css'))
                .css({
                    width: this.getConfig('canvas.width'),
                    height: this.getConfig('canvas.height')
                });

            this.getParentNode().append(this.getCanvasNode());
        } else {
            Rise.Logger.error('Selector -> %O not parsed', selector);
            return false;
        }

        return this;
    }

    Rise.prototype = Object.create({
        /**
         * Updates Rise instance (canvas) and does needed operation after some changes.
         * This method must implements features which will fix smth after smth changes.
         * I.e. after setHtml it will fix canvasNode property for appropriate new canvas node.
         * @return {Rise} Returns Rise instance
         */
        update: function() {
            this.setCanvasNode(this.getParentNode().children());
            return this;
        },

        /**
         * Set parent node
         * @param {Rise.RQuery|Element} node
         * @return {Rise} Returns Rise instance
         */
        setParentNode: function(node) {
            this.parentNode = Rise.$(node);
            return this;
        },

        /**
         * Get parent node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        getParentNode: function() {
            return this.parentNode;
        },

        /**
         * Set canvas node
         * @param {Rise.RQuery|Element} node
         * @return {Rise} Returns Rise instance
         */
        setCanvasNode: function(node) {
            this.canvasNode = Rise.$(node);
            return this;
        },

        /**
         * Get canvas node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        getCanvasNode: function() {
            return this.canvasNode;
        },

        /**
         * Update configuration object
         * @param {Object} [config] New configuration object
         * @return {Rise} Returns Rise instance
         * @example
         * Rise.setConfig(config1, config2, config3);
         */
        setConfig: function() {
            this.config = this.config || {};

            for (var i = 0; i < arguments.length; i++) {
                Rise.Util.assign(this.config, arguments[i]);
            }

            return this;
        },

        /**
         * Get configuration object or config value
         * @param  {String} key Key in dot-notation
         * @return {Mixed}     Returns config object or value
         * @example
         * Rise.getConfig();
         * Rise.getConfig('draggable.enabled');
         */
        getConfig: function(key) {
            if (Rise.Util.isUndefined(key)) {
                return this.config;
            } else if (Rise.Util.isString(key)) {
                return key.split('.').reduce(function(config, key) {
                    return config[key];
                }, this.config);
            } else {
                Rise.Logger.warning('Key -> %O not parsed', key);
                return null;
            }
        },

        /**
         * Set new width to canvas
         * @param {Integer} width Width in px
         * @return {Rise} Returns Rise instance
         */
        setWidth: function(width) {
            if (Rise.Util.isNumber(width)) {
                this.getCanvasNode().css({
                    width: width
                });
            }

            return this;
        },

        /**
         * Get current width of canvas in px
         * @return {Integer} Returns width of canvas in px
         */
        getWidth: function() {
            return this.getCanvasNode().offsetWidth();
        },

        /**
         * Set new height for canvas
         * @param {Integer} height New height in px
         * @return {Rise} Returns Rise instance
         */
        setHeight: function(height) {
            if (Rise.Util.isNumber(height)) {
                this.getCanvasNode().css({
                    height: height
                });
            }

            return this;
        },

        /**
         * Get current height of canvas
         * @return {Integer} Returns height in px
         */
        getHeight: function() {
            return this.getCanvasNode().offsetHeight();
        },

        /**
         * Set new dimensions to canvas
         * @param {Integer} width  Width in px
         * @param {Integer} height Height in px
         * @return {Rise} Returns Rise instance
         */
        setDimensions: function(width, height) {
            this.setWidth(width);
            this.setHeight(height);
            return this;
        },

        /**
         * Get current dimensions of canvas
         * @return {Object} Returns object with width and height properties
         */
        getDimensions: function() {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            };
        },

        /**
         * Set HTML
         * @param {String} html HTML string that need to set
         * @return {Rise} Returns Rise instance
         */
        setHtml: function(html) {
            this.getParentNode().html(html);
            this.update();
            return this;
        },

        /**
         * Get HTML
         * @return {String} Returns HTML string
         */
        getHtml: function() {
            return this.getParentNode().html();
        },

        /**
         * Add element to canvas
         * @param {Rise.Element} element Rise.Element instance that you want to add
         * @return {Rise} Returns Rise instance
         * @example
         * var canvas = new Rise();
         * var element = new Rise.TextElement();
         * canvas.addElement(element);
         */
        addElement: function(element) {
            if (
                element instanceof Rise.Element &&
                element.getType() &&
                element.getNode
            ) {
                this.getCanvasNode().append(element.getNode());
            } else {
                Rise.Logger.error("Can't add element -> %O. It's not an Rise Element.", element);
            }

            return this;
        }
    });

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