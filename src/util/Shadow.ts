(function () {
    'use strict';

    Rise.Shadow = Rise.Class.create({
        /**
         * Create new Rise.Shadow instance
         * @constructor
         * @param {Object} shadow Object with color, blur, offsetX, offsetY attributes or string
         * @return {Rise.Shadow|Object} Returns new Rise.Shadow instance
         */
        init: function (shadow) {
            shadow = shadow || {};

            if (shadow instanceof Rise.Shadow) {
                return shadow;
            } else if (Rise.Util.isString(shadow)) {
                return Rise.Shadow.fromString(shadow);
            } else if (Rise.Util.isObject(shadow)) {
                Rise.Logger.startGroup(true, 'Rise.Shadow -> init()');
                Rise.Logger.log('Trying to parse options -> %O', shadow);

                this.setColor(shadow.color || 'black');
                this.setBlur(shadow.blur || 0);
                this.setOffsetX(shadow.offsetX || 0);
                this.setOffsetY(shadow.offsetY || 0);

                Rise.Logger.log('Instantiated new Rise.Shadow -> %O', this);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Shadow -> %O not parsed', shadow);
                return false;
            }

            return this;
        },

        /**
         * Set color
         * @param {Rise.Color|String|Object} color Color that you want set to shadow
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         */
        setColor: function (color) {
            this.color = new Rise.Color(color);
            return this;
        },

        /**
         * Get color
         * @return {Rise.Color} Returns Rise.Color instance
         */
        getColor: function () {
            return this.color;
        },

        /**
         * Set blur
         * @param {Integer} blur Blur in integer
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         */
        setBlur: function (blur) {
            this.blur = blur;
            return this;
        },

        /**
         * Get blur
         * @return {Integer} Returns current value of blur
         */
        getBlur: function () {
            return this.blur;
        },

        /**
         * Set offsetX
         * @param {Integer} x OffsetX
         * @return {Rise.Shadow} Returns current Rise.Shadow instance
         */
        setOffsetX: function (x) {
            this.offsetX = x;
            return this;
        },

        /**
         * Get offsetX
         * @return {Integer} Returns offsetX
         */
        getOffsetX: function () {
            return this.offsetX;
        },

        /**
         * Set offsetY
         * @param {Integer} y OffsetY
         * @return {Rise.Shadow} Returns Rise.Shadow instance
         */
        setOffsetY: function (y) {
            this.offsetY = y;
            return this;
        },

        /**
         * Get offsetY
         * @return {Integer} Returns offsetY
         */
        getOffsetY: function () {
            return this.offsetY;
        },

        /**
         * Returns CSS string
         * @return {String} Returns CSS shadow string representation
         */
        toString: function () {
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
         */
        shadowRegex: /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/,

        /**
         * Create Rise.Shadow from shadow string representation
         * @static
         * @param {String} shadow Shadow value that need to parse
         * @return {Rise.Shadow} Rise.Shadow instance
         */
        fromString: function (shadow) {
            shadow = shadow.trim();

            var offsetsAndBlur = Rise.Shadow.shadowRegex.exec(shadow) || [],
                color = shadow.replace(Rise.Shadow.shadowRegex, '') || 'rgb(0, 0, 0)';

            return new Rise.Shadow({
                color: new Rise.Color(color),
                blur: parseInt(offsetsAndBlur[3], 10) || 0,
                offsetX: parseInt(offsetsAndBlur[1], 10) || 0,
                offsetY: parseInt(offsetsAndBlur[2], 10) || 0
            });
        }
    });
})();