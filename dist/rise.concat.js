(function(global) {
    /**
     * Current version of Rise
     * @type {String}
     * @private
     */
    var VERSION = '0.0.2-alpha';

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
     * @static
     * @return {String} Returns current version
     */
    Rise.getVersion = function() {
        return VERSION;
    };

    global.Rise = Rise;

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
         * @static
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
         * @param  {String} prepend   String which prepends to random string
         * @param  {String} append    String which appends to random string
         * @param  {String} separator String which separate prepender and appender
         * @return {String}           Returns random generated string
         * @static
         * @example
         * Rise.Util.getRandomString('preffix', 'suffix', 'separator');
         */
        getRandomString: function(prepend, append, separator) {
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
         * @example
         * var flipped = Rise.Util.flipObject({
         *     foo: 'bar',
         *     bar: 'test'
         * });
         */
        flipObject: function(object) {
            var flipped = {};

            Object.keys(object).forEach(function(key) {
                flipped[object[key]] = key;
            });

            return flipped;
        },

        /**
         * Get type of variable
         * @static
         * @param  {Mixed} value Variable that might be checked
         * @return {String}      Returns string representation of type
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
     * @param  {Function} parentMethod Parent method, in other words - this._super();
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
     * @param {Object} [prototype] Prototype object for new Class
     * @param {Object} [staticProperties] Object with static properties for new Class
     * @param {Array}  [mixins] Array of mixins which need to inject in new Class prototype
     * @return {Object} Returns new Class
     *
     * @example
     * Rise.Class.create([prototype])
     * Rise.Class.create([prototype], [staticProperties])
     * Rise.Class.create([prototype], [staticProperties], [mixins])
     */
    Class.create = function(prototype, staticProperties, mixins) {
        prototype = prototype || {};
        staticProperties = staticProperties || {};
        mixins = mixins || [];

        function Constructor() {
            return this.init && this.init.apply(this, arguments);
        }

        Constructor.prototype = Object.create(this.prototype);
        Constructor.prototype.constructor = Constructor;
        Constructor.extend = Class.create;

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

    global.Rise.Color = Rise.Class.create({
        /**
         * Create new Rise.Color instance
         * @constructor
         * @param {String|Object|Rise.Color} color String or object with appropriate properties
         * @param {Object} config Additional config for color
         * @return {Rise.Color} Returns Rise.Color instance
         * @example
         * Rise.Color('red');
         * Rise.Color({
         *     r: 255,
         *     g: 0,
         *     b: 0,
         *     a: 1
         * })
         */
        init: function(color, config) {
            color = color || 'black';
            config = config || {};

            var rgb = {},
                alpha = 1,
                valid = false,
                format = false;

            if (color instanceof Rise.Color) {
                return color;
            } else if (Rise.Util.isString(color)) {
                return Rise.Color.fromString(color, config);
            } else if (Rise.Util.isObject(color)) {
                Rise.Logger.startGroup(true, 'Rise.Color -> init()');
                Rise.Logger.log('Trying to parse color -> %O with config -> %O', color, config);

                if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
                    Rise.Logger.log('Convert RGB -> %O', color);

                    rgb = Rise.Color.rgbToRgb(color.r, color.g, color.b);
                    valid = true;
                    format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
                    Rise.Logger.log('Convert HSV -> %O', color);

                    color.s = Rise.Color.convertDecimalToPercentage(color.s);
                    color.v = Rise.Color.convertDecimalToPercentage(color.v);
                    rgb = Rise.Color.hsvToRgb(color.h, color.s, color.v);
                    valid = true;
                    format = "hsv";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
                    Rise.Logger.log('Convert HSL -> %O', color);

                    color.s = Rise.Color.convertDecimalToPercentage(color.s);
                    color.l = Rise.Color.convertDecimalToPercentage(color.l);
                    rgb = Rise.Color.hslToRgb(color.h, color.s, color.l);
                    valid = true;
                    format = "hsl";
                } else {
                    Rise.Logger.warning('Color object -> %O not parsed', color);
                }

                if (color.hasOwnProperty('a')) {
                    alpha = color.a;
                }

                rgb.r = Math.min(255, Math.max(rgb.r, 0));
                rgb.g = Math.min(255, Math.max(rgb.g, 0));
                rgb.b = Math.min(255, Math.max(rgb.b, 0));
                alpha = Rise.Color.boundAlpha(alpha);

                this.red = rgb.r < 1 ? Math.round(rgb.r) : rgb.r;
                this.green = rgb.g < 1 ? Math.round(rgb.g) : rgb.g;
                this.blue = rgb.b < 1 ? Math.round(rgb.b) : rgb.b;
                this.alpha = alpha;
                this.valid = valid;
                this.roundA = Math.round(100 * this.alpha) / 100;
                this.format = config.format || format;
                this.gradientType = config.gradientType;

                if (!this.valid) {
                    Rise.Logger.warning('Rise.Color -> %O have errors', color);
                }

                Rise.Logger.log('Instantiated new Rise.Color instance -> %O', this);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Color -> %O not parsed', color);
            }

            return this;
        },

        /**
         * Check if this color is dark
         * @return {Boolean} Returns true if color is dark
         */
        isDark: function() {
            return this.getBrightness() < 128;
        },

        /**
         * Check if this color is light
         * @return {Boolean} Returns true if color is light
         */
        isLight: function() {
            return !this.isDark();
        },

        /**
         * Check if this color valid and successfully parsed
         * @return {Boolean} Returns true if valid
         */
        isValid: function() {
            return this.valid;
        },

        /**
         * Get format of this color
         * @return {String} Returns string with color format
         */
        getFormat: function() {
            return this.format;
        },

        /**
         * Get red channel
         * @return {Integer} Returns red channel value
         */
        getRed: function() {
            return this.red;
        },

        /**
         * Set red channel
         * @param {Integer} value Red channel in [0, 255] range
         * @return {Rise.Color} Returns Rise.Color instance
         */
        setRed: function(value) {
            this.red = Math.min(255, Math.max(value, 0));
            return this;
        },

        /**
         * Get green channel
         * @return {Integer} Returns green channel value
         */
        getGreen: function() {
            return this.green;
        },

        /**
         * Set green channel
         * @param {Integer} value Green channel in [0, 255] range
         * @return {Rise.Color} Returns Rise.Color instance
         */
        setGreen: function(value) {
            this.green = Math.min(255, Math.max(value, 0));
            return this;
        },

        /**
         * Get blue channel
         * @return {Integer} Returns blue channel value
         */
        getBlue: function() {
            return this.blue;
        },

        /**
         * Set blue channel
         * @param {Integer} value Blue channel in [0, 255] range
         * @return {Rise.Color} Returns Rise.Color instance
         */
        setBlue: function(value) {
            this.blue = Math.min(255, Math.max(value, 0));
            return this;
        },

        /**
         * Get alpha channel of this color
         * @return {Float} Returns float value of alpha channel
         */
        getAlpha: function() {
            return this.alpha;
        },

        /**
         * Set alpha channel for this color
         * @param {Float} value Float value of alpha channel in 0-1 range
         * @return {Rise.Color} Returns Rise.Color instance
         */
        setAlpha: function(value) {
            this.alpha = Rise.Color.boundAlpha(value);
            this.roundA = Math.round(100 * this.alpha) / 100;
            return this;
        },

        /**
         * Get brightness level of color
         * @return {Integer} Returns float value of brightness level
         */
        getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },

        /**
         * Convert color to HSV
         * @return {Object} Object with h, s, v, a properties
         */
        toHsv: function() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue);

            return {
                h: hsv.h * 360,
                s: hsv.s,
                v: hsv.v,
                a: this.alpha
            };
        },

        /**
         * Convert to HSV in string
         * @return {String} Returns string with HSV color
         */
        toHsvString: function() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue),
                h = Math.round(hsv.h * 360),
                s = Math.round(hsv.s * 100),
                v = Math.round(hsv.v * 100);

            return this.alpha == 1 ?
                "hsv(" + h + ", " + s + "%, " + v + "%)" :
                "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
        },

        /**
         * Convert color to HSL
         * @return {Object} Object with h, s, l, a properties
         */
        toHsl: function() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue);

            return {
                h: hsl.h * 360,
                s: hsl.s,
                l: hsl.l,
                a: this.alpha
            };
        },

        /**
         * Convert color to HSL in string
         * @return {String} Returns HSL in string
         */
        toHslString: function() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue),
                h = Math.round(hsl.h * 360),
                s = Math.round(hsl.s * 100),
                l = Math.round(hsl.l * 100);

            return (this.alpha == 1) ?
                "hsl(" + h + ", " + s + "%, " + l + "%)" :
                "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
        },

        /**
         * Convert color to HEX
         * @param  {Boolean} allow3Char Allow 3 char format or not
         * @return {String} Returns HEX value of this color
         */
        toHex: function(allow3Char) {
            return Rise.Color.rgbToHex(this.red, this.green, this.blue, allow3Char);
        },

        /**
         * Convert color to HEX string
         * @param  {Boolean} allow3Char Allow 3 char format or not
         * @return {String} Returns string with # and HEX color
         */
        toHexString: function(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },

        /**
         * Convert color to HEX 8
         * @return {String} Returns HEX string with 8 chars
         */
        toHex8: function() {
            return Rise.Color.rgbaToHex(this.red, this.green, this.blue, this.alpha);
        },

        /**
         * Convert color to HEX 8 string
         * @return {String} Returns HEX string with # and 8 chars
         */
        toHex8String: function() {
            return '#' + this.toHex8();
        },

        /**
         * Convert color to RGB
         * @return {Object} Returns object with r, g, b, a properties
         */
        toRgb: function() {
            return {
                r: Math.round(this.red),
                g: Math.round(this.green),
                b: Math.round(this.blue),
                a: this.alpha
            };
        },

        /**
         * Convert color to RGB string
         * @return {String} Returns RGB string
         */
        toRgbString: function() {
            return (this.alpha == 1) ?
                "rgb(" + Math.round(this.red) + ", " + Math.round(this.green) + ", " + Math.round(this.blue) + ")" :
                "rgba(" + Math.round(this.red) + ", " + Math.round(this.green) + ", " + Math.round(this.blue) + ", " + this.roundA + ")";
        },

        /**
         * Convert color to RGB in percentage format
         * @return {Object} Returns object with r,g,b,a properties in percentage
         */
        toPercentageRgb: function() {
            return {
                r: Math.round(Rise.Color.bound01(this.red, 255) * 100) + "%",
                g: Math.round(Rise.Color.bound01(this.green, 255) * 100) + "%",
                b: Math.round(Rise.Color.bound01(this.blue, 255) * 100) + "%",
                a: this.alpha
            };
        },

        /**
         * Convert color to RGB string in percentage format
         * @return {String} Returns RGB string in percentage format
         */
        toPercentageRgbString: function() {
            return (this.alpha == 1) ?
                "rgb(" + Math.round(Rise.Color.bound01(this.red, 255) * 100) + "%, " + Math.round(Rise.Color.bound01(this.green, 255) * 100) + "%, " + Math.round(Rise.Color.bound01(this.blue, 255) * 100) + "%)" :
                "rgba(" + Math.round(Rise.Color.bound01(this.red, 255) * 100) + "%, " + Math.round(Rise.Color.bound01(this.green, 255) * 100) + "%, " + Math.round(Rise.Color.bound01(this.blue, 255) * 100) + "%, " + this.roundA + ")";
        },

        /**
         * Convert this color to name string
         * @return {String|Boolean} Returns color name in user friendly notation or false if couldn't detect
         */
        toName: function() {
            if (this.alpha === 0) {
                return "transparent";
            }

            if (this.alpha < 1) {
                return false;
            }

            return Rise.Color.hexNamesMap[Rise.Color.rgbToHex(this.red, this.green, this.blue).toUpperCase()] || false;
        },

        /**
         * Convert color to DX Filter notation
         * @param  {String} secondColor Second color
         * @return {String} Returns DX Filter format for this color
         */
        toFilterString: function(secondColor) {
            var hex8String = '#' + Rise.Color.rgbaToHex(this.red, this.green, this.blue, this.alpha),
                secondHex8String = secondColor ? new Rise.Color(secondColor).toHex8String() : hex8String,
                gradientType = this.gradientType ? "GradientType = 1, " : "";

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },

        /**
         * Print a string color depending on input format
         * @param  {String} format Custom format
         * @return {String} Returns string of this color depending of input format or custom format
         */
        toString: function(format) {
            format = format || this.format;

            var formattedString = false;

            if (format === "rgb") {
                formattedString = this.toRgbString();
            } else if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            } else if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            } else if (format === "hex3") {
                formattedString = this.toHexString(true);
            } else if (format === "hex8") {
                formattedString = this.toHex8String();
            } else if (format === "name") {
                formattedString = this.toName();
            } else if (format === "hsl") {
                formattedString = this.toHslString();
            } else if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },

        /**
         * Make color more lighten
         * @param {Integer} amount Custom amount for lighten level in [0, 100] range
         * @return {Rise.Color} Returns new color
         */
        lighten: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l += amount / 100;
            hsl.l = Rise.Color.clamp01(hsl.l);

            return new Rise.Color(hsl);
        },

        /**
         * Make color more brighten
         * @param {Integer} amount Custom amount for brighten level in 0-100 range
         * @return {Rise.Color} Returns new color
         */
        brighten: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var rgb = this.toRgb();
            rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
            rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
            rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));

            return new Rise.Color(rgb);
        },

        /**
         * Make color more darken
         * @param {Integer} amount Custom amount for darken level in 0-100 range
         * @return {Rise.Color} Returns new color
         */
        darken: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l -= amount / 100;
            hsl.l = Rise.Color.clamp01(hsl.l);

            return new Rise.Color(hsl);
        },

        /**
         * Desaturate the color
         * @param {Integer} amount Custom amount for desaturate in 0-100 range
         * @return {Rise.Color} Returns new color
         */
        desaturate: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s -= amount / 100;
            hsl.s = Rise.Color.clamp01(hsl.s);

            return new Rise.Color(hsl);
        },

        /**
         * Saturate the color
         * @param {Integer} amount Custom amount for saturate level in [0, 100] range
         * @return {Rise.Color} Returns new color
         */
        saturate: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s += amount / 100;
            hsl.s = Rise.Color.clamp01(hsl.s);

            return new Rise.Color(hsl);
        },

        /**
         * Completely desaturate the color
         * @return {Rise.Color} Returns new color
         */
        greyscale: function() {
            return this.desaturate(100);
        },

        /**
         * Spin the hue level for a given amount
         * @param {Integer} amount Custom amount for spin from -360 to 360 range
         * @return {Rise.Color} Returns new color
         */
        spin: function(amount) {
            var hsl = this.toHsl(),
                hue = (Math.round(hsl.h) + amount) % 360;

            hsl.h = hue < 0 ? 360 + hue : hue;

            return new Rise.Color(hsl);
        },

        /**
         * Get analogous combinations for this color
         * @param {Integer} results Count of results
         * @param {Integer} slices Count of slices
         * @return {Array} Returns array of Rise.Color
         */
        getAnalogous: function(results, slices) {
            results = results || 6;
            slices = slices || 30;

            var hsl = this.toHsl(),
                part = 360 / slices,
                result = [new Rise.Color(this)];

            for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results;) {
                hsl.h = (hsl.h + part) % 360;
                result.push(new Rise.Color(hsl));
            }

            return result;
        },

        /**
         * Get complementary combinations for this color
         * @return {Rise.Color} Returns Rise.Color instance with complementary color
         */
        getComplementary: function() {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new Rise.Color(hsl);
        },

        /**
         * Get monochromatic combinations for this color
         * @param {Integer} results Count of results
         * @return {Array} Returns array of Rise.Color
         */
        getMonochromatic: function(results) {
            results = results || 6;

            var hsv = this.toHsv(),
                h = hsv.h,
                s = hsv.s,
                v = hsv.v,
                result = [],
                modification = 1 / results;

            while (results--) {
                result.push(new Rise.Color({
                    h: h,
                    s: s,
                    v: v
                }));
                v = (v + modification) % 1;
            }

            return result;
        },

        /**
         * Get splitcomplement combinations for this color
         * @return {Array} Returns array of Rise.Color
         */
        getSplitComplementary: function() {
            var hsl = this.toHsl(),
                h = hsl.h;

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (h + 72) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (h + 216) % 360,
                    s: hsl.s,
                    l: hsl.l
                })
            ];
        },

        /**
         * Get triad combinations for this color
         * @return {Array} Returns array of Rise.Color
         */
        getTriad: function() {
            var hsl = this.toHsl(),
                h = hsl.h;

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (h + 120) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (h + 240) % 360,
                    s: hsl.s,
                    l: hsl.l
                })
            ];
        },

        /**
         * Get tetrad combinations for this color
         * @return {Array} Returns array of Rise.Color
         */
        getTetrad: function() {
            var hsl = this.toHsl(),
                h = hsl.h;

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (h + 90) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (h + 180) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (h + 270) % 360,
                    s: hsl.s,
                    l: hsl.l
                })
            ];
        }
    }, {
        /**
         * Map of CSS colours. This map simplify select colours when set by name i.e. 'aqua'.
         * @type {Object}
         * @static
         */
        colorNamesMap: {
            aliceblue: "F0F8FF",
            antiquewhite: "FAEBD7",
            aqua: "00FFFF",
            aquamarine: "7FFFD4",
            azure: "F0FFFF",
            beige: "F5F5DC",
            bisque: "FFE4C4",
            black: "000000",
            blanchedalmond: "FFEBCD",
            blue: "0000FF",
            blueviolet: "8A2BE2",
            brown: "A52A2A",
            burlywood: "DEB887",
            burntsienna: "EA7E5D",
            cadetblue: "5F9EA0",
            chartreuse: "7FFF00",
            chocolate: "D2691E",
            coral: "FF7F50",
            cornflowerblue: "6495ED",
            cornsilk: "FFF8DC",
            crimson: "DC143C",
            cyan: "00FFFF",
            darkblue: "00008B",
            darkcyan: "008B8B",
            darkgoldenrod: "B8860B",
            darkgray: "A9A9A9",
            darkgreen: "006400",
            darkgrey: "A9A9A9",
            darkkhaki: "BDB76B",
            darkmagenta: "8B008B",
            darkolivegreen: "556B2F",
            darkorange: "FF8C00",
            darkorchid: "9932CC",
            darkred: "8B0000",
            darksalmon: "E9967A",
            darkseagreen: "8FBC8F",
            darkslateblue: "483D8B",
            darkslategray: "2F4F4F",
            darkslategrey: "2F4F4F",
            darkturquoise: "00CED1",
            darkviolet: "9400D3",
            deeppink: "FF1493",
            deepskyblue: "00BFFF",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1E90FF",
            firebrick: "B22222",
            floralwhite: "FFFAF0",
            forestgreen: "228B22",
            fuchsia: "FF00FF",
            gainsboro: "DCDCDC",
            ghostwhite: "F8F8FF",
            gold: "FFD700",
            goldenrod: "DAA520",
            gray: "808080",
            green: "008000",
            greenyellow: "ADFF2F",
            grey: "808080",
            honeydew: "F0FFF0",
            hotpink: "FF69B4",
            indianred: "CD5C5C",
            indigo: "4B0082",
            ivory: "FFFFF0",
            khaki: "F0E68C",
            lavender: "E6E6FA",
            lavenderblush: "FFF0F5",
            lawngreen: "7CFC00",
            lemonchiffon: "FFFACD",
            lightblue: "ADD8E6",
            lightcoral: "F08080",
            lightcyan: "E0FFFF",
            lightgoldenrodyellow: "FAFAD2",
            lightgray: "D3D3D3",
            lightgreen: "90EE90",
            lightgrey: "D3D3D3",
            lightpink: "FFB6C1",
            lightsalmon: "FFA07A",
            lightseagreen: "20B2AA",
            lightskyblue: "87CEFA",
            lightslategray: "778899",
            lightslategrey: "778899",
            lightsteelblue: "B0C4DE",
            lightyellow: "FFFFE0",
            lime: "00FF00",
            limegreen: "32CD32",
            linen: "FAF0E6",
            magenta: "FF00FF",
            maroon: "800000",
            mediumaquamarine: "66CDAA",
            mediumblue: "0000CD",
            mediumorchid: "BA55D3",
            mediumpurple: "9370DB",
            mediumseagreen: "3CB371",
            mediumslateblue: "7B68EE",
            mediumspringgreen: "00FA9A",
            mediumturquoise: "48D1CC",
            mediumvioletred: "C71585",
            midnightblue: "191970",
            mintcream: "F5FFFA",
            mistyrose: "FFE4E1",
            moccasin: "FFE4B5",
            navajowhite: "FFDEAD",
            navy: "000080",
            oldlace: "FDF5E6",
            olive: "808000",
            olivedrab: "6B8E23",
            orange: "FFA500",
            orangered: "FF4500",
            orchid: "DA70D6",
            palegoldenrod: "EEE8AA",
            palegreen: "98FB98",
            paleturquoise: "AFEEEE",
            palevioletred: "DB7093",
            papayawhip: "FFEFD5",
            peachpuff: "FFDAB9",
            peru: "CD853F",
            pink: "FFC0CB",
            plum: "DDA0DD",
            powderblue: "B0E0E6",
            purple: "800080",
            red: "FF0000",
            rosybrown: "BC8F8F",
            royalblue: "4169E1",
            saddlebrown: "8B4513",
            salmon: "FA8072",
            sandybrown: "F4A460",
            seagreen: "2E8B57",
            seashell: "FFF5EE",
            sienna: "A0522D",
            silver: "C0C0C0",
            skyblue: "87CEEB",
            slateblue: "6A5ACD",
            slategray: "708090",
            slategrey: "708090",
            snow: "FFFAFA",
            springgreen: "00FF7F",
            steelblue: "4682B4",
            tan: "D2B48C",
            teal: "008080",
            thistle: "D8BFD8",
            tomato: "FF6347",
            turquoise: "40E0D0",
            violet: "EE82EE",
            wheat: "F5DEB3",
            white: "FFFFFF",
            whitesmoke: "F5F5F5",
            yellow: "FFFF00",
            yellowgreen: "9ACD32"
        },

        /**
         * IIFE that returns object with regex for color's strings
         * @return {Object}
         * @static
         */
        colorRegexMap: (function() {
            var cssInteger = "[-\\+]?\\d+%?",
                cssNumber = "[-\\+]?\\d*\\.\\d+%?",
                cssUnit = "(?:" + cssNumber + ")|(?:" + cssInteger + ")",
                permissiveMatch3 = "[\\s|\\(]+(" + cssUnit + ")[,|\\s]+(" + cssUnit + ")[,|\\s]+(" + cssUnit + ")\\s*\\)?",
                permissiveMatch4 = "[\\s|\\(]+(" + cssUnit + ")[,|\\s]+(" + cssUnit + ")[,|\\s]+(" + cssUnit + ")[,|\\s]+(" + cssUnit + ")\\s*\\)?";

            return {
                rgb: new RegExp("rgb" + permissiveMatch3),
                rgba: new RegExp("rgba" + permissiveMatch4),
                hsl: new RegExp("hsl" + permissiveMatch3),
                hsla: new RegExp("hsla" + permissiveMatch4),
                hsv: new RegExp("hsv" + permissiveMatch3),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            };
        })(),

        /**
         * Set bounds for alpha channel to [0, 1] range
         * @param  {Float} alpha Alpha value
         * @return {Float}       Returns incoming value if in bound and 1 otherwise
         * @static
         */
        boundAlpha: function(alpha) {
            alpha = parseFloat(alpha);

            if (isNaN(alpha) || alpha < 0 || alpha > 1) {
                alpha = 1;
            }

            return alpha;
        },

        /**
         * Set bounds to values in [0, 1] range
         * @param  {Integer} value Value that need to bound
         * @param  {Integer} max Maximum value
         * @return {Float} Returns float in [0, 1] range
         * @static
         * @example
         * Rise.Color.bound01(40, 100); // 0.4
         */
        bound01: function(value, max) {
            value = Rise.Color.isOnePointZero(value) ? '100%' : value;

            var isPercentageValue = Rise.Color.isPercentage(value);
            value = Math.min(max, Math.max(0, parseFloat(value)));

            if (isPercentageValue) {
                value = parseInt(value * max, 10) / 100;
            }

            if (Math.abs(value - max) < 0.000001) {
                return 1;
            }

            return (value % max) / parseFloat(max);
        },

        /**
         * Force a number between 0 and 1
         * @param  {Integer} value Value that need to clamp
         * @return {Integer} Returns clamped integer
         * @static
         * @example
         * Rise.Color.clamp01(2); // 1
         * Rise.Color.clamp01(0.4); // 0.4
         */
        clamp01: function(value) {
            return Math.min(1, Math.max(0, value));
        },

        /**
         * Force a HEX value to have 2 chars
         * @param  {String} value Value that must be padded
         * @return {String}       Returns padded string
         * @static
         * @example
         * Rise.Color.pad2('F'); // 0F
         * Rise.Color.pad2('FF'); // FF
         */
        pad2: function(value) {
            return value.length == 1 ? '0' + value : '' + value;
        },

        /**
         * Check if number is 1.0
         * @param  {Float}  value Value for check
         * @return {Boolean}      Returns true if 1.0
         * @static
         */
        isOnePointZero: function(value) {
            return (
                Rise.Util.isString(value) &&
                value.indexOf('.') != -1 &&
                parseFloat(value) === 1
            );
        },

        /**
         * Check if value is percentage
         * @param  {String} value Value that might be checked
         * @return {Boolean}      Returns true if percentage value
         * @static
         */
        isPercentage: function(value) {
            return Rise.Util.isString(value) && value.indexOf('%') != -1;
        },

        /**
         * Parse a base-16 hex value into a base-10 integer
         * @param  {String} value HEX value
         * @return {Integer}      Returns parsed integer
         * @static
         */
        convertHexToInteger: function(value) {
            return parseInt(value, 16);
        },

        /**
         * Replace a decimal with it's percentage value
         * @param  {Integer} value Decimal value
         * @return {String}        Returns this value in percentage value
         * @static
         */
        convertDecimalToPercentage: function(value) {
            if (value <= 1) {
                value = (value * 100) + "%";
            }

            return value;
        },

        /**
         * Convert the decimal to HEX value
         * @param  {Integer} value Decimal value
         * @return {String}        Returns HEX string
         * @static
         */
        convertDecimalToHex: function(value) {
            return Math.round(parseFloat(value) * 255).toString(16);
        },

        /**
         * Convert the HEX value to decimal
         * @param  {String} value HEX value
         * @return {Integer}      Returns decimal value
         * @static
         */
        convertHexToDecimal: function(value) {
            return Rise.Color.convertHexToInteger(value) / 255;
        },

        /**
         * Convert RGB colour to RGB.
         * Better to use this because here processing handling of bound or percentage in RGB profile.
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}    Object with r, g, b properties
         * @static
         */
        rgbToRgb: function(r, g, b) {
            return {
                r: Rise.Color.bound01(r, 255) * 255,
                g: Rise.Color.bound01(g, 255) * 255,
                b: Rise.Color.bound01(b, 255) * 255
            };
        },

        /**
         * Convert RGB colour to HSL
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}    Object with h, s, l properties
         * @static
         */
        rgbToHsl: function(r, g, b) {
            r = Rise.Color.bound01(r, 255);
            g = Rise.Color.bound01(g, 255);
            b = Rise.Color.bound01(b, 255);

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0;
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }

                h /= 6;
            }

            return {
                h: h,
                s: s,
                l: l
            };
        },

        /**
         * Convert HSL colour to RGB
         * @param  {Integer} h Hue channel
         * @param  {Integer} s Saturation channel
         * @param  {Integer} l Lightness channel
         * @return {Object}    Object with r,g,b properties
         * @static
         */
        hslToRgb: function(h, s, l) {
            h = Rise.Color.bound01(h, 360);
            s = Rise.Color.bound01(s, 100);
            l = Rise.Color.bound01(l, 100);

            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var r, g, b;

            if (s === 0) {
                r = g = b = l;
            } else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                    p = 2 * l - q;

                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return {
                r: r * 255,
                g: g * 255,
                b: b * 255
            };
        },

        /**
         * Convert RGB colour to HSV
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}    Object with h, s, v properties
         * @static
         */
        rgbToHsv: function(r, g, b) {
            r = Rise.Color.bound01(r, 255);
            g = Rise.Color.bound01(g, 255);
            b = Rise.Color.bound01(b, 255);

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                h, s, v = max,
                d = max - min;

            s = max === 0 ? 0 : d / max;

            if (max == min) {
                h = 0;
            } else {
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }

                h /= 6;
            }

            return {
                h: h,
                s: s,
                v: v
            };
        },

        /**
         * Convert HSV colour to RGB
         * @param  {Integer} h Hue channel
         * @param  {Integer} s Saturation channel
         * @param  {Integer} v Value channel
         * @return {Object}    Object with r,g,b properties
         * @static
         */
        hsvToRgb: function(h, s, v) {
            h = Rise.Color.bound01(h, 360) * 6;
            s = Rise.Color.bound01(s, 100);
            v = Rise.Color.bound01(v, 100);

            var i = Math.floor(h),
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6,
                r = [v, q, p, p, t, v][mod],
                g = [t, v, v, q, p, p][mod],
                b = [p, p, t, v, v, q][mod];

            return {
                r: r * 255,
                g: g * 255,
                b: b * 255
            };
        },

        /**
         * Convert RGB colour to HEX
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @param  {Boolean} allow3Char Allow 3 char notation in HEX
         * @return {String} HEX in string
         * @static
         */
        rgbToHex: function(r, g, b, allow3Char) {
            var hex = [
                Rise.Color.pad2(Math.round(r).toString(16)),
                Rise.Color.pad2(Math.round(g).toString(16)),
                Rise.Color.pad2(Math.round(b).toString(16))
            ];

            if (
                allow3Char &&
                hex[0].charAt(0) == hex[0].charAt(1) &&
                hex[1].charAt(0) == hex[1].charAt(1) &&
                hex[2].charAt(0) == hex[2].charAt(1)
            ) {
                return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
            }

            return hex.join("");
        },

        /**
         * Convert RGBA colour to HEX
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @param  {Float} a Alpha channel
         * @return {String}   Returns HEX 8 string
         * @static
         */
        rgbaToHex: function(r, g, b, a) {
            var hex = [
                Rise.Color.pad2(Rise.Color.convertDecimalToHex(a)),
                Rise.Color.pad2(Math.round(r).toString(16)),
                Rise.Color.pad2(Math.round(g).toString(16)),
                Rise.Color.pad2(Math.round(b).toString(16))
            ];

            return hex.join("");
        },

        /**
         * Create new Rise.Color instance from string colour
         * @param  {String} color String representation of colour
         * @return {Rise.Color}   Returns Rise.Color instance
         */
        fromString: function(color, config) {
            var trimLeft = /^[\s,#]+/,
                trimRight = /\s+$/,
                named = false,
                match;

            color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();

            if (Rise.Color.colorNamesMap[color]) {
                color = Rise.Color.colorNamesMap[color];
                named = true;
            } else if (color == 'transparent') {
                return new Rise.Color({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }, {
                    format: "name"
                });
            }

            if ((match = Rise.Color.colorRegexMap.rgb.exec(color))) {
                return new Rise.Color({
                    r: match[1],
                    g: match[2],
                    b: match[3]
                }, config);
            } else if ((match = Rise.Color.colorRegexMap.rgba.exec(color))) {
                return new Rise.Color({
                    r: match[1],
                    g: match[2],
                    b: match[3],
                    a: match[4]
                }, config);
            } else if ((match = Rise.Color.colorRegexMap.hsl.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3]
                }, config);
            } else if ((match = Rise.Color.colorRegexMap.hsla.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3],
                    a: match[4]
                }, config);
            } else if ((match = Rise.Color.colorRegexMap.hsv.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    v: match[3]
                }, config);
            } else if ((match = Rise.Color.colorRegexMap.hex8.exec(color))) {
                return new Rise.Color({
                    a: Rise.Color.convertHexToDecimal(match[1]),
                    r: Rise.Color.convertHexToInteger(match[2]),
                    g: Rise.Color.convertHexToInteger(match[3]),
                    b: Rise.Color.convertHexToInteger(match[4]),
                }, {
                    format: config.format || (named ? "name" : "hex8")
                });
            } else if ((match = Rise.Color.colorRegexMap.hex6.exec(color))) {
                return new Rise.Color({
                    r: Rise.Color.convertHexToInteger(match[1]),
                    g: Rise.Color.convertHexToInteger(match[2]),
                    b: Rise.Color.convertHexToInteger(match[3]),
                }, {
                    format: config.format || (named ? "name" : "hex")
                });
            } else if ((match = Rise.Color.colorRegexMap.hex3.exec(color))) {
                return new Rise.Color({
                    r: Rise.Color.convertHexToInteger(match[1] + '' + match[1]),
                    g: Rise.Color.convertHexToInteger(match[2] + '' + match[2]),
                    b: Rise.Color.convertHexToInteger(match[3] + '' + match[3]),
                }, {
                    format: config.format || (named ? "name" : "hex")
                });
            } else {
                Rise.Logger.warning('Color -> %O not parsed', color);
                return false;
            }

            return false;
        },

        /**
         * Create Rise.Color from ratio
         * @param  {Object|String} color  Can be object with r, g, b, a properties or string
         * @param  {Object} config Configuration object
         * @return {Rise.Color}
         * @static
         */
        fromRatio: function(color, config) {
            var newColor = {};

            if (Rise.Util.isObject(color)) {
                Object.keys(color).forEach(function(key) {
                    if (key === "a") {
                        newColor[key] = color[key];
                    } else {
                        newColor[key] = Rise.Color.convertDecimalToPercentage(color[key]);
                    }
                });

                color = newColor;
            }

            return new Rise.Color(color, config);
        },

        /**
         * Check if two colors are equals
         * @param  {String} firstColor  First color
         * @param  {String} secondColor Second color
         * @return {Boolean}            True if colors equals and false otherwise
         * @static
         */
        equals: function(firstColor, secondColor) {
            if (!firstColor || !secondColor) {
                return false;
            }

            return new Rise.Color(firstColor).toRgbString() == new Rise.Color(secondColor).toRgbString();
        },

        /**
         * Generate random color and return it
         * @return {Rise.Color} Random color
         * @static
         */
        random: function() {
            return Rise.Color.fromRatio({
                r: Math.random(),
                g: Math.random(),
                b: Math.random()
            });
        },

        /**
         * Mix 2 colors
         * @param  {String} color1  First color
         * @param  {String} color2  Second color
         * @param  {Integer} amount Amount of mix
         * @return {Rise.Color}     Returns mixed color
         * @static
         */
        mix: function(firstColor, secondColor, amount) {
            amount = amount === 0 ? 0 : (amount || 50);

            var rgbA = new Rise.Color(firstColor).toRgb(),
                rgbB = new Rise.Color(secondColor).toRgb(),
                p = amount / 100,
                w = p * 2 - 1,
                a = rgbB.a - rgbA.a,
                w1,
                w2;

            if (w * a == -1) {
                w1 = w;
            } else {
                w1 = (w + a) / (1 + w * a);
            }

            w1 = (w1 + 1) / 2;
            w2 = 1 - w1;

            return new Rise.Color({
                r: rgbB.r * w1 + rgbA.r * w2,
                g: rgbB.g * w1 + rgbA.g * w2,
                b: rgbB.b * w1 + rgbA.b * w2,
                a: rgbB.a * p + rgbA.a * (1 - p)
            });
        }
    });

    /**
     * Map of HEX colours names.
     * HEX value as key and it name as value in object.
     * @type {Object}
     * @static
     */
    Rise.Color.hexNamesMap = Rise.Util.flipObject(Rise.Color.colorNamesMap);
})(this);
(function(global) {
    'use strict';

    global.Rise.Font = Rise.Class.create({
        /**
         * Create new Rise.Font instance
         * @constructor
         * @param  {Element|String|Object} options Font options
         * @return {Rise.Font}                     Returns Rise.Font instance
         * @example
         * new Rise.Font({
         *     style: 'normal',
         *     variant: 'normal',
         *     weight: 'normal',
         *     size: 'medium',
         *     lineHeight: 'normal',
         *     family: 'serif'
         * });
         */
        init: function(font) {
            font = font || {};

            if (font instanceof Rise.Font) {
                return font;
            } else if (Rise.Util.isString(font)) {
                return Rise.Font.fromString(font);
            } else if (font instanceof Element) {
                return Rise.Font.fromNode(font);
            } else if (Rise.Util.isObject(font)) {
                Rise.Logger.startGroup(true, 'Rise.Font -> init()');
                Rise.Logger.log('Trying to parse font object -> %O', font);

                this.style = font.style || 'normal';
                this.variant = font.variant || 'normal';
                this.weight = font.weight || 'normal';
                this.size = font.size || 'medium';
                this.lineHeight = font.lineHeight || 'normal';
                this.family = font.family || 'serif';

                if (!Rise.Font.isFontValid(this)) {
                    Rise.Logger.warning('Rise.Font -> Something wrong with font -> %O', font);
                }

                Rise.Logger.log('Instantiated Rise.Font -> %O', this);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Font -> %O not parsed', font);
                return false;
            }

            return this;
        },

        /**
         * Check if Rise.Font is valid instance
         * @return {Boolean} Returns true if Rise.Font instance valid
         * @example
         * new Rise.Font().isValid(); // true
         */
        isValid: function() {
            return Rise.Font.isFontValid(this);
        },

        /**
         * Get current style
         * @return {String} Returns CSS font style
         * @example
         * new Rise.Font().getStyle();
         */
        getStyle: function() {
            return this.style;
        },

        /**
         * Set style to Rise.Font
         * @param {String} style New CSS font style
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setStyle('normal');
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
         * @example
         * new Rise.Font().getVariant();
         */
        getVariant: function() {
            return this.variant;
        },

        /**
         * Set font variant to Rise.Font
         * @param {String} variant New CSS font variant
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setVariant('normal');
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
         * @example
         * new Rise.Font().getWeight();
         */
        getWeight: function() {
            return this.weight;
        },

        /**
         * Set font weight to Rise.Font
         * @param {String} weight New CSS font weight
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setWeight('normal')
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
         * @example
         * new Rise.Font().getSize();
         */
        getSize: function() {
            return this.size;
        },

        /**
         * Set font size to Rise.Font
         * @param {String} size New CSS font size
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setSize('medium');
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
         * @example
         * new Rise.Font().getLineHeight();
         */
        getLineHeight: function() {
            return this.lineHeight;
        },

        /**
         * Set font line height to Rise.Font
         * @param {String} lineHeight New CSS font line-height
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setLineHeight('normal');
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
         * @example
         * new Rise.Font().getFamily();
         */
        getFamily: function() {
            return this.family;
        },

        /**
         * Set font family to Rise.Font
         * @param {String} family New CSS font family
         * @return {Rise.Font} Returns Rise.Font instance
         * @example
         * new Rise.Font().setFamily('serif');
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
         * @example
         * new Rise.Font().toString();
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
         * @param {Boolean} [startCollapsed] If first argument true, group will be collapsed
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

    global.Rise.RQuery = Rise.Class.create({
        /**
         * Create new Rise.RQuery instance
         * @constructor
         * @param  {String|Rise.RQuery|Element|Array} selector Selector or exists Element
         * @param  {Element|Document|Window} parent Parent from where selector will parse
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         * @example
         * new Rise.RQuery('.selector');
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
         * @example
         * Rise.$('body').count(); // 1
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
         * Trigger native mouse event for node
         * @param  {String} eventName Name of event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('button').triggerMouseEvent('click');
         */
        triggerMouseEvent: function(eventName) {
            var event = document.createEvent('MouseEvents'),
                element = this.get(0);

            event.initMouseEvent(eventName, true, false, window);
            element.dispatchEvent(event);

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
            } else if (Rise.Util.isObject(shadow)) {
                Rise.Logger.startGroup(true, 'Rise.Shadow -> init()');
                Rise.Logger.log('Trying to parse options -> %O', shadow);

                this.color = shadow.color ? new Rise.Color(shadow.color) : new Rise.Color('black');
                this.blur = shadow.blur || 0;
                this.offsetX = shadow.offsetX || 0;
                this.offsetY = shadow.offsetY || 0;

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
})(this);