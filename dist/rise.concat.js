(function(global) {
    /**
     * Current version of Rise
     * @type {String}
     * @private
     */
    var VERSION = '0.0.1 -> alpha';

    /**
     * Rise constuctor
     * @constructor
     */
    function Rise() {
        return this;
    }

    Rise.prototype = Object.create({});

    /**
     * Get current version
     * @return {String} Returns current version
     * @private
     */
    Rise.getVersion = function() {
        return VERSION;
    };

    global.Rise = Rise;

})(this);
(function(global) {
    var fnTest = /alert();/.test(function() {
        alert();
    }) ? /\b_super\b/ : /./;

    function copyWrappedProps(prototype, targetPropsObj, parentPropsObj) {
        if (!prototype) return;

        for (var name in prototype) {
            if (typeof prototype[name] == "function" && typeof parentPropsObj[name] == "function" && fnTest.test(prototype[name])) {
                targetPropsObj[name] = wrapMethod(prototype[name], parentPropsObj[name]);
            } else {
                targetPropsObj[name] = prototype[name];
            }
        }

    }

    // возвращает обёртку вокруг method, которая ставит this._super на родителя
    // и возвращает его потом 
    function wrapMethod(method, parentMethod) {
        return function() {
            var backup = this._super;

            this._super = parentMethod;

            try {
                return method.apply(this, arguments);
            } finally {
                this._super = backup;
            }
        };
    }


    /**
     * Empty function (interface)
     * @member Rise.Class
     * @private
     */
    function Class() {}

    /**
     * Create new Class or extend exists
     * @param {Array} [mixins] Optional parameter. Array of mixins which need to inject in new Class
     * @param {Object} prototype Prototype object for new Class
     * @param {Object} staticProperties Object with static properties for new Class. Will send in Object.defineProperties.
     * @return {Object} Returns new Class
     * @member Rise.Class
     *
     * @example
     * Rise.Class.extend([prototype])
     * Rise.Class.extend([prototype], [staticProperties])
     * Rise.Class.extend([prototype], [staticProperties], [mixins])
     */
    Class.extend = function(prototype, staticProperties, mixins) {
        mixins = mixins || [];

        function Constructor() {
            this.init && this.init.apply(this, arguments);
        }

        // this -- это класс "перед точкой", для которого вызван extend (Animal.extend)
        // наследуем от него:
        Constructor.prototype = Class.inherit(this.prototype);

        // constructor был затёрт вызовом inherit
        Constructor.prototype.constructor = Constructor;

        // добавим возможность наследовать дальше
        Constructor.extend = Class.extend;

        // скопировать в Constructor статические свойства
        copyWrappedProps(staticProperties, Constructor, this);

        // скопировать в Constructor.prototype свойства из примесей и prototype
        for (var i = 0; i < mixins.length; i++) {
            copyWrappedProps(mixins[i], Constructor.prototype, this.prototype);
        }
        copyWrappedProps(prototype, Constructor.prototype, this.prototype);

        return Constructor;
    };

    global.Rise.Class = Class;

})(this);



var Text = Rise.Class.extend({
    init: function() {
        console.log(this);
    }
});

var AdvText = Text.extend({
    init: function() {
        console.log('AdvText', this);
    }
});

new Text();
new AdvText();
(function(global) {
    var Util = {
        /**
         * Get type of variable
         * @param  {Mixed} value Variable that might be checked
         * @return {String}       Returns string representation of type
         */
        getType: function(value) {
            return Object.prototype.toString.call(value).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        },

        /**
         * Check if this object
         * @param  {Mixed}  object Value that might be checked
         * @return {Boolean}       Returns true if object
         */
        isObject: function(object) {
            return this.getType(object) == 'object';
        },

        /**
         * Check if this array
         * @param  {Mixed}  array Value that might be checked
         * @return {Boolean}      Returns true if array
         */
        isArray: function(array) {
            return this.getType(array) == 'array';
        },

        /**
         * Check if this is number
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
         * Check if this is string
         * @param  {Mixed}  string Value that might be checked
         * @return {Boolean}       Returns true if string
         */
        isString: function(string) {
            return this.getType(string) == 'string';
        },

        /**
         * Check if this is boolean
         * @param  {Mixed}  bool Value that might be checked
         * @return {Boolean}      Returns true if boolean
         */
        isBoolean: function(bool) {
            return this.getType(bool) == 'boolean';
        },

        /**
         * Get random string
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
        }
    };

    global.Rise.Util = Util;

})(this);