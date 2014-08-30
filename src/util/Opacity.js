(function(global) {
    'use strict';

    global.Rise.Opacity = Rise.Class.create({
        /**
         * Create new Rise.Opacity object
         * @constructor
         * @param {Float} opacity Percentage range [0, 100] (100% - transparent, 0% - blank) or [0, 1] range
         * @return {Rise.Opacity} Returns new Rise.Opacity instance
         * @example
         * new Rise.Opacity(40).toString(); // 0.60
         * new Rise.Opacity(0.20).getOpacity(); // 80
         */
        init: function(opacity) {
            opacity = opacity || 0;

            if (opacity instanceof Rise.Opacity) {
                return opacity;
            }

            Rise.Logger.startGroup(true, 'Rise.Opacity -> init()');
            Rise.Logger.log('Trying to parse opacity -> "$s"', opacity);
            this.set(opacity);
            Rise.Logger.endGroup();

            return this;
        },

        /**
         * Set opacity
         * @param {Integer} opacity Opacity in percentage range [0, 100] or [0, 1] range
         * @return {Rise.Opacity} Returns current Rise.Opacity instance
         * @example
         * new Rise.Opacity(20).set(60).toString(); // 0.4
         */
        set: function(opacity) {
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
         * @example
         * new Rise.Opacity(60).get(); // 60
         */
        get: function() {
            return this.opacity;
        },

        /**
         * Convert opacity value to CSS string
         * @return {String} Returns string which you can apply to CSS
         */
        toString: function() {
            return Rise.Opacity.convertPercentageToCss(this.opacity);
        }
    }, {
        /**
         * Check if provided value is percentage value in [0, 100] range and not decimal
         * @param  {Float} value Value that need to be checked
         * @return {Boolean} True if value is percentage value
         * @static
         * @example
         * isPercentageValue(20); // true
         * isPercentageValue(0); // true
         * isPercentageValue(400); // false
         * isPercentageValue(0.40); //false
         */
        isPercentageValue: function(value) {
            return (
                Rise.Util.isNumber(value) &&
                value >= 0 &&
                value <= 100 &&
                value == Math.floor(value)
            );
        },

        /**
         * Check if provided value is decimal value in [0, 1] range
         * @param  {Float} value Value that need to be checked
         * @return {Boolean} True if value is decimal
         * @static
         * @example
         * isDecimal01Value(0.20); // true
         * isDecimal01Value(2); // false
         * isDecimal01Value(1.00); // false
         */
        isDecimal01Value: function(value) {
            return (
                Rise.Util.isNumber(value) &&
                value >= 0 &&
                value <= 1 &&
                value != Math.floor(value)
            );
        },

        /**
         * Convert CSS opacity value to percentage value
         * @param  {Float} value CSS opacity value that need to be converted
         * @return {Float} Returns float value in percentage
         * @static
         * @example
         * Rise.Opacity.convertCssToPercentage(0.40); // 60%
         * Rise.Opacity.convertCssToPercentage(1); // 0%
         */
        convertCssToPercentage: function(value) {
            return (100 - (value * 100.0).toFixed(0));
        },

        /**
         * Convert percentage value to CSS opacity
         * @param  {Float} value Percentage value
         * @return {Float} Returns float value for CSS opacity
         * @static
         * @example
         * Rise.Opacity.convertPercentageToCss(60); // 0.40
         * Rise.Opacity.convertPercentageToCss(0); // 1
         */
        convertPercentageToCss: function(value) {
            return (100 - value) / 100.0;
        }
    });
})(this);