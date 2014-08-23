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
    /**
     * Copy properties from parent to target object
     * @param  {Object} source Object from where properties will be copied
     * @param  {Object} target Object to where properties will copy
     * @param  {Object} parent Parent object
     * @private
     */
    function copyProperties(source, target, parent) {
        Object.keys(source).forEach(function(key) {
            if (typeof source[key] == "function" && typeof parent[key] == "function" && /\b_super\b/.test(source[key])) {
                target[key] = wrapMethod(source[key], parent[key]);
            } else {
                target[key] = source[key];
            }
        });
    }

    /**
     * Wrap method with parent method.
     * Useful for create this._super() in subclasses.
     * @param  {Function} method       Method that need to be wrapped
     * @param  {Function} parentMethod Parent method in other works - this._super();
     * @return {Function}              Returns wrapped function
     */
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
        prototype = prototype || {};
        staticProperties = staticProperties || {};
        mixins = mixins || [];

        function Constructor() {
            return this.init && this.init.apply(this, arguments);
        }

        Constructor.prototype = Object.create(this.prototype);
        Constructor.prototype.constructor = Constructor;
        Constructor.extend = Class.extend;

        copyProperties(staticProperties, Constructor, this);
        copyProperties(prototype, Constructor.prototype, this.prototype);
        for (var i = mixins.length - 1; i >= 0; i--) {
            copyProperties(mixins[i], Constructor.prototype, this.prototype);
        }

        return Constructor;
    };

    global.Rise.Class = Class;

})(this);
Rise.Font = Rise.Class.extend({
    init: function() {
        options = options || {};

        if (!(this instanceof arguments.callee)) {
            var callee = arguments.callee,
                newObject = Object.create(callee.prototype);
            callee.apply(newObject, callee.arguments);
            return newObject;
        } else if (Rise.Util.getType(options) == 'string') {
            options = stringToObject(options);
        } else if (options instanceof Rise.$) {
            options = fromNodeElementToObject(options.get(0));
        } else if (options instanceof Element) {
            options = fromNodeElementToObject(options);
        } else {
            Rise.Logger.warning('Rise.Font -> Options %O not valid', options);
        }

        Rise.Logger.startGroup('Rise.Font -> Start parsing');
        Rise.Logger.log('Trying to parse %O', options);

        this.valid = true;
        this.style = options.style || 'normal';
        this.variant = options.variant || 'normal';
        this.weight = options.weight || 'normal';
        this.size = options.size || 'medium';
        this.lineHeight = options.lineHeight || 'normal';
        this.family = options.family || 'serif';

        if (!isFontObjectValid(this)) {
            this.valid = false;
            Rise.Logger.warning('Font %O not parsed, reset to defaults', options);
        }

        Rise.Logger.log('Font %O parsed to Rise.Font %O', options, this);
        Rise.Logger.endGroup();

        return this;
    },

    isValid: function() {
        return this.valid;
    },

    getStyle: function() {
        return this.style;
    },

    setStyle: function(style) {
        if (isFontStyleValid(style)) {
            this.style = style;
        }

        return this;
    },

    getVariant: function() {
        return this.variant;
    },

    setVariant: function(variant) {
        if (isFontVariantValid(variant)) {
            this.variant = variant;
        }

        return this;
    },

    getWeight: function() {
        return this.weight;
    },

    setWeight: function(weight) {
        if (isFontWeightValid(weight)) {
            this.weight = weight;
        }

        return this;
    },

    getSize: function() {
        return this.size;
    },

    setSize: function(size) {
        if (isFontSizeValid(size)) {
            this.size = size;
        }

        return this;
    },

    getLineHeight: function() {
        return this.lineHeight;
    },

    setLineHeight: function(lineHeight) {
        if (isFontLineHeightValid(lineHeight)) {
            this.lineHeight = lineHeight;
        }

        return this;
    },

    getFamily: function() {
        return this.family;
    },

    setFamily: function(family) {
        if (isFontFamilyValid(family)) {
            this.family = family;
        }

        return this;
    },

    toString: function() {
        return (
            [
                this.style,
                this.variant,
                this.weight,
                this.size,
                '/' + this.lineHeight,
                this.family
            ].join(' ')
        );
    }
});

/**
 * Map of valid CSS units
 * @type {Array}
 * @private
 */
var cssUnitsMap = ['em', 'ex', 'pt', 'px', '%'];

/**
 * Map of valid font styles
 * @type {Array}
 * @private
 */
var fontStyleMap = ['normal', 'italic', 'oblique', 'inherit'];

