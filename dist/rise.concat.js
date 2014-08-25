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
    'use strict';

    /**
     * Copy properties from parent to target object
     * @param  {Object} source Object from where properties will be copied
     * @param  {Object} target Object to where properties will copy
     * @param  {Object} parent Parent object
     * @private
     */
    function copyProperties(source, target, parent) {
        Object.keys(source).forEach(function(key) {
            if (
                typeof source[key] == "function" &&
                typeof parent[key] == "function" &&
                /\b_super\b/.test(source[key])
            ) {
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
     * @private
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
     * @private
     */
    function Class() {}

    /**
     * Create new Class or extend exists
     * @static
     * @param {Array} [mixins] Optional parameter. Array of mixins which need to inject in new Class
     * @param {Object} prototype Prototype object for new Class
     * @param {Object} staticProperties Object with static properties for new Class. Will send in Object.defineProperties.
     * @return {Object} Returns new Class
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
(function(global) {
    'use strict';

    global.Rise.Font = Rise.Class.extend({
        /**
         * Create new Font object
         * @constructor
         * @param  {Object} options Font options
         * @return {Rise.Font}      Returns Rise.Font instance
         */
        init: function(options) {
            options = options || {};

            Rise.Logger.startGroup(true, 'Rise.Font -> init()');
            Rise.Logger.log('Trying to parse options object -> %O', options);

            this.style = options.style || 'normal';
            this.variant = options.variant || 'normal';
            this.weight = options.weight || 'normal';
            this.size = options.size || 'medium';
            this.lineHeight = options.lineHeight || 'normal';
            this.family = options.family || 'serif';

            if (!Rise.Font.isFontValid(this)) {
                Rise.Logger.warning('Something wrong with options -> %O', options);
                Rise.Logger.warning('Rise.Font created with this font -> "%s"', this.toString());
            }

            Rise.Logger.log('Instantiated Rise.Font -> %O', this);
            Rise.Logger.endGroup();

            return this;
        },

        /**
         * Check if Rise.Font is valid instance
         * @return {Boolean} Returns true if Rise.Font instance valid
         */
        isValid: function() {
            return Rise.Font.isFontValid(this);
        },

        /**
         * Get current style
         * @return {String} Returns CSS font style
         */
        getStyle: function() {
            return this.style;
        },

        /**
         * Set style to Rise.Font
         * @param {String} style New CSS font style
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setStyle: function(style) {
            if (Rise.Font.isFontStyleValid(style)) {
                this.style = style;
            } else {
                Rise.Logger.warning('Rise.Font.setStyle() -> "%s" is not valid value', style);
            }

            return this;
        },

        /**
         * Get current font variant
         * @return {String} Returns CSS font variant
         */
        getVariant: function() {
            return this.variant;
        },

        /**
         * Set font variant to Rise.Font
         * @param {String} variant New CSS font variant
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setVariant: function(variant) {
            if (Rise.Font.isFontVariantValid(variant)) {
                this.variant = variant;
            } else {
                Rise.Logger.warning('Rise.Font.setVariant() -> "%s" is not valid value', variant);
            }

            return this;
        },

        /**
         * Get current font weight
         * @return {String} Returns CSS font weight
         */
        getWeight: function() {
            return this.weight;
        },

        /**
         * Set font weight to Rise.Font
         * @param {String} weight New CSS font weight
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setWeight: function(weight) {
            if (Rise.Font.isFontWeightValid(weight)) {
                this.weight = weight;
            } else {
                Rise.Logger.warning('Rise.Font.setWeight() -> "%s" is not valid value', weight);
            }

            return this;
        },

        /**
         * Get current font size
         * @return {String} Returns CSS font size
         */
        getSize: function() {
            return this.size;
        },

        /**
         * Set font size to Rise.Font
         * @param {String} size New CSS font size
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setSize: function(size) {
            if (Rise.Font.isFontSizeValid(size)) {
                this.size = size;
            } else {
                Rise.Logger.warning('Rise.Font.setSize() -> "%s" is not valid value', size);
            }

            return this;
        },

        /**
         * Get current font line height
         * @return {String} Returns CSS font line-height
         */
        getLineHeight: function() {
            return this.lineHeight;
        },

        /**
         * Set font line height to Rise.Font
         * @param {String} lineHeight New CSS font line-height
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setLineHeight: function(lineHeight) {
            if (Rise.Font.isFontLineHeightValid(lineHeight)) {
                this.lineHeight = lineHeight;
            } else {
                Rise.Logger.warning('Rise.Font.setLineHeight() -> "%s" is not valid value', lineHeight);
            }

            return this;
        },

        /**
         * Get current font family
         * @return {String} Returns CSS font family
         */
        getFamily: function() {
            return this.family;
        },

        /**
         * Set font family to Rise.Font
         * @param {String} family New CSS font family
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setFamily: function(family) {
            if (Rise.Font.isFontFamilyValid(family)) {
                this.family = family;
            } else {
                Rise.Logger.warning('Rise.Font.setFamily() -> "%s" is not valid value', family);
            }

            return this;
        },

        /**
         * Convert Rise.Font to CSS string representation
         * @return {String} Returns CSS string of Rise.Font representation
         */
        toString: function() {
            return (
                [
                    this.getStyle(),
                    this.getVariant(),
                    this.getWeight(),
                    this.getSize(),
                    '/' + this.getLineHeight(),
                    this.getFamily()
                ].join(' ')
            );
        }
    }, {
        /**
         * Map of CSS units
         * @static
         * @type {Array}
         */
        unitsMap: ['em', 'ex', 'pt', 'px', '%'],

        /**
         * Map of CSS font styles
         * @static
         * @type {Array}
         */
        fontStyleMap: ['normal', 'italic', 'oblique', 'inherit'],

        /**
         * Map of CSS font variants
         * @static
         * @type {Array}
         */
        fontVariantMap: ['normal', 'small-caps', 'inherit'],

        /**
         * Map of CSS font weights
         * @static
         * @type {Array}
         */
        fontWeightMap: ['bold', 'bolder', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'],

        /**
         * Map of CSS font sizes
         * @static
         * @type {Array}
         */
        fontSizeMap: ['xx-small', 'x-small', 'smaller', 'small', 'medium', 'large', 'larger', 'x-large', 'xx-large'],

        /**
         * Map of CSS font line heights
         * @static
         * @type {Array}
         */
        fontLineHeightMap: ['normal', 'inherit'],

        /**
         * Check if provided value is valid CSS value
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid CSS value
         */
        isCssValueValid: function(value) {
            return Rise.Font.unitsMap.some(function(unit) {
                return value.lastIndexOf(unit) != -1;
            });
        },

        /**
         * Check if provided value is valid CSS font style
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontStyleValid: function(value) {
            return Rise.Font.fontStyleMap.indexOf(value) != -1;
        },

        /**
         * Check if provided value is valid CSS font variant
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontVariantValid: function(value) {
            return Rise.Font.fontVariantMap.indexOf(value) != -1;
        },

        /**
         * Check if provided value is valid CSS font weight
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontWeightValid: function(value) {
            return Rise.Font.fontWeightMap.indexOf(value) != -1;
        },

        /**
         * Check if provided value is valid CSS font size
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontSizeValid: function(value) {
            return (
                Rise.Font.fontSizeMap.indexOf(value) != -1 ||
                Rise.Font.isCssValueValid(value)
            );
        },

        /**
         * Check if provided value is valid CSS font line height
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontLineHeightValid: function(value) {
            return (
                Rise.Font.isCssValueValid(value) ||
                Rise.Font.fontLineHeightMap.indexOf(value) != -1
            );
        },

        /**
         * Check if provided value is valid CSS font family
         * @static
         * @param  {String}  value Value that need to check
         * @return {Boolean}       Returns true if value is valid
         */
        isFontFamilyValid: function(value) {
            // TODO: implement
            return true;
        },

        /**
         * Check whole Rise.Font instance for valid values
         * @static
         * @param  {Rise.Font}  font Rise.Font instance where need to check their font values
         * @return {Boolean}         Returns true if Rise.Font is correct instance
         */
        isFontValid: function(font) {
            return (
                Rise.Font.isFontStyleValid(font.getStyle()) &&
                Rise.Font.isFontVariantValid(font.getVariant()) &&
                Rise.Font.isFontWeightValid(font.getWeight()) &&
                Rise.Font.isFontSizeValid(font.getSize()) &&
                Rise.Font.isFontLineHeightValid(font.getLineHeight()) &&
                Rise.Font.isFontFamilyValid(font.getFamily())
            );
        },

        /**
         * Create Rise.Font instance from string representation
         * @static
         * @param  {String} font    Font string
         * @return {Rise.Font}      Returns Rise.Font instance with parsed options from string
         */
        fromString: function(font) {
            // TODO: implement
            Rise.Logger.warning('Rise.Font -> fromString() not realized yet');
            return new Rise.Font();
        },

        /**
         * Create Rise.Font instance from exists node element
         * @static
         * @param  {Element} element Existing node element from where font options will parse
         * @return {Rise.Font}       Returns Rise.Font instance
         */
        fromNode: function(element) {
            var style = window.getComputedStyle(element, null);

            return new Rise.Font({
                style: style.getPropertyValue('font-style'),
                variant: style.getPropertyValue('font-variant'),
                weight: style.getPropertyValue('font-weight'),
                size: style.getPropertyValue('font-size'),
                lineHeight: style.getPropertyValue('line-height'),
                family: style.getPropertyValue('font-family')
            });
        }
    });
})(this);
(function(global) {
    'use strict';

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

    /**
     * Logger object
     * @static
     * @type {Object}
     */
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
         * @param {Boolean} startCollapsed If you set true for first argument, group will be collapsed
         * @return {Rise.Logger}
         */
        startGroup: function() {
            if (isAllowedLevel(this.VERBOSE)) {
                if (Rise.Util.isBoolean(arguments[0]) && arguments[0] === true) {
                    invokeConsole('groupCollapsed', Array.prototype.slice.call(arguments, 1));
                } else {
                    invokeConsole('group', arguments);
                }
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
    'use strict';

    /**
     * Factory method that returns new Rise.RQuery instance
     * @static
     * @return {Rise.RQuery} Returns Rise.RQuery instance
     * @example
     * Rise.$('div');
     * Rise.$('.my-selector');
     */
    global.Rise.$ = function() {
        return Rise.RQuery.apply(Object.create(Rise.RQuery.prototype), arguments);
    };

    /**
     * Factory method that returns new Rise.RQuery instance with created Element
     * @static
     * @param  {String} tag Tag element that need to create
     * @return {Rise.RQuery} Returns Rise.RQuery instance with created Element
     * @example
     * Rise.$.create('div');
     * Rise.$.create('span').text('My text');
     */
    global.Rise.$.create = function(tag) {
        return new Rise.RQuery(document.createElement(tag));
    };

    global.Rise.RQuery = Rise.Class.extend({
        /**
         * Create new Rise.RQuery instance
         * @constructor
         * @param  {String|Rise.RQuery|Element|Array} selector Selector or exists Element
         * @param  {Element|Document|Window} parent Parent from where selector will parse
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        init: function(selector, parent) {
            selector = selector || window;
            parent = parent || document;

            /**
             * Push Element to this.elements if valid
             * @this {Rise.RQuery}
             * @param  {Element} element It should be Element instance
             * @private
             */
            var pushElement = function(element) {
                if (element instanceof Element) {
                    this.elements.push(element);
                }
            }.bind(this);

            this.elements = [];

            Rise.Logger.startGroup(true, 'Rise.RQuery -> init()');
            Rise.Logger.log('Parsing selector -> "%O" with parent -> %O', selector, parent);

            if (selector instanceof Rise.RQuery) {
                this.elements = selector.get();
            } else if (
                Rise.Util.isArray(selector) ||
                selector instanceof HTMLCollection ||
                selector instanceof NodeList
            ) {
                Array.prototype.forEach.call(selector, pushElement);
            } else if (selector instanceof Element) {
                this.elements[0] = selector;
            } else if (Rise.Util.isString(selector)) {
                Array.prototype.forEach.call(parent.querySelectorAll(selector), pushElement);
            } else {
                Rise.Logger.warning('Selector is not valid -> %O', selector);
            }

            Rise.Logger.log('Instantiated Rise.RQuery -> %O', this);
            Rise.Logger.endGroup();

            return this;
        },

        /**
         * Get Element by index
         * @param  {Integer} index Index
         * @return {Array|Element} Returns Element with corresponding index or array of elements
         * @example
         * Rise.$('body').get(0);
         * Rise.$('div').get();
         */
        get: function(index) {
            return Rise.Util.isUndefined(index) ? this.elements : this.elements[index];
        },

        /**
         * Get elements count
         * @return {Integer} Returns elements count
         */
        count: function() {
            return (this.elements && this.elements.length) || 0;
        },

        /**
         * Iterate through all elements and call callback function
         * @param  {Function} cb Callback which called at each iteration cb(element, index, array)
         * @return {Rise.RQuery}
         * @example
         * Rise.$('div').each(function(element, index, array) {
         *     console.log(element, index, array);
         * });
         */
        each: function(cb) {
            Array.prototype.forEach.call(this.get(), cb);
            return this;
        },

        /**
         * Get parent node
         * @return {Rise.RQuery} Returns parent node of element
         * @example
         * Rise.$('body').parent();
         */
        parent: function() {
            return new Rise.RQuery(this.get(0).parentNode);
        },

        /**
         * Get array of children nodes
         * @return {Rise.RQuery} Return Rise.RQuery object with child nodes
         * @example
         * Rise.$('body').children();
         */
        children: function() {
            return new Rise.RQuery(this.get(0).children);
        },

        /**
         * Check if node contains other node
         * @param {Rise.RQuery} child Child node which need to check for exists in node
         * @return {Boolean} True if contains
         * @example
         * Rise.$('body').contains(Rise.$('div'));
         */
        contains: function(child) {
            child = child.get(0);

            var element = this.get(0);

            return element !== child && element.contains(child);
        },

        /**
         * Get node's width
         * @return {Integer} Returns offsetWidth of node
         * @example
         * Rise.$('div').offsetWidth();
         */
        offsetWidth: function() {
            return this.get(0).offsetWidth;
        },

        /**
         * Get node's height
         * @return {Integer} Returns offsetHeight of node
         * @example
         * Rise.$('div').offsetHeight();
         */
        offsetHeight: function() {
            return this.get(0).offsetHeight;
        },

        /**
         * Get left offset of node
         * @return {Integer} Returns offsetLeft of node
         * @example
         * Rise.$('div').offsetLeft();
         */
        offsetLeft: function() {
            return this.get(0).offsetLeft;
        },

        /**
         * Get top offset of node
         * @return {Integer} Returns offsetTop of node
         * @example
         * Rise.$('div').offsetTop();
         */
        offsetTop: function() {
            return this.get(0).offsetTop;
        },

        /**
         * Focus at node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         * @example
         * Rise.$('input').focus();
         */
        focus: function() {
            this.get(0).focus();
            return this;
        },

        /**
         * Unfocus from node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         * @example
         * Rise.$('input').blur();
         */
        blur: function() {
            this.get(0).blur();
            return this;
        },

        /**
         * Iterate through nodes and filter them out
         * @param  {Function} cb Callback function accept 3 arguments cb(node, index, array) and must return bool
         * @return {Rise.RQuery} Returns Rise.RQuery instance with filtered nodes
         * @example
         * Rise.$('div').filter(function(node, index, array) {
         *     return Rise.$(node).hasClass('example');
         * });
         */
        filter: function(cb) {
            if (Rise.Util.isFunction(cb)) {
                return new Rise.RQuery(Array.prototype.filter.call(this.get(), cb));
            } else {
                Rise.Logger.warning('Rise.RQuery.filter() -> You must provide function');
            }
        },

        /**
         * Find nodes by selector, starting from current parent node
         * @param  {String} selector Selector for find other nodes
         * @return {Rise.RQuery} Returns new Rise.RQuery instance with finded nodes
         * @example
         * Rise.$('body').find('div').find('span');
         */
        find: function(selector) {
            return new Rise.RQuery(selector, this.get(0));
        },

        /**
         * Set or get attribute value to nodes
         * @param  {String|Object} attr String for getting attribute value and object for set
         * @return {Rise.RQuery|Mixed} Returns current Rise.RQuery instance or attribute value
         * @example
         * Rise.$('div').attr('id');
         * Rise.$('div').attr({
         *     id: 'test'
         * });
         */
        attr: function(attr) {
            if (Rise.Util.isString(attr)) {
                return this.get(0).getAttribute(attr);
            } else if (Rise.Util.isObject(attr)) {
                Rise.Logger.startGroup(true, 'Rise.RQuery.attr() -> Set attributes');
                this.each(function(element) {
                    Object.keys(attr).forEach(function(key) {
                        Rise.Logger.log('Set key-value "%s" -> "%s" to element %O', key, attr[key], element);
                        if (attr[key] === false) {
                            element.removeAttribute(key);
                        } else {
                            element.setAttribute(key, attr[key]);
                        }
                    });
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Set or get css-rules
         * @param  {String|Object} name String if you want get CSS-rule or Object for set
         * @param {String} pseudoElement You can provide pseudoElement selector
         * @return {Rise.RQuery|Mixed} Returns current Rise.RQuery instance or CSS value
         * @example
         * Rise.RQuery('div').css({
         *     width: 200
         * });
         * Rise.RQuery('div').css('width', ':after');
         * Rise.RQuery('div').css('width');
         */
        css: function(css, pseudoElement) {
            pseudoElement = pseudoElement || null;

            if (Rise.Util.isString(css)) {
                return window.getComputedStyle(this.get(0), pseudoElement).getPropertyValue(Rise.Util.getDashedString(css));
            } else if (Rise.Util.isObject(css)) {
                Rise.Logger.startGroup(true, 'Rise.RQuery.css() -> Set CSS');
                this.each(function(element) {
                    Object.keys(css).forEach(function(key) {
                        Rise.Logger.log('Set key-value "%s" -> "%s" to element %O', key, css[key], element);

                        if (css[key] === false) {
                            element.style.removeProperty(Rise.Util.getDashedString(key));
                        } else if (isNaN(css[key]) || Rise.RQuery.cssNumbersMap.indexOf(key) != -1) {
                            element.style[Rise.Util.getCamelizedString(key)] = css[key];
                        } else {
                            element.style[Rise.Util.getCamelizedString(key)] = css[key] + 'px';
                        }
                    });
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Wrap nodes with new node
         * @param  {Rise.RQuery} html Rise.RQuery instance with HTML which will be the wrapper
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').wrap(Rise.$.create('a')); // Wrap all div with a tag
         */
        wrap: function(html) {
            var wrapper;

            return this.each(function(element) {
                wrapper = html.clone();
                element.parentNode.insertBefore(wrapper.get(0), element);
                wrapper.append(element);
            });
        },

        /**
         * Unwrap nodes, remove parent node from nodes
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').unwrap();
         */
        unwrap: function() {
            return this.each(function(element) {
                element.parentNode.parentNode.replaceChild(element, element.parentNode);
            });
        },

        /**
         * Check if this node is matches to selector
         * @param  {String} selector Selector for checking
         * @return {Boolean} Returns true if all elements is match to selector and false otherwise
         * @example
         * Rise.$('div').is('div'); // true
         */
        is: function(selector) {
            var element;

            if (this.count() > 0) {
                element = this.get(0);

                return (
                    element.matches ||
                    element.matchesSelector ||
                    element.msMatchesSelector ||
                    element.mozMatchesSelector ||
                    element.webkitMatchesSelector ||
                    element.oMatchesSelector
                ).call(element, selector);
            }

            return false;
        },

        /**
         * Add class name to nodes
         * @param {String} names Class names splitted with spaces
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').addClass('foo bar');
         */
        addClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.add(name);
                });
            });
        },

        /**
         * Remove class name from nodes
         * @param  {String} names Class names that need to be removed from nodes
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').removeClass('foo bar');
         */
        removeClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.remove(name);
                });
            });
        },

        /**
         * Toggle class name for nodes
         * @param  {String} names Class names that need to be toggled
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').toggleClass('foo bar');
         */
        toggleClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.toggle(name);
                });
            });
        },

        /**
         * Check if nodes have class name
         * @param  {String}  className Class name that need check for exists in node
         * @return {Boolean} Returns true if ALL nodes have className and false otherwise
         * @example
         * Rise.$('div').hasClass('foo');
         */
        hasClass: function(name) {
            if (this.count() > 0) {
                return Array.prototype.every.call(this.get(), function(element) {
                    return element.classList.contains(name);
                });
            }

            return false;
        },

        /**
         * Bind event to nodes
         * @param  {String|Object} eventType Event type
         * @param  {Function} handler Your function which you want execute on event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').on('click', function(event) {
         *     console.log(this, event);
         * });
         * Rise.$('div').on({
         *     click: function(event) {
         *         console.log(this, event);
         *     }
         * });
         */
        on: function(eventType, handler) {
            if (Rise.Util.isObject(eventType)) {
                Object.keys(eventType).forEach(function(key) {
                    this.on(key, eventType[key]);
                });
            } else {
                Rise.Logger.startGroup(true, 'Rise.RQuery.on() -> Binding events');
                this.each(function(element) {
                    Rise.Logger.log('Bind event "%s" to %O', eventType, element);
                    element.addEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Unbind event from nodes
         * @param  {String} eventType Event type
         * @param  {Function} handler Your function which you want to unsubscribe from event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').off('click', yourFunction);
         * Rise.$('div').off({
         *     click: yourFunction
         * });
         */
        off: function(eventType, handler) {
            if (Rise.Util.isObject(eventType)) {
                Object.keys(eventType).forEach(function(key) {
                    this.off(key, eventType[key]);
                });
            } else {
                Rise.Logger.startGroup(true, 'Rise.RQuery.off() -> Unbinding events');
                this.each(function(element) {
                    Rise.Logger.log('Unbind event "%s" from element %O', eventType, element);
                    element.removeEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Trigger native event for node
         * @param  {String} eventName Name of event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('button').trigger('click');
         */
        trigger: function(eventName) {
            var event = document.createEvent('HTMLEvents');

            event.initEvent(eventName, true, false);
            this.get(0).dispatch(event);

            return this;
        },

        /**
         * Remove nodes from DOM
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').remove();
         */
        remove: function() {
            return this.each(function(element) {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        },

        /**
         * Get or set HTML to nodes
         * @param  {String|Rise.RQuery} [html] HTML string or Rise.RQuery instance
         * @return {Rise.RQuery|String} Returns modified Rise.RQuery instance or HTML string
         * @example
         * Rise.$('div').html('test');
         * Rise.$('div').html(); // 'test'
         */
        html: function(html) {
            if (Rise.Util.isUndefined(html)) {
                return this.get(0).innerHTML;
            } else {
                return this.each(function(element) {
                    new Rise.RQuery(element).empty().append(html);
                });
            }
        },

        /**
         * Append HTML before node's end
         * @param  {String|Rise.RQuery|Element} html You can send String or exists node
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').append('test');
         * Rise.$('div').append(Rise.$.create('span'));
         * Rise.$('div').append(document.createElement('a'));
         */
        append: function(html) {
            if (Rise.Util.isString(html)) {
                this.each(function(element) {
                    element.insertAdjacentHTML('beforeend', html);
                });
            } else if (html instanceof Rise.RQuery) {
                this.each(function(element) {
                    element.appendChild(html.get(0));
                });
            } else if (html instanceof Element) {
                this.each(function(element) {
                    element.appendChild(html);
                });
            }

            return this;
        },

        /**
         * Prepend HTML after node began
         * @param  {String|Rise.RQuery|Element} html You can send String or existing Element
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').prepend('test');
         * Rise.$('div').prepend(Rise.$.create('span'));
         * Rise.$('div').prepend(document.createElement('a'));
         */
        prepend: function(html) {
            if (Rise.Util.isString(html)) {
                this.each(function(element) {
                    element.insertAdjacentHTML('afterbegin', html);
                });
            } else if (html instanceof Rise.RQuery) {
                this.each(function(element) {
                    element.insertBefore(html.get(0), element.firstChild);
                });
            } else if (html instanceof Element) {
                this.each(function(element) {
                    element.insertBefore(html, element.firstChild);
                });
            }

            return this;
        },

        /**
         * Set or get inner text
         * @param  {String} [text] Text which you want to set in elements
         * @return {Rise.RQuery|String} Returns current Rise.RQuery instance or string with text
         * @example
         * Rise.$('div').text('test');
         * Rise.$('div').text(); // 'test'
         */
        text: function(text) {
            if (Rise.Util.isUndefined(text)) {
                return this.get(0).textContent;
            } else {
                return this.each(function(element) {
                    element.textContent = text;
                });
            }
        },

        /**
         * Remove all child nodes from nodes
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').empty();
         */
        empty: function() {
            return this.each(function(element) {
                element.innerHTML = '';
            });
        },

        /**
         * Clone node
         * @return {Rise.RQuery} Returns new Rise.RQuery instance with cloned nodes
         * @example
         * Rise.$('div').clone();
         */
        clone: function() {
            var clones = [];

            this.each(function(element) {
                clones.push(element.cloneNode(true));
            });

            return new Rise.RQuery(clones);
        }
    }, {
        /**
         * Map of CSS attributes which have only numbers at value
         * @static
         * @type {Array}
         */
        cssNumbersMap: [
            "columnCount",
            "fillOpacity",
            "flexGrow",
            "flexShrink",
            "fontWeight",
            "lineHeight",
            "opacity",
            "order",
            "orphans",
            "widows",
            "zIndex",
            "zoom"
        ]
    });
})(this);
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