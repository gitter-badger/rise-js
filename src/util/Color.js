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
                return Rise.Color.fromString(color);
            } else if (Rise.Util.isObject(color)) {
                if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
                    rgb = Rise.Color.rgbToRgb(color.r, color.g, color.b);
                    valid = true;
                    format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
                    color.s = Rise.Color.convertDecimalToPercentage(color.s);
                    color.v = Rise.Color.convertDecimalToPercentage(color.v);
                    rgb = Rise.Color.hsvToRgb(color.h, color.s, color.v);
                    valid = true;
                    format = "hsv";
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
                    color.s = Rise.Color.convertDecimalToPercentage(color.s);
                    color.l = Rise.Color.convertDecimalToPercentage(color.l);
                    rgb = Rise.Color.hslToRgb(color.h, color.s, color.l);
                    valid = true;
                    format = "hsl";
                }

                if (color.hasOwnProperty('a')) {
                    alpha = color.a;
                }

                alpha = Rise.Color.boundAlpha(alpha);

                return {
                    valid: valid,
                    format: color.format || format,
                    r: Math.min(255, Math.max(rgb.r, 0)),
                    g: Math.min(255, Math.max(rgb.g, 0)),
                    b: Math.min(255, Math.max(rgb.b, 0)),
                    a: alpha
                };

                Rise.Logger.startGroup(true, 'Rise.Color -> init()');
                Rise.Logger.log('Trying to parse color -> %O with config -> %O', color, config);

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
            } else {
                Rise.Logger.error('Color -> %O couldn\'t be parsed', color);
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

            return Rise.Color.hexNamesMap[Rise.Color.rgbToHex(this.red, this.green, this.blue, true)] || false;
        },

        /**
         * Convert color to DX Filter notation
         * @param  {String} secondColor Second color
         * @return {String} Returns DX Filter format for this color
         */
        toFilter: function(secondColor) {
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
         * Create new Rise.Color instance from string colour
         * @param  {String} color String representation of colour
         * @return {Rise.Color}   Returns Rise.Color instance
         */
        fromString: function(color) {
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
                });
            } else if ((match = Rise.Color.colorRegexMap.rgba.exec(color))) {
                return new Rise.Color({
                    r: match[1],
                    g: match[2],
                    b: match[3],
                    a: match[4]
                });
            } else if ((match = Rise.Color.colorRegexMap.hsl.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3]
                });
            } else if ((match = Rise.Color.colorRegexMap.hsla.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3],
                    a: match[4]
                });
            } else if ((match = Rise.Color.colorRegexMap.hsv.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    v: match[3]
                });
            } else if ((match = Rise.Color.colorRegexMap.hex8.exec(color))) {
                return new Rise.Color({
                    a: Rise.Color.convertHexToDecimal(match[1]),
                    r: Rise.Color.convertHexToInteger(match[2]),
                    g: Rise.Color.convertHexToInteger(match[3]),
                    b: Rise.Color.convertHexToInteger(match[4]),
                    format: named ? "name" : "hex8"
                });
            } else if ((match = Rise.Color.colorRegexMap.hex6.exec(color))) {
                return new Rise.Color({
                    r: Rise.Color.convertHexToInteger(match[1]),
                    g: Rise.Color.convertHexToInteger(match[2]),
                    b: Rise.Color.convertHexToInteger(match[3]),
                    format: named ? "name" : "hex"
                });
            } else if ((match = Rise.Color.colorRegexMap.hex3.exec(color))) {
                return new Rise.Color({
                    r: Rise.Color.convertHexToInteger(match[1] + '' + match[1]),
                    g: Rise.Color.convertHexToInteger(match[2] + '' + match[2]),
                    b: Rise.Color.convertHexToInteger(match[3] + '' + match[3]),
                    format: named ? "name" : "hex"
                });
            }

            return false;
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
         * Create Rise.Color from ratio
         * @param  {Object|String} color  Can be object with r, g, b, a properties or string
         * @param  {Object} config Configuration object
         * @return {Rise.Color}
         * @static
         */
        fromRatio: function(color, config) {
            Rise.Logger.startGroup('Rise.Color.fromRatio');

            if (Rise.Util.isObject(color)) {
                Rise.Logger.log('Color %O is object. Start parsing from object.', color);

                var newColor = {};

                Object.keys(color).forEach(function(key) {
                    Rise.Logger.log('Processing %s property in color object', key);

                    if (key === "a") {
                        newColor[key] = color[key];
                    } else {
                        newColor[key] = Rise.Color.convertDecimalToPercentage(color[key]);
                    }
                });

                color = newColor;
            }

            Rise.Logger.log('Parsed successfully and created new Rise.Color object');
            Rise.Logger.endGroup();

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