/**
 * Map of valid font variants
 * @type {Array}
 * @private
 */
var fontVariantMap = ['normal', 'small-caps', 'inherit'];

/**
 * Map of valid font weight
 * @type {Array}
 * @private
 */
var fontWeightMap = ['bold', 'bolder', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

/**
 * Map of valid font size constants
 * @type {Array}
 * @private
 */
var fontSizeMap = ['xx-small', 'x-small', 'smaller', 'small', 'medium', 'large', 'larger', 'x-large', 'xx-large'];

/**
 * Check if value ends on valid css unit
 * @param  {String} value Value that need to check
 * @return {Boolean} True if valid
 * @private
 */
function isCssValueValid(value) {
    return cssUnitsMap.some(function(unit) {
        return value.lastIndexOf(unit) != -1;
    });
}

/**
 * Check if this value is valid font-style attribute
 * @param  {String} value Value that need to check
 * @return {Boolean} If value valid then true
 * @private
 */
function isFontStyleValid(value) {
    return fontStyleMap.indexOf(value) != -1;
}

/**
 * Check if value is valid font-variant attribute
 * @param  {String} value Value that need to check
 * @return {Boolean} True if value is valid
 * @private
 */
function isFontVariantValid(value) {
    return fontVariantMap.indexOf(value) != -1;
}

/**
 * Check if provided value it's valid font-weight attribute
 * @param  {String} value Font weight value that need to check
 * @return {Boolean} True if valid
 * @private
 */
function isFontWeightValid(value) {
    return fontWeightMap.indexOf(value) != -1;
}

/**
 * Check if provided value it's valid font size attribute
 * @param  {String} value Font size that need to check
 * @return {Boolean} True if valid
 * @private
 */
function isFontSizeValid(value) {
    return (
        fontSizeMap.indexOf(value) != -1 ||
        isCssValueValid(value)
    );
}

/**
 * Check if provided value it's valid font line-height attribute
 * @param  {String} value Value that need to be checked
 * @return {Boolean} True if valid
 * @private
 */
function isFontLineHeightValid(value) {
    return isCssValueValid(value);
}

/**
 * Check if provided value it's valid font-family attribute
 * @param  {String} value Value that need to be checked
 * @return {Boolean} True if valid
 * @private
 */
function isFontFamilyValid(value) {
    // TODO: implement
    return true;
}

/**
 * Check if created Rise.Font object is valid
 * @param {Rise.Font} font Font object that need to be checked
 * @return {Boolean} True if valid
 * @private
 */
function isFontObjectValid(font) {
    // FIXME: sometimes it returns false on valid objects
    return (
        isFontStyleValid(font.getStyle()) &&
        isFontVariantValid(font.getVariant()) &&
        isFontWeightValid(font.getWeight()) &&
        isFontSizeValid(font.getSize()) &&
        isFontLineHeightValid(font.getLineHeight()) &&
        isFontFamilyValid(font.getFamily())
    );
}

/**
 * Parse font string and return object with corresponding values
 * @param  {String} font Font string that need to parse
 * @return {Object} Object with font values
 * @private
 */
function stringToObject(font) {
    // TODO: implement
    Rise.Logger.warning('Rise.Font -> stringToObject() not realized yet');
    return {};
}

/**
 * Parse node Element for font properties and get font object
 * @param  {Element|Rise.$} element Node Element from where you want get font properties
 * @return {Rise.Font}
 * @private
 */
function fromNodeElementToObject(element) {
    var style = window.getComputedStyle(element, null);

    return {
        style: style.getPropertyValue('font-style'),
        variant: style.getPropertyValue('font-variant'),
        weight: style.getPropertyValue('font-weight'),
        size: style.getPropertyValue('font-size'),
        lineHeight: style.getPropertyValue('line-height'),
        family: style.getPropertyValue('font-family')
    };
}
(function(global) {
    /**
     * Current log level
     * @type {Number}
     * @private
     */
    var currentLogLevel = 3;

    /**
     * Check if level is allow to print message
     * @param  {Integer}  level Level that need to check
     * @return {Boolean}        Returns true if this level can be printed out
     * @private
     */
    function isAllowedLevel(level) {
        return level >= currentLogLevel;
    }

    /**
     * Prepend message to every log message
     * @param  {String} string Message to what will be prepended header message
     * @return {String}        Returns resulting strint
     * @private
     */
    function prependLoggerInfo(string) {
        return ['Rise', new Date().toLocaleTimeString(), string].join(' -> ');
    }

    /**
     * Invoke console methods
     * @param  {String} type Type of console that need to be invoked
     * @param  {Array} args Array of arguments to console method
     * @private
     * @example
     * invokeConsole('log', ['test', 'test2']); // test test2
     */
    function invokeConsole(type, args) {
        args = Array.prototype.slice.call(args, 0);

        if (console[type] && Rise.Util.isFunction(console[type])) {
            args[0] = prependLoggerInfo(args[0] ? args[0] : '');
            console[type].apply(console, args);
        }
    }

    /**
     * Print welcome message to console
     * @private
     */
    (function printWelcomeMessage() {
        if (window.chrome) {
            console.log.apply(console, [
                '%c %c %c Rise v' + Rise.getVersion() + ' %c %c %c',
                'background: #0E173E; font-size: 8pt;',
                'background: #020C25; font-size: 9pt;',
                'color: #FFFFFF; background: #0D0B0E; font-size: 10pt',
                'background: #020C25; font-size: 9pt;',
                'background: #0E173E; font-size: 8pt;',
                'background: #0E173E; font-size: 8pt;'
            ]);
        } else {
            console.log('Rise v' + Rise.getVersion());
        }
    })();

    var Logger = {
        /**
         * Allow print out all messages
         * @static
         * @type {Number}
         */
        VERBOSE: 1,

        /**
         * Allow print out only .debug(), .error(), .warn(), .info()
         * @static
         * @type {Number}
         */
        DEBUG: 2,

        /**
         * Allow print out only .error(), .warn(), .info()
         * @static
         * @type {Number}
         */
        ERROR: 3,

        /**
         * Allow print out only .warn() and .info()
         * @static
         * @type {Number}
         */
        WARNING: 4,

        /**
         * Allow print out only .info()
         * @static
         * @type {Number}
         */
        INFO: 5,

        /**
         * Disable all logs
         * @static
         * @type {Number}
         */
        OFF: 100,

        /**
         * Set current level for logger
         * @param {Integer} level Predefined constant in Rise.Logger
         * @return {Rise.Logger}
         * @static
         * @example
         * Rise.Logger.setLevel(Rise.Logger.VERBOSE);
         */
        setLevel: function(level) {
            currentLogLevel = level;
            return this;
        },

        /**
         * Get current log level
         * @static
         * @return {Integer} Returns integer value of current log level
         */
        getLevel: function() {
            return currentLogLevel;
        },

        /**
         * Log message to console
         * @static
         * @return {Rise.Logger}
         */
        log: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                invokeConsole('log', arguments);
            }

            return this;
        },

        /**
         * Debug message to console
         * @static
         * @return {Rise.Logger}
         */
        debug: function() {
            if (isAllowedLevel(this.DEBUG)) {
                invokeConsole('debug', arguments);
            }

            return this;
        },

        /**
         * Error message to console
         * @static
         * @return {Rise.Logger}
         */
        error: function() {
            if (isAllowedLevel(this.ERROR)) {
                invokeConsole('error', arguments);
            }

            return this;
        },

        /**
         * Warning message to console
         * @static
         * @return {Rise.Logger}
         */
        warning: function() {
            if (isAllowedLevel(this.WARNING)) {
                invokeConsole('warn', arguments);
            }

            return this;
        },

        /**
         * Info message to console
         * @static
         * @return {Rise.Logger}
         */
        info: function() {
            if (isAllowedLevel(this.INFO)) {
                invokeConsole('info', arguments);
            }

            return this;
        },

        /**
         * Start new group in console
         * @static
         * @return {Rise.Logger}
         */
        startGroup: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                invokeConsole('group', arguments);
            }

            return this;
        },

        /**
         * End current group in console
         * @static
         * @return {Rise.Logger}
         */
        endGroup: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                invokeConsole('groupEnd', arguments);
            }

            return this;
        },

        /**
         * Start profiling time in console
         * @static
         * @return {Rise.Logger}
         */
        startTime: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                invokeConsole('time', arguments);
            }

            return this;
        },

        /**
         * End profiling time in console
         * @static
         * @return {Rise.Logger}
         */
        endTime: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                invokeConsole('timeEnd', arguments);
            }

            return this;
        }
    };

    global.Rise.Logger = Logger;

})(this);
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
         * Check if this array
         * @param  {Mixed}  array Value that might be checked
         * @return {Boolean}      Returns true if array
         */
        isArray: function(array) {
            return this.getType(array) == 'array';
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
         * Check if this function
         * @param  {Mixed}  method Value that might be checked
         * @return {Boolean}       Returns true if function
         */
        isFunction: function(method) {
            return this.getType(method) == 'function';
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