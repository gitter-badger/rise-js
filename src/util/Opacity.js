(function () {
    'use strict';

    Rise.Opacity = Rise.Class.create({
        /**
         * Create new Rise.Opacity object
         * @param {Number} opacity Percentage range [0, 100] (100% - transparent, 0% - blank) or [0, 1] range
         * @return {Rise.Opacity|Object} Returns new Rise.Opacity instance
         */
        init: function (opacity) {
            opacity = opacity || 0;

            if (opacity instanceof Rise.Opacity) {
                return opacity;
            } else if (Rise.Util.isNumber(opacity)) {
                Rise.Logger.startGroup(true, 'Rise.Opacity -> init()');
                Rise.Logger.log('Trying to parse opacity -> "$s"', opacity);
                this.set(opacity);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Opacity -> %O not parsed', opacity);
                return false;
            }

            return this;
        },

        /**
         * Set opacity
         * @param {Integer} opacity Opacity in percentage range [0, 100] or [0, 1] range
         * @return {Rise.Opacity} Returns current Rise.Opacity instance
         */
        set: function (opacity) {
            if (Rise.Opacity.isDecimal01Value(opacity)) {
                Rise.Logger.log('"%s" decimal value, converting to percentage', opacity);
                this.opacity = Rise.Opacity.convertCssToPercentage(opacity);
            } else if (Rise.Opacity.isPercentageValue(opacity)) {
                Rise.Logger.log('"%s" percentage value, setting it', opacity);
                this.opacity = opacity;
            } else {
                Rise.Logger.warning('Opacity -> %O not parsed, set to 0%', opacity);
                this.opacity = 0;
            }

            return this;
        },

        /**
         * Get opacity in percentage
         * @return {Integer} Returns opacity in range from 0% to 100%
         */
        get: function () {
            return this.opacity;
        },

        /**
         * Convert opacity value to CSS string
         * @return {Number} Returns string which you can apply to CSS
         */
        toString: function () {
            return Rise.Opacity.convertPercentageToCss(this.opacity);
        }
    }, {
        /**
         * Check if provided value is percentage value in [0, 100] range and not decimal
         * @param {Number} value Value that need to be checked
         * @return {Boolean} True if value is percentage value
         * @static
         */
        isPercentageValue: function (value) {
            return (
                Rise.Util.isNumber(value) &&
                value >= 0 &&
                value <= 100 &&
                value === Math.floor(value)
                );
        },

        /**
         * Check if provided value is decimal value in [0, 1] range
         * @param {Number} value Value that need to be checked
         * @return {Boolean} True if value is decimal
         * @static
         */
        isDecimal01Value: function (value) {
            return (
                Rise.Util.isNumber(value) &&
                value >= 0 &&
                value <= 1 &&
                value !== Math.floor(value)
                );
        },

        /**
         * Convert CSS opacity value to percentage value
         * @param {Number} value CSS opacity value that need to be converted
         * @return {Number} Returns float value in percentage
         * @static
         */
        convertCssToPercentage: function (value) {
            return (100 - (value * 100.0).toFixed(0));
        },

        /**
         * Convert percentage value to CSS opacity
         * @param {Number} value Percentage value
         * @return {Number} Returns float value for CSS opacity
         * @static
         */
        convertPercentageToCss: function (value) {
            return (100 - value) / 100.0;
        }
    });
})();