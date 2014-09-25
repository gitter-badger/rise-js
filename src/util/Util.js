(function () {
    'use strict';

    /**
     * Util object
     * @static
     * @type {Object}
     */
    Rise.Util = {
        /**
         * Assign (extend) objects
         * @return {Object} Returns extended object
         * @static
         */
        assign: function () {
            /**
             * Copy source object to destination object
             * @this {Rise.Util}
             * @param  {String} key Current key of current source object
             * @private
             */
            var copyObject = function (key) {
                if (source[key] && source[key].constructor && source[key].constructor === Object) {
                    destination[key] = destination[key] || {};
                    this.assign(destination[key], source[key]);
                } else {
                    destination[key] = source[key];
                }
            }.bind(this);

            var destination = arguments[0],
                source;

            for (var i = 1; i < arguments.length; i++) {
                source = arguments[i];
                Object.keys(source).forEach(copyObject);
            }

            return destination;
        },

        /**
         * Camelize string
         * @param  {String} string String which need to camelize
         * @return {String} Returns camelize string
         * @static
         */
        toCamelizeString: function (string) {
            return string.replace(/\-(\w)/g, function (string, letter) {
                return letter.toUpperCase();
            });
        },

        /**
         * Get dashed string
         * @param  {String} string String which need to make dashed
         * @return {String} Returns dashed string
         * @static
         */
        toDashedString: function (string) {
            return string.replace(/([A-Z])/g, function (string) {
                return '-' + string.toLowerCase();
            });
        },

        /**
         * Get random string
         * @param {String} [prepend] String which prepends to random string
         * @param {String} [append] String which appends to random string
         * @param {String} [separator] String which separate prepend and appender
         * @return {String} Returns random generated string
         * @static
         */
        getRandomString: function (prepend, append, separator) {
            prepend = this.isUndefined(prepend) ? '' : prepend;
            append = this.isUndefined(append) ? '' : append;
            separator = this.isUndefined(separator) ? '' : separator;

            return [
                prepend,
                Math.random().toString(36).slice(2),
                append
            ].join(separator);
        },

        /**
         * Flip key-values in object
         * @param  {Object} object Object which you want to flip
         * @return {Object} Returns flipped object
         * @static
         */
        flipObject: function (object) {
            var flipped = {};

            Object.keys(object).forEach(function (key) {
                flipped[object[key]] = key;
            });

            return flipped;
        },

        /**
         * Get type of variable
         * @static
         * @param  {Object} value Variable that might be checked
         * @return {String}      Returns string representation of type
         */
        getType: function (value) {
            return Object.prototype.toString.call(value).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        },

        /**
         * Check if this object
         * @static
         * @param  {Object}  object Value that might be checked
         * @return {Boolean}       Returns true if object
         */
        isObject: function (object) {
            return this.getType(object) === 'object';
        },

        /**
         * Check if this is number
         * @static
         * @param  {*}  number Value that might be checked
         * @return {Boolean}       Returns true if number
         */
        isNumber: function (number) {
            return (
                this.getType(number) === 'number' && !isNaN(number) &&
                isFinite(number)
                );
        },

        /**
         * Check if this array
         * @static
         * @param  {Object}  array Value that might be checked
         * @return {Boolean}      Returns true if array
         */
        isArray: function (array) {
            return this.getType(array) === 'array';
        },

        /**
         * Check if this is boolean
         * @static
         * @param  {Object}  bool Value that might be checked
         * @return {Boolean}      Returns true if boolean
         */
        isBoolean: function (bool) {
            return this.getType(bool) === 'boolean';
        },

        /**
         * Check if this function
         * @static
         * @param  {Object}  method Value that might be checked
         * @return {Boolean}       Returns true if function
         */
        isFunction: function (method) {
            return this.getType(method) === 'function';
        },

        /**
         * Check if this is string
         * @static
         * @param  {Object}  string Value that might be checked
         * @return {Boolean}       Returns true if string
         */
        isString: function (string) {
            return this.getType(string) === 'string';
        },

        /**
         * Check if this is undefined
         * @static
         * @param  {Object}  value Value that might be checked
         * @return {Boolean}       Returns true if undefined
         */
        isUndefined: function (value) {
            return (
                this.getType(value) === 'undefined' ||
                this.getType(value) === 'domwindow'
                );
        }
    };
})();