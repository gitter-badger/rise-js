(function () {
    'use strict';

    Rise.Math = {
        /**
         * Force a number in range
         * If value < min then returns min
         * If value > max then returns max
         * If min < value < max then returns value
         * @param {Integer} min Minimum value of range
         * @param {Integer} max Maximum value of range
         * @param {Integer} value Value that need to clamp
         * @return {Integer} Returns clamped integer
         * @static
         */
        clamp: function (min, max, value) {
            return Math.min(max, Math.max(min, value));
        },

        /**
         * Get decimal value from [min, max] range
         * @param {Integer} min Minimum value in range
         * @param {Integer} max Maximum value in range
         * @param {Number|String} value Value that need to bound
         * @return {Number} Returns float decimal value
         * @static
         */
        bound: function (min, max, value) {
            if (Rise.Util.isString(value) && value.indexOf('.') !== -1 && parseFloat(value) === 1) {
                value = '100%';
            }

            var isPercentageValue = Rise.Util.isString(value) && value.indexOf('%') !== -1;

            value = this.clamp(min, max, parseFloat(value));

            if (isPercentageValue) {
                value = parseInt(value * max, 10) / 100;
            }

            if (Math.abs(value - max) < 0.000001) {
                return 1;
            }

            return (value % max) / parseFloat(max);
        },

        /**
         * Generate random value
         * @param {Integer} [min] Minimum value of range
         * @param {Integer} [max] Maximum value of range
         * @return {Integer} Returns random value in provided range
         * @static
         */
        getRandomValue: function (min, max) {
            min = min || 0;
            max = max || 100;

            return Math.random() * (max - min) + min;
        },

        /**
         * Replace decimal value with percentage value
         * @param {Integer} value Decimal value in [0, 1] range
         * @return {Integer|String} Returns percentage value or the same value if not decimal
         * @static
         */
        decimalToPercentage: function (value) {
            value = parseFloat(value);

            if (Rise.Util.isNumber(value) && value >= 0 && value <= 1) {
                return (value * 100) + "%";
            } else {
                return value;
            }
        }
    };
})();