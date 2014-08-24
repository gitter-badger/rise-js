(function(global) {
    'use strict';

    /**
     * Util object
     * @static
     * @type {Object}
     */
    var Util = {
        /**
         * Extend object
         * @param  {Object} destination Destination object will be also modified
         * @param  {Object} source Source objects
         * @return {Object} Returns extended object
         * @example
         * Rise.Util.extend({}, obj1, obj2, obj3);
         */
        extend: function() {
            /**
             * Copy source object to destination object
             * @this {Rise.Util}
             * @param  {String} key Current key of current source object
             * @private
             */
            var copyObject = function(key) {
                if (source[key] && source[key].constructor && source[key].constructor === Object) {
                    destination[key] = destination[key] || {};
                    this.extend(destination[key], source[key]);
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
         * @return {String} Returns camelized string
         * @static
         * @example
         * Rise.Util.getCamelizedString('font-style'); // fontStyle
         */
        getCamelizedString: function(string) {
            return string.replace(/\-(\w)/g, function(string, letter) {
                return letter.toUpperCase();
            });
        },

        /**
         * Get dashed string
         * @param  {String} string String which need to make dashed
         * @return {String} Returns dashed string
         * @static
         * @example
         * Rise.Util.getDashedString('borderRadius'); // border-radius
         */
        getDashedString: function(string) {
            return string.replace(/([A-Z])/g, function(string) {
                return '-' + string.toLowerCase();
            });
        },

        /**
         * Get random string
         * @static
         * @param  {String} prepend   String which prepends to random string
         * @param  {String} append    String which appends to random string
         * @param  {String} separator String which separate prepender and appender
         * @return {String}           Returns random generated string
         * @memberOf Rise.Util
         */
        getRandomString: function(prepend, append, separator) {
            prepend = prepend === undefined ? '' : prepend;
            append = append === undefined ? '' : append;
            separator = separator === undefined ? '' : separator;

            return [prepend, Math.random().toString(36).slice(2), append].join(separator);
        },

        /**
         * Get type of variable
         * @static
         * @param  {Mixed} value Variable that might be checked
         * @return {String}       Returns string representation of type
         */
        getType: function(value) {
            return Object.prototype.toString.call(value).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        },

        /**
         * Check if this object
         * @static
         * @param  {Mixed}  object Value that might be checked
         * @return {Boolean}       Returns true if object
         */
        isObject: function(object) {
            return this.getType(object) == 'object';
        },

        /**
         * Check if this is number
         * @static
         * @param  {Mixed}  number Value that might be checked
         * @return {Boolean}       Returns true if number
         */
        isNumber: function(number) {
            return (
                this.getType(number) == 'number' &&
                !isNaN(number) &&
                isFinite(number)
            );
        },

        /**
         * Check if this array
         * @static
         * @param  {Mixed}  array Value that might be checked
         * @return {Boolean}      Returns true if array
         */
        isArray: function(array) {
            return this.getType(array) == 'array';
        },

        /**
         * Check if this is boolean
         * @static
         * @param  {Mixed}  bool Value that might be checked
         * @return {Boolean}      Returns true if boolean
         */
        isBoolean: function(bool) {
            return this.getType(bool) == 'boolean';
        },

        /**
         * Check if this function
         * @static
         * @param  {Mixed}  method Value that might be checked
         * @return {Boolean}       Returns true if function
         */
        isFunction: function(method) {
            return this.getType(method) == 'function';
        },

        /**
         * Check if this is string
         * @static
         * @param  {Mixed}  string Value that might be checked
         * @return {Boolean}       Returns true if string
         */
        isString: function(string) {
            return this.getType(string) == 'string';
        },

        /**
         * Check if this is undefined
         * @static
         * @param  {Mixed}  value Value that might be checked
         * @return {Boolean}       Returns true if undefined
         */
        isUndefined: function(value) {
            return (
                this.getType(value) == 'undefined' ||
                this.getType(value) == 'domwindow'
            );
        }
    };

    global.Rise.Util = Util;

})(this);