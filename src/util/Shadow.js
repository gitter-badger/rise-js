(function(global) {
    'use strict';

    global.Rise.Shadow = Rise.Class.create({
        /**
         * Create new Rise.Shadow instance
         * @constructor
         * @param {Object} shadow Object with color, blur, offsetX, offsetY attributes or string
         * @return {Rise.Shadow} Returns new Rise.Shadow instance
         * @example
         * new Rise.Shadow({
         *     color: new Rise.Color('aqua'),
         *     blur: 2,
         *     offsetX: 5,
         *     offsetY: 10
         * });
         */
        init: function(shadow) {
            shadow = shadow || {};

            if (shadow instanceof Rise.Shadow) {
                return shadow;
            } else if (Rise.Util.isString(shadow)) {
                return Rise.Shadow.fromString(shadow);
            }

            Rise.Logger.startGroup(true, 'Rise.Shadow -> init()');
            Rise.Logger.log('Trying to parse options -> %O', shadow);

            this.color = new Rise.Color(shadow.color) || new Rise.Color('black');
            this.blur = shadow.blur || 0;
            this.offsetX = shadow.offsetX || 0;
            this.offsetY = shadow.offsetY || 0;

            Rise.Logger.log('Instantiated new Rise.Shadow -> %O', this);
            Rise.Logger.endGroup();

            return this;
        },

        /**
         * Set color
         * @param {Rise.Color|String|Object} color Color that you want set to shadow
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         * @example
         * new Rise.Shadow().setColor(new Rise.Color('aqua'));
         */
        setColor: function(color) {
            this.color = new Rise.Color(color);
            return this;
        },

        /**
         * Get color
         * @return {Rise.Color} Returns Rise.Color instance
         * @example
         * new Rise.Shadow().getColor();
         */
        getColor: function() {
            return this.color;
        },

        /**
         * Set blur
         * @param {Integer} blur Blur in integer
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         * @example
         * new Rise.Shadow().setBlur(3);
         */
        setBlur: function(blur) {
            this.blur = blur;
            return this;
        },

        /**
         * Get blur
         * @return {Integer} Returns current value of blur
         * @example
         * new Rise.Shadow().getBlur();
         */
        getBlur: function() {
            return this.blur;
        },

        /**
         * Set offsetX
         * @param {Integer} x OffsetX
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         * @example
         * new Rise.Shadow().setOffsetX(5);
         */
        setOffsetX: function(x) {
            this.offsetX = x;
            return this;
        },

        /**
         * Get offsetX
         * @return {Integer} Returns offsetX
         * @example
         * new Rise.Shadow().getOffsetX();
         */
        getOffsetX: function() {
            return this.offsetX;
        },

        /**
         * Set offsetY
         * @param {Integer} y OffsetY
         * @return {Rise.Shadow} Returns Rise.Shadow instance
         * @example
         * new Rise.Shadow().setOffsetY(5);
         */
        setOffsetY: function(y) {
            this.offsetY = y;
            return this;
        },

        /**
         * Get offsetY
         * @return {Integer} Returns offsetY
         * @example
         * new Rise.Shadow().getOffsetY();
         */
        getOffsetY: function() {
            return this.offsetY;
        },

        /**
         * Returns CSS string
         * @return {String} Returns CSS shadow string representation
         * @example
         * new Rise.Shadow().toString();
         */
        toString: function() {
            return [
                this.offsetX,
                this.offsetY,
                this.blur,
                this.color.toRgbString()
            ].join('px ');
        }
    }, {
        /**
         * Regex that match shadow offsetX, offsetY and blur
         * @static
         * @example
         * 2px 2px 10px rgba(0, 0, 0, 0.2)
         * rgb(0,255,0) 2px 2px
         */
        shadowRegex: /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/,

        /**
         * Create Rise.Shadow from shadow string representation
         * @static
         * @param {String} shadow Shadow value that need to parse
         * @return {Rise.Shadow} Rise.Shadow instance
         * @example
         * var shadow = Rise.Shadow.fromString('2px 2px 10px rgba(0, 0, 0, 0.2)');
         */
        fromString: function(shadow) {
            shadow = shadow.trim();

            var offsetsAndBlur = shadowRegex.exec(shadow) || [],
                color = shadow.replace(shadowRegex, '') || 'rgb(0,0,0)';

            return new Rise.Shadow({
                color: new Rise.Color(color),
                blur: parseInt(offsetsAndBlur[3], 10) || 0,
                offsetX: parseInt(offsetsAndBlur[1], 10) || 0,
                offsetY: parseInt(offsetsAndBlur[2], 10) || 0
            });
        }
    });
})(this);