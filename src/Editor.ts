module Rise {
    export interface IEditor {
    }

    export class Editor implements IEditor {
        private static VERSION:String = '0.1.0';

        private _config:Object;
        private _parentNode:Rise.RQuery;
        private _canvasNode:Rise.RQuery;

        constructor(selector:Editor);
        constructor(selector:String, config:Object);
        constructor(selector:Element);
        constructor(selector:any) {
            var defaultConfig = {
                canvas: {
                    width: 600,
                    height: 500,
                    css: {
                        boxShadow: '0px 0px 1px 1px #000000',
                        position: 'relative'
                    }
                }
            };

            var node;

            if (selector instanceof Rise.Editor) {
                return selector;
            } else if (typeof selector == 'string') {
                node = Rise.$(selector);

                if (node.count() === 0) {
                    Rise.Logger.error('Selector -> %s nodes not founded', selector);
                } else {
                    if (node.count() > 1) {
                        Rise.Logger.warning('Selector -> %s has found more than 1 nodes');
                        Rise.Logger.warning('Initializing only for node -> %O', node.get(0));
                    }

                    return new Rise.Editor(node.get(0), config);
                }
            } else if (selector instanceof Element) {
                // TODO: think about elements
                this.elements = [];

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
        }
    }
}


Rise.prototype = Object.create({
    /**
     * Trigger event and notify all modules
     * @param {String} eventType Event type i.e. elementAdded
     * @param {Object} [context] Context of subscribed function
     * @return {Rise} Returns Rise instance
     */
    publishEvent: function (eventType, context) {
        eventType = eventType.charAt(0).toUpperCase() + eventType.slice(1);
        eventType = 'on' + eventType.replace(/:(.)/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
        context = context || this;

        var args = Array.prototype.slice.call(arguments, 2);

        // TODO: think about elements
        this.elements.forEach(function (element) {
            if (Rise.Util.isFunction(element[eventType])) {
                element[eventType].apply(context, args);
            }
        });

        return this;
    },

    /**
     * Add element to canvas
     * @param {Rise.BasicElement|Object} element Rise.Element instance that you want to add
     * @return {Rise} Returns Rise instance
     */
    add: function (element) {
        if (element instanceof Rise.BasicElement && element.getNode) {
            // TODO: think about elements
            this.elements.push(element);
            this.getCanvasNode().append(element.getNode());
            this.publishEvent('element:added', this, element);
        } else {
            Rise.Logger.error("Can't add element -> %O. It's not an Rise Element.", element);
        }

        return this;
    },

    /**
     * Updates Rise instance (canvas) and doing needed operation after some changes.
     * This method must implements features which will fix changes.
     * I.e. after setHtml it will fix canvasNode property for appropriate new canvas node.
     * @return {Rise} Returns Rise instance
     */
    update: function () {
        // TODO: maybe remove this method
        this.setCanvasNode(this.getParentNode().children());
        return this;
    },

    /**
     * Set parent node
     * @param {Rise.RQuery|Object} node
     * @return {Rise} Returns Rise instance
     */
    setParentNode: function (node) {
        this.parentNode = Rise.$(node);
        return this;
    },

    /**
     * Get parent node
     * @return {Rise.RQuery} Returns Rise.RQuery instance
     */
    getParentNode: function () {
        return this.parentNode;
    },

    /**
     * Set canvas node
     * @param {Rise.RQuery|Object} node
     * @return {Rise} Returns Rise instance
     */
    setCanvasNode: function (node) {
        this.canvasNode = Rise.$(node);
        return this;
    },

    /**
     * Get canvas node
     * @return {Rise.RQuery} Returns Rise.RQuery instance
     */
    getCanvasNode: function () {
        return this.canvasNode;
    },

    /**
     * Update configuration object
     * @return {Rise} Returns Rise instance
     */
    setConfig: function () {
        this.config = this.config || {};

        for (var i = 0; i < arguments.length; i++) {
            Rise.Util.assign(this.config, arguments[i]);
        }

        return this;
    },

    /**
     * Get configuration object or config value
     * @param  {String} key Key in dot-notation
     * @return {Object} Returns config object or value
     */
    getConfig: function (key) {
        if (Rise.Util.isUndefined(key)) {
            return this.config;
        } else if (Rise.Util.isString(key)) {
            return key.split('.').reduce(function (config, key) {
                return config[key];
            }, this.config);
        } else {
            Rise.Logger.warning('Key -> %O not parsed', key);
            return null;
        }
    },

    /**
     * Set new width to canvas
     * @param {Number} width Width in px
     * @return {Rise} Returns Rise instance
     */
    setWidth: function (width) {
        if (Rise.Util.isNumber(width)) {
            this.getCanvasNode().css({
                width: width
            });
        }

        return this;
    },

    /**
     * Get current width of canvas in px
     * @return {Number} Returns width of canvas in px
     */
    getWidth: function () {
        return this.getCanvasNode().offsetWidth();
    },

    /**
     * Set new height for canvas
     * @param {Number} height New height in px
     * @return {Rise} Returns Rise instance
     */
    setHeight: function (height) {
        if (Rise.Util.isNumber(height)) {
            this.getCanvasNode().css({
                height: height
            });
        }

        return this;
    },

    /**
     * Get current height of canvas
     * @return {Number} Returns height in px
     */
    getHeight: function () {
        return this.getCanvasNode().offsetHeight();
    },

    /**
     * Set new dimensions to canvas
     * @param {Number|Null} [width] Width in px
     * @param {Number} [height] Height in px
     * @return {Rise} Returns Rise instance
     */
    setDimensions: function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    },

    /**
     * Get current dimensions of canvas
     * @return {Object} Returns object with width and height properties
     */
    getDimensions: function () {
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
    setHtml: function (html) {
        // TODO: make normal saving maybe in JSON
        this.getParentNode().html(html);
        this.update();
        return this;
    },

    /**
     * Get HTML
     * @return {String} Returns HTML string
     */
    getHtml: function () {
        return this.getParentNode().html();
    }
});

/**
 * Get current version
 * @static
 * @return {String} Returns current version
 */
Rise.getVersion = function () {
    return VERSION;
};

global.Rise = Rise;

})
(window);