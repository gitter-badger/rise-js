(function(global) {
    'use strict';

    global.Rise.Color = Rise.Class.create({
        /**
         * Create new Rise.Color instance
         * @constructor
         * @param {Rise.Color|String|Object} color String or object with appropriate properties
         * @return {Rise.Color} Returns Rise.Color instance
         * @example
         * Rise.Color('red');
         * Rise.Color({
         *     r: 255,
         *     g: 0,
         *     b: 0,
         *     a: 1
         * });
         */
        init: function(color) {
            color = color || 'black';

            var rgb = {};

            if (color instanceof Rise.Color) {
                return color;
            } else if (Rise.Util.isString(color)) {
                return Rise.Color.fromString(color);
            } else if (Rise.Util.isObject(color)) {
                Rise.Logger.startGroup(true, 'Rise.Color -> init()');
                Rise.Logger.log('Trying to parse color -> %O', color);

                if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
                    Rise.Logger.log('Convert RGB -> %O', color);
                    rgb = Rise.Color.rgbToRgb(color.r, color.g, color.b);
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
                    Rise.Logger.log('Convert HSV -> %O', color);
                    color.s = Rise.Math.decimalToPercentage(color.s);
                    color.v = Rise.Math.decimalToPercentage(color.v);
                    rgb = Rise.Color.hsvToRgb(color.h, color.s, color.v);
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
                    Rise.Logger.log('Convert HSL -> %O', color);
                    color.s = Rise.Math.decimalToPercentage(color.s);
                    color.l = Rise.Math.decimalToPercentage(color.l);
                    rgb = Rise.Color.hslToRgb(color.h, color.s, color.l);
                } else {
                    Rise.Logger.warning('Color -> %O not parsed', color);
                    return false;
                }

                this.setRed(rgb.r);
                this.setGreen(rgb.g);
                this.setBlue(rgb.b);
                this.setAlpha(color.hasOwnProperty('a') ? color.a : 1);

                Rise.Logger.log('Instantiated new Rise.Color instance -> %O', this);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Color -> %O not parsed', color);
                return false;
            }

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
            this.red = Rise.Math.clamp(0, 255, value);
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
            this.green = Rise.Math.clamp(0, 255, value);
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
            this.blue = Rise.Math.clamp(0, 255, value);
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
            value = parseFloat(value);

            this.alpha = (isNaN(value) || value < 0 || value > 1) ? 1 : value;
            this.roundAlpha = Math.round(100 * this.alpha) / 100;
            return this;
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
            var rgb = this.toRgb();

            return this.alpha == 1 ?
                "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")" :
                "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + this.roundAlpha + ")";
        },

        /**
         * Convert color to HEX string
         * @return {String} Returns HEX value of this color without #
         * @example
         * new Rise.Color('black').toHex(); // '000000'
         */
        toHex: function() {
            return this.alpha === 1 ?
                Rise.Color.rgbToHex(this.red, this.green, this.blue) :
                Rise.Color.rgbToHex(this.red, this.green, this.blue, this.alpha);
        },

        /**
         * Convert color to HEX string
         * @return {String} Returns string with # and HEX color
         * @example
         * new Rise.Color('black').toHexString(); // '#000000'
         */
        toHexString: function() {
            return '#' + this.toHex();
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
                "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundAlpha + ")";
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

            return this.alpha == 1 ?
                "hsl(" + h + ", " + s + "%, " + l + "%)" :
                "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundAlpha + ")";
        },

        /**
         * Convert this color to name string
         * @return {String|Boolean} Returns color name or false if couldn't detect
         * @example
         * new Rise.Color('aqua').toName(); // 'aqua'
         * new Rise.Color({
         *     r: 0,
         *     g: 0,
         *     b: 0
         * }).toName(); // 'black'
         */
        toName: function() {
            if (this.alpha === 0) {
                return "transparent";
            } else if (this.alpha < 1) {
                return false;
            } else {
                return Rise.Color.hexNamesMap[Rise.Color.rgbToHex(this.red, this.green, this.blue)] || false;
            }
        },

        /**
         * Print color in string notation
         * @param  {String} format Custom format
         * @return {String} Returns string of this color depending on format
         */
        toString: function(format) {
            switch (format) {
                case 'rgb':
                    return this.toRgbString();
                case 'hex':
                    return this.toHexString();
                case 'hsv':
                    return this.toHsvString();
                case 'hsl':
                    return this.toHslString();
                case 'name':
                    return this.toName();
                default:
                    return this.toHexString();
            }
        },

        /**
         * Make color more lighten
         * @param {Integer} amount Custom amount for lighten level in [0, 100] range
         * @return {Rise.Color} Returns modified color
         */
        lighten: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l = Rise.Math.clamp(0, 1, hsl.l + (amount / 100));

            return new Rise.Color(hsl);
        },

        /**
         * Make color more darken
         * @param {Integer} amount Custom amount for darken level in [0, 100] range
         * @return {Rise.Color} Returns modified color
         */
        darken: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l = Rise.Math.clamp(0, 1, hsl.l - (amount / 100));

            return new Rise.Color(hsl);
        },

        /**
         * Desaturate the color
         * @param {Integer} amount Custom amount for desaturate in [0, 100] range
         * @return {Rise.Color} Returns modified color
         */
        desaturate: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s = Rise.Math.clamp(0, 1, hsl.s - (amount / 100));

            return new Rise.Color(hsl);
        },

        /**
         * Saturate the color
         * @param {Integer} amount Custom amount for saturate level in [0, 100] range
         * @return {Rise.Color} Returns modified color
         */
        saturate: function(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s = Rise.Math.clamp(0, 1, hsl.s + (amount / 100));

            return new Rise.Color(hsl);
        },

        /**
         * Make color more brighten
         * @param {Integer} amount Custom amount for brighten level in [0, 100] range
         * @return {Rise.Color} Returns modified color
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
         * Completely desaturate the color (make it greyscale)
         * @return {Rise.Color} Returns modified color
         */
        greyscale: function() {
            return this.desaturate(100);
        },

        /**
         * Spin the hue level for a given amount
         * @param {Integer} amount Custom amount for spin in [-360, 360] range
         * @return {Rise.Color} Returns modified color
         */
        spin: function(amount) {
            var hsl = this.toHsl(),
                hue = (Math.round(hsl.h) + amount) % 360;

            hsl.h = hue < 0 ? 360 + hue : hue;

            return new Rise.Color(hsl);
        },

        /**
         * Get analogous combinations
         * @param {Integer} [results] Count of results
         * @param {Integer} [slices] Count of slices
         * @return {Array} Returns array with Rise.Color items
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
         * Get complementary combination
         * @return {Rise.Color} Returns Rise.Color instance with complementary color
         */
        getComplementary: function() {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new Rise.Color(hsl);
        },

        /**
         * Get monochromatic combinations
         * @param {Integer} results Count of results
         * @return {Array} Returns array with Rise.Color items
         */
        getMonochromatic: function(results) {
            results = results || 6;

            var hsv = this.toHsv(),
                result = [],
                modification = 1 / results;

            while (results--) {
                result.push(new Rise.Color({
                    h: hsv.h,
                    s: hsv.s,
                    v: hsv.v
                }));

                hsv.v = (hsv.v + modification) % 1;
            }

            return result;
        },

        /**
         * Get split complementary combinations
         * @return {Array} Returns array with Rise.Color items
         */
        getSplitComplementary: function() {
            var hsl = this.toHsl();

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (hsl.h + 72) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (hsl.h + 216) % 360,
                    s: hsl.s,
                    l: hsl.l
                })
            ];
        },

        /**
         * Get triad combinations
         * @return {Array} Returns array with Rise.Color items
         */
        getTriad: function() {
            var hsl = this.toHsl();

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (hsl.h + 120) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (hsl.h + 240) % 360,
                    s: hsl.s,
                    l: hsl.l
                })
            ];
        },

        /**
         * Get tetrad combinations
         * @return {Array} Returns array with Rise.Color items
         */
        getTetrad: function() {
            var hsl = this.toHsl();

            return [
                new Rise.Color(this),
                new Rise.Color({
                    h: (hsl.h + 90) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (hsl.h + 180) % 360,
                    s: hsl.s,
                    l: hsl.l
                }),
                new Rise.Color({
                    h: (hsl.h + 270) % 360,
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
         * Convert RGB colour to RGB.
         * Better to use this because here processing handling of bound or percentage in RGB profile.
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}    Object with r, g, b properties
         * @static
         * @example
         * Rise.Color.rgbToRgb(0, 0, 0);
         */
        rgbToRgb: function(r, g, b) {
            return {
                r: Rise.Math.bound(0, 255, r) * 255,
                g: Rise.Math.bound(0, 255, g) * 255,
                b: Rise.Math.bound(0, 255, b) * 255
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
            r = Rise.Math.bound(0, 255, r);
            g = Rise.Math.bound(0, 255, g);
            b = Rise.Math.bound(0, 255, b);

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
         * Convert RGB colour to HSL
         * @param  {Integer} r Red channel
         * @param  {Integer} g Green channel
         * @param  {Integer} b Blue channel
         * @return {Object}    Object with h, s, l properties
         * @static
         */
        rgbToHsl: function(r, g, b) {
            r = Rise.Math.bound(0, 255, r);
            g = Rise.Math.bound(0, 255, g);
            b = Rise.Math.bound(0, 255, b);

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
         * @return {Object}    Object with r, g, b properties
         * @static
         */
        hslToRgb: function(h, s, l) {
            h = Rise.Math.bound(0, 360, h);
            s = Rise.Math.bound(0, 100, s);
            l = Rise.Math.bound(0, 100, l);

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
         * Convert HSV colour to RGB
         * @param  {Integer} h Hue channel
         * @param  {Integer} s Saturation channel
         * @param  {Integer} v Value channel
         * @return {Object}    Object with r, g, b properties
         * @static
         */
        hsvToRgb: function(h, s, v) {
            h = Rise.Math.bound(0, 360, h) * 6;
            s = Rise.Math.bound(0, 100, s);
            v = Rise.Math.bound(0, 100, v);

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
         * @return {String} HEX in string without #
         * @static
         */
        rgbToHex: function(r, g, b, a) {
            var hex = [];

            function pad2(value) {
                return value.length == 1 ? '0' + value : value;
            }

            if (Rise.Util.isUndefined(a)) {
                hex = [
                    pad2(Math.round(r).toString(16)),
                    pad2(Math.round(g).toString(16)),
                    pad2(Math.round(b).toString(16))
                ];
            } else {
                hex = [
                    pad2(Math.round(parseFloat(a) * 255).toString(16)),
                    pad2(Math.round(r).toString(16)),
                    pad2(Math.round(g).toString(16)),
                    pad2(Math.round(b).toString(16))
                ];
            }

            return hex.join("").toUpperCase();
        },

        /**
         * Check if two colors are equals
         * @param  {String|Object|Rise.Color} firstColor  First color
         * @param  {String|Object|Rise.Color} secondColor Second color
         * @return {Boolean} True if colors equals and false otherwise
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
            return new Rise.Color({
                r: Rise.Math.getRandomValue(0, 255),
                g: Rise.Math.getRandomValue(0, 255),
                b: Rise.Math.getRandomValue(0, 255)
            });
        },

        /**
         * Mix 2 colors
         * @param  {String} firstColor  First color
         * @param  {String} secondColor  Second color
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
        },

        /**
         * Create new Rise.Color instance from string colour
         * @param  {String} color String representation of colour
         * @return {Window.Rise.Color}   Returns Rise.Color instance
         */
        fromString: function(color) {
            color = color.trim().replace(/#/g, '').toLowerCase();
            color = Rise.Color.colorNamesMap[color] || color;

            var match;

            if (color == 'transparent') {
                return new Rise.Color({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                });
            } else if ((match = Rise.Color.colorRegexMap.rgb.exec(color))) {
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
                    a: parseInt(match[1], 16) / 255,
                    r: parseInt(match[2], 16),
                    g: parseInt(match[3], 16),
                    b: parseInt(match[4], 16),
                });
            } else if ((match = Rise.Color.colorRegexMap.hex6.exec(color))) {
                return new Rise.Color({
                    r: parseInt(match[1], 16),
                    g: parseInt(match[2], 16),
                    b: parseInt(match[3], 16),
                });
            } else if ((match = Rise.Color.colorRegexMap.hex3.exec(color))) {
                return new Rise.Color({
                    r: parseInt(match[1] + '' + match[1], 16),
                    g: parseInt(match[2] + '' + match[2], 16),
                    b: parseInt(match[3] + '' + match[3], 16),
                });
            } else {
                Rise.Logger.warning('Color -> %O not parsed', color);
                return false;
            }

            return false;
        }
    });

    /**
     * Map of HEX colours names.
     * HEX value as key and it name as value in object.
     * @type {Object}
     * @static
     */
    Rise.Color.hexNamesMap = Rise.Util.flipObject(Rise.Color.colorNamesMap);
})(window);