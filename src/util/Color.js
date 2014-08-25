////////////////////////////////////////////////
// TinyColor v1.0.0                           //
// https://github.com/bgrins/tinycolor        //
// Brian Grinstead, MIT License               //
// Refactored and modified by Eugene Obrezkov //
////////////////////////////////////////////////
(function(global) {
    'use strict';

    global.Rise.Color = Rise.Class.extend({
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
         *     b: 255,
         *     a: 1
         * })
         */

        init: function() {
            color = color || 'black';
            config = config || {};

            if (color instanceof Rise.Color) {
                return color;
            }

            Rise.Logger.startGroup(true, 'Rise.Color -> init()');
            Rise.Logger.log('Trying to parse color -> %O with config -> %O', color, config);

            var rgb = Rise.Color.inputToRgb(color);

            this.red = rgb.r < 1 ? Math.round(rgb.r) : rgb.r;
            this.green = rgb.g < 1 ? Math.round(rgb.g) : rgb.g;
            this.blue = rgb.b < 1 ? Math.round(rgb.b) : rgb.b;
            this.alpha = rgb.a;
            this.valid = rgb.valid;
            this.roundA = Math.round(100 * this.alpha) / 100;
            this.format = config.format || rgb.format;
            this.gradientType = config.gradientType;

            if (!this.valid) {
                Rise.Logger.warning('Color -> %O have errors', color);
            }

            Rise.Logger.log('Instantiated new Rise.Color instance -> %O', this);
            Rise.Logger.endGroup();

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
         * Get alpha channel of this color
         * @return {Float} Returns float value of alpha channel
         */
        getAlpha: function() {
            return this.alpha;
        },

        /**
         * Set alpha channel for this color
         * @param {Float} value Float value of alpha channel in 0-1 range
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
         * @return {Object} Object with h,s,v,a properties
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
         * @return {Object} Object with h,s,l,a properties
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
         * @return {Object} Returns object with r,g,b,a properties
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
                r: Math.round(bound01(this.red, 255) * 100) + "%",
                g: Math.round(bound01(this.green, 255) * 100) + "%",
                b: Math.round(bound01(this.blue, 255) * 100) + "%",
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

            return Rise.Color.hexNamesMap[Rise.Color.rgbToHex(this.red, this.green, this.blue, true)] || false;
        },

        /**
         * Convert color to DX Filter notation
         * @param  {String} secondColor Second color
         * @return {String} Returns DX Filter format for this color
         */
        toFilter: function(secondColor) {
            var hex8String = '#' + Rise.Color.rgbaToHex(this.red, this.green, this.blue, this.alpha),
                secondHex8String = hex8String,
                gradientType = this.gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                secondHex8String = new Rise.Color(secondColor).toHex8String();
            }

            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },

        /**
         * Print a string color depending on input format
         * @param  {String} format Custom format
         * @return {String} Returns string of this color depending of input format or custom format
         */
        toString: function(format) {
            format = format || this.format;

            var isFormatSet = !!format,
                formattedString = false,
                hasAlpha = this.alpha < 1 && this.alpha >= 0,
                needsAlphaFormat = (
                    hasAlpha &&
                    !isFormatSet &&
                    (
                        format === "hex" ||
                        format === "hex6" ||
                        format === "hex3" ||
                        format === "name"
                    ));

            if (needsAlphaFormat) {
                if (format === "name" && this.alpha === 0) {
                    return this.toName();
                }

                return this.toRgbString();
            } else if (format === "rgb") {
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
         * @param {Integer} amount Custom amount for lighten level in 0-100 range
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
            hsl.s = clamp01(hsl.s);

            return new Rise.Color(hsl);
        },

        /**
         * Saturate the color
         * @param {Integer} amount Custom amount for saturate level in 0-100 range
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
        analogous: function(results, slices) {
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
         * Get complement combinations for this color
         * @return {Array} Returns array of Rise.Color
         */
        complement: function() {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new Rise.Color(hsl);
        },

        /**
         * Get monochromatic combinations for this color
         * @param {Integer} results Count of results
         * @return {Array} Returns array of Rise.Color
         */
        monochromatic: function(results) {
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
        splitComplement: function() {
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
        triad: function() {
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
        tetrad: function() {
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
         * Map of CSS colours.
         * This map simplify select colours when Rise.Color('aqua') i.e. called.
         * @type {Object}
         * @private
         */
        cssColorNamesMap: {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        },

        /**
         * Map of HEX colours names.
         * HEX value as key and it name as value in object.
         * @type {Object}
         * @private
         */
        hexNamesMap: Rise.Color.flip(cssColorNamesMap),

        /**
         * Flip key-values in object
         * @param  {Object} object Object which you want to flip
         * @return {Object} Returns flipped object
         * @private
         */
        flip: function(object) {
            var flipped = {};

            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    flipped[object[i]] = i;
                }
            }

            return flipped;
        },

        /**
         * Bounds alpha channel to [0, 1] range
         * @param  {Float} a Alpha value
         * @return {Float}   Returns incoming value if valid and 1 otherwise
         * @private
         */
        boundAlpha: function(a) {
            a = parseFloat(a);

            if (isNaN(a) || a < 0 || a > 1) {
                a = 1;
            }

            return a;
        },

        /**
         * Bound values to [0, 1] range
         * @param  {Integer} n
         * @param  {Integer} max
         * @return {Float}
         * @private
         */
        bound01: function(value, max) {
            if (isOnePointZero(value)) {
                value = "100%";
            }

            var isPercentageValue = isPercentage(value);
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
         * @param  {Integer} value
         * @return {Integer}
         * @private
         */
        clamp01: function(value) {
            return Math.min(1, Math.max(0, value));
        },

        /**
         * Parse a base-16 hex value into a base-10 integer
         * @param  {String} value HEX value
         * @return {Integer}    Returns parsed number
         * @private
         */
        parseIntFromHex: function(value) {
            return parseInt(value, 16);
        },

        /**
         * Check if number it's 1.0
         * @param  {Float}  value Value for check
         * @return {Boolean}   Returns true if it's 1.0
         * @private
         */
        isOnePointZero: function(value) {
            return Rise.Util.getType(value) == 'string' && value.indexOf('.') != -1 && parseFloat(value) === 1;
        },

        /**
         * Check if string is a percentage
         * @param  {String} value Value that might be checked
         * @return {Boolean} True if percentage
         * @private
         */
        isPercentage: function(value) {
            return Rise.Util.getType(value) == 'string' && value.indexOf('%') != -1;
        },

        /**
         * Force a HEX value to have 2 chars
         * @param  {String} c Value that must be padded
         * @return {String} Returns padded string
         * @private
         */
        pad2: function(value) {
            return value.length == 1 ? '0' + value : '' + value;
        },

        /**
         * Replace a decimal with it's percentage value
         * @param  {Integer} n Decimal value
         * @return {String}   Returns this value in percentage value
         * @private
         */
        convertToPercentage: function(value) {
            if (value <= 1) {
                value = (value * 100) + "%";
            }

            return value;
        },

        /**
         * Convert a decimal to a HEX value
         * @param  {Integer} value Decimal value
         * @return {String} Returns HEX string
         * @private
         */
        convertDecimalToHex: function(value) {
            return Math.round(parseFloat(value) * 255).toString(16);
        },

        /**
         * Convert a HEX value to a decimal
         * @param  {String} value HEX value
         * @return {Integer}   Returns decimal value
         * @private
         */
        convertHexToDecimal: function(value) {
            return (parseIntFromHex(value) / 255);
        },

        /**
         * IIFE that returns object with regex for color's strings
         * @return {Object}
         * @private
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
         * Parse string by regex and returns object
         * @param  {String} color Color in string
         * @return {Object} Object with format property and values for colour profile
         * @private
         */
        stringToObject: function(color) {
            var trimLeft = /^[\s,#]+/,
                trimRight = /\s+$/,
                named = false,
                match;

            color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();

            if (cssColorNamesMap[color]) {
                color = cssColorNamesMap[color];
                named = true;
            } else if (color == 'transparent') {
                return {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    format: "name"
                };
            }

            if ((match = colorRegexMap.rgb.exec(color))) {
                return {
                    r: match[1],
                    g: match[2],
                    b: match[3]
                };
            } else if ((match = colorRegexMap.rgba.exec(color))) {
                return {
                    r: match[1],
                    g: match[2],
                    b: match[3],
                    a: match[4]
                };
            } else if ((match = colorRegexMap.hsl.exec(color))) {
                return {
                    h: match[1],
                    s: match[2],
                    l: match[3]
                };
            } else if ((match = colorRegexMap.hsla.exec(color))) {
                return {
                    h: match[1],
                    s: match[2],
                    l: match[3],
                    a: match[4]
                };
            } else if ((match = colorRegexMap.hsv.exec(color))) {
                return {
                    h: match[1],
                    s: match[2],
                    v: match[3]
                };
            } else if ((match = colorRegexMap.hex8.exec(color))) {
                return {
                    a: convertHexToDecimal(match[1]),
                    r: parseIntFromHex(match[2]),
                    g: parseIntFromHex(match[3]),
                    b: parseIntFromHex(match[4]),
                    format: named ? "name" : "hex8"
                };
            } else if ((match = colorRegexMap.hex6.exec(color))) {
                return {
                    r: parseIntFromHex(match[1]),
                    g: parseIntFromHex(match[2]),
                    b: parseIntFromHex(match[3]),
                    format: named ? "name" : "hex"
                };
            } else if ((match = colorRegexMap.hex3.exec(color))) {
                return {
                    r: parseIntFromHex(match[1] + '' + match[1]),
                    g: parseIntFromHex(match[2] + '' + match[2]),
                    b: parseIntFromHex(match[3] + '' + match[3]),
                    format: named ? "name" : "hex"
                };
            }

            return false;
        },

        /**
         * Convert input color from string or object to RGB profile
         * @param  {Mixed} color
         * @return {Object} Returns object with properties which inititalized in Rise.Color constructor
         * @private
         */
        inputToRgb: function(color) {
            var rgb = {
                    r: 0,
                    g: 0,
                    b: 0
                },
                alpha = 1,
                valid = false,
                format = false;

            if (Rise.Util.getType(color) == 'string') {
                color = stringToObject(color);
            }

            if (Rise.Util.getType(color) == 'object') {
                if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
                    rgb = rgbToRgb(color.r, color.g, color.b);
                    valid = true;
                    format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
                    color.s = convertToPercentage(color.s);
                    color.v = convertToPercentage(color.v);
                    rgb = hsvToRgb(color.h, color.s, color.v);
                    valid = true;
                    format = "hsv";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
                    color.s = convertToPercentage(color.s);
                    color.l = convertToPercentage(color.l);
                    rgb = hslToRgb(color.h, color.s, color.l);
                    valid = true;
                    format = "hsl";
                }

                if (color.hasOwnProperty('a')) {
                    alpha = color.a;
                }
            }

            alpha = boundAlpha(alpha);

            return {
                valid: valid,
                format: color.format || format,
                r: Math.min(255, Math.max(rgb.r, 0)),
                g: Math.min(255, Math.max(rgb.g, 0)),
                b: Math.min(255, Math.max(rgb.b, 0)),
                a: alpha
            };
        },

        /**
         * Convert RGB colour to RGB.
         * Better to use this because here processing
         * handling of bound or percentage in RGB profile.
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}   Object with r,g,b properties
         * @private
         */
        rgbToRgb: function(r, g, b) {
            return {
                r: bound01(r, 255) * 255,
                g: bound01(g, 255) * 255,
                b: bound01(b, 255) * 255
            };
        },

        /**
         * Convert RGB colour to HSL
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}   Object with h,s,l properties
         */
        rgbToHsl: function(r, g, b) {
            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

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
         * @return {Object}   Object with r,g,b properties
         * @private
         */
        hslToRgb: function(h, s, l) {
            h = bound01(h, 360);
            s = bound01(s, 100);
            l = bound01(l, 100);

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
         * @return {Object}   Object with h,s,v properties
         */
        rgbToHsv: function(r, g, b) {
            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

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
         * @return {Object}   Object with r,g,b properties
         * @private
         */
        hsvToRgb: function(h, s, v) {
            h = bound01(h, 360) * 6;
            s = bound01(s, 100);
            v = bound01(v, 100);

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
         * @private
         */
        rgbToHex: function(r, g, b, allow3Char) {
            var hex = [
                pad2(Math.round(r).toString(16)),
                pad2(Math.round(g).toString(16)),
                pad2(Math.round(b).toString(16))
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
         * @private
         */
        rgbaToHex: function(r, g, b, a) {
            var hex = [
                pad2(convertDecimalToHex(a)),
                pad2(Math.round(r).toString(16)),
                pad2(Math.round(g).toString(16)),
                pad2(Math.round(b).toString(16))
            ];

            return hex.join("");
        },

        /**
         * Create Rise.Color from ratio
         * @param  {Object|String} color  Can be object with r, g, b, a properties or string
         * @param  {Object} config Configuration object
         * @return {Rise.Color}
         * @static
         */
        fromRatio: function(color, config) {
            Rise.Logger.startGroup('Rise.Color.fromRatio');

            if (Rise.Util.getType(color) == 'object') {
                Rise.Logger.log('Color %O is object. Start parsing from object.', color);

                var newColor = {};

                for (var i in color) {
                    if (color.hasOwnProperty(i)) {
                        Rise.Logger.log('Processing %s property in color object', i);

                        if (i === "a") {
                            newColor[i] = color[i];
                        } else {
                            newColor[i] = convertToPercentage(color[i]);
                        }
                    }
                }

                color = newColor;
            }

            Rise.Logger.log('Parsed successfully and created new Rise.Color object');
            Rise.Logger.endGroup();

            return new Rise.Color(color, config);
        },

        /**
         * Check if two colors are equals
         * @param  {String} firstColor First color
         * @param  {String} secondColor Second color
         * @return {Boolean}        True if colors equals and false otherwise
         * @static
         */
        equals: function(firstColor, secondColor) {
            Rise.Logger.log('Start checking for equals %O and %O colors', firstColor, secondColor);

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
            Rise.Logger.log('Starts generating random color');
            return new Rise.Color.fromRatio({
                r: Math.random(),
                g: Math.random(),
                b: Math.random()
            });
        },

        /**
         * Mix 2 colors
         * @param  {String} color1 First color
         * @param  {String} color2 Second color
         * @param  {Integer} amount Amount of mix
         * @return {Rise.Color}        Returns mixed color
         * @static
         */
        mix: function(firstColor, secondColor, amount) {
            amount = amount === 0 ? 0 : (amount || 50);

            Rise.Logger.log('Start mixing %O and %O colors by %i amount', firstColor, secondColor, amount);

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
            rgba = {
                r: rgbB.r * w1 + rgbA.r * w2,
                g: rgbB.g * w1 + rgbA.g * w2,
                b: rgbB.b * w1 + rgbA.b * w2,
                a: rgbB.a * p + rgbA.a * (1 - p)
            };

            Rise.Logger.log('Successfully mixed colors returns %O color', rgba);

            return new Rise.Color(rgba);
        },

        /**
         * Analyze 2 colors and returns information about
         * @param  {String} firstColor First color
         * @param  {String} secondColor Second color
         * @return {Object} Object with brightness and color properties
         * @static
         */
        readability: function(firstColor, secondColor) {
            var colorA = new Rise.Color(firstColor),
                colorB = new Rise.Color(secondColor),
                rgbA = colorA.toRgb(),
                rgbB = colorB.toRgb(),
                brightnessA = colorA.getBrightness(),
                brightnessB = colorB.getBrightness(),
                colorDiff = (
                    Math.max(rgbA.r, rgbB.r) - Math.min(rgbA.r, rgbB.r) +
                    Math.max(rgbA.g, rgbB.g) - Math.min(rgbA.g, rgbB.g) +
                    Math.max(rgbA.b, rgbB.b) - Math.min(rgbA.b, rgbB.b)
                );

            return {
                brightness: Math.abs(brightnessA - brightnessB),
                color: colorDiff
            };
        },

        /**
         * Ensure that foreground and background color combinations provide sufficient contrast.
         * @param  {String} foregroundColor Foreground color
         * @param  {String} backgroundColor Background color
         * @return {Boolean} Returns true if readable and false otherwise
         * @static
         */
        isReadable: function(foregroundColor, backgroundColor) {
            var readability = new Rise.Color.readability(foregroundColor, backgroundColor);
            return readability.brightness > 125 && readability.color > 500;
        },

        /**
         * Get most readable foreground or background color for given color
         * @param  {String} baseColor Base color
         * @param  {Array} colorList Array of possibles colors
         * @return {Rise.Color|Boolean} Best color from array where base color will be most readable or false otherwise
         * @static
         */
        mostReadable: function(baseColor, colorList) {
            var bestColor = false,
                bestScore = 0,
                bestIsReadable = false;

            Rise.Logger.startGroup('Rise.Color.mostReadable -> Start calculating');
            Rise.Logger.log('Trying to find best readability color for %O color from %O array', baseColor, colorList);

            for (var i = 0; i < colorList.length; i++) {
                var readability = new Rise.Color.readability(baseColor, colorList[i]),
                    readable = readability.brightness > 125 && readability.color > 500,
                    score = 3 * (readability.brightness / 125) + (readability.color / 500);

                Rise.Logger.log(
                    '%i -> For %O color calculated readability %O, is readable %s, score %i',
                    i,
                    colorList[i],
                    readability,
                    readable,
                    score
                );

                if (
                    (readable && !bestIsReadable) ||
                    (readable && bestIsReadable && score > bestScore) ||
                    ((!readable) && (!bestIsReadable) && score > bestScore)
                ) {
                    bestColor = new Rise.Color(colorList[i]);
                    bestScore = score;
                    bestIsReadable = readable;
                }
            }

            Rise.Logger.log('Finded best readable color %O for %O color', bestColor, baseColor);
            Rise.Logger.endGroup();

            return bestColor;
        }
    });
})(this);