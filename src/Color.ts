module Rise {
    var colorRegExpMap = (function () {
        var cssIntegerRegExp:String = "[-\\+]?\\d+%?",
            cssNumberRegExp:String = "[-\\+]?\\d*\\.\\d+%?",
            cssUnitRegExp:String = "(?:" + cssNumberRegExp + ")|(?:" + cssIntegerRegExp + ")",
            permissiveMatch3RegExp:String = "[\\s|\\(]+(" + cssUnitRegExp + ")[,|\\s]+(" + cssUnitRegExp + ")[,|\\s]+(" + cssUnitRegExp + ")\\s*\\)?",
            permissiveMatch4RegExp:String = "[\\s|\\(]+(" + cssUnitRegExp + ")[,|\\s]+(" + cssUnitRegExp + ")[,|\\s]+(" + cssUnitRegExp + ")[,|\\s]+(" + cssUnitRegExp + ")\\s*\\)?";

        return {
            rgb: new RegExp("rgb" + permissiveMatch3RegExp),
            rgba: new RegExp("rgba" + permissiveMatch4RegExp),
            hsl: new RegExp("hsl" + permissiveMatch3RegExp),
            hsla: new RegExp("hsla" + permissiveMatch4RegExp),
            hsv: new RegExp("hsv" + permissiveMatch3RegExp),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    }());

    function clamp(min, max, value) {
        return Math.min(max, Math.max(min, value));
    }

    function bound(min, max, value) {
        if (typeof value == 'string' && value.indexOf('.') !== -1 && parseFloat(value) === 1) {
            value = '100%';
        }

        var isPercentageValue = typeof value == 'string' && value.indexOf('%') !== -1;

        value = clamp(min, max, parseFloat(value));

        if (isPercentageValue) {
            value = parseInt(value * max, 10) / 100;
        }

        if (Math.abs(value - max) < 0.000001) {
            return 1;
        }

        return (value % max) / parseFloat(max);
    }

    function decimalToPercentage(value) {
        value = parseFloat(value);

        if (isFinite(value) && value >= 0 && value <= 1) {
            return (value * 100) + "%";
        } else {
            return value;
        }
    }

    export interface IRGBColor {
        r: Number;
        g: Number;
        b: Number;
    }

    export interface IHSVColor {
        h: Number;
        s: Number;
        v: Number;
    }

    export interface IHSLColor {
        h: Number;
        s: Number;
        l: Number;
    }

    export class Color implements IColor {
        private _r:Number;
        private _g:Number;
        private _b:Number;
        private _a:Number;

        constructor(color:Color);
        constructor(color:String);
        constructor(color:IRGBColor);
        constructor(color:IHSVColor);
        constructor(color:IHSLColor);
        constructor(color:any) {
            var rgb = {};

            if (color instanceof Rise.Color) {
                return color;
            } else if (typeof color == 'string') {
                return Rise.Color.fromString(color);
            } else if (typeof color == 'object') {
                if (color.hasOwnProperty('r') && color.hasOwnProperty('g') && color.hasOwnProperty('b')) {
                    rgb = Rise.Color.rgbToRgb(color.r, color.g, color.b);
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('v')) {
                    color.s = decimalToPercentage(color.s);
                    color.v = decimalToPercentage(color.v);
                    rgb = Rise.Color.hsvToRgb(color.h, color.s, color.v);
                } else if (color.hasOwnProperty('h') && color.hasOwnProperty('s') && color.hasOwnProperty('l')) {
                    color.s = decimalToPercentage(color.s);
                    color.l = decimalToPercentage(color.l);
                    rgb = Rise.Color.hslToRgb(color.h, color.s, color.l);
                } else {
                    return false;
                }

                this.setRed(rgb.r);
                this.setGreen(rgb.g);
                this.setBlue(rgb.b);
                this.setAlpha(color.hasOwnProperty('a') ? color.a : 1);

            } else {
                return false;
            }

            return this;
        }

        getBrightness() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        }


        isDark() {
            return this.getBrightness() < 128;
        }

        isLight() {
            return !this.isDark();
        }

        getRed() {
            return this.red;
        }

        setRed(value) {
            this.red = Rise.Math.clamp(0, 255, value);
            return this;
        }

        getGreen() {
            return this.green;
        }

        setGreen(value) {
            this.green = Rise.Math.clamp(0, 255, value);
            return this;
        }

        getBlue() {
            return this.blue;
        }

        setBlue(value) {
            this.blue = Rise.Math.clamp(0, 255, value);
            return this;
        }

        getAlpha() {
            return this.alpha;
        }

        setAlpha(value) {
            value = parseFloat(value);

            this.alpha = (isNaN(value) || value < 0 || value > 1) ? 1 : value;
            this.roundAlpha = Math.round(100 * this.alpha) / 100;
            return this;
        }

        toRgb() {
            return {
                r: Math.round(this.red),
                g: Math.round(this.green),
                b: Math.round(this.blue),
                a: this.alpha
            };
        }

        toRgbString() {
            var rgb = this.toRgb();

            return this.alpha === 1 ?
            "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")" :
            "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + this.roundAlpha + ")";
        }

        toHex() {
            return this.alpha === 1 ?
                Rise.Color.rgbToHex(this.red, this.green, this.blue) :
                Rise.Color.rgbToHex(this.red, this.green, this.blue, this.alpha);
        }

        toHexString() {
            return '#' + this.toHex();
        }

        toHsv() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue);

            return {
                h: hsv.h * 360,
                s: hsv.s,
                v: hsv.v,
                a: this.alpha
            };
        }

        toHsvString() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue),
                h = Math.round(hsv.h * 360),
                s = Math.round(hsv.s * 100),
                v = Math.round(hsv.v * 100);

            return this.alpha === 1 ?
            "hsv(" + h + ", " + s + "%, " + v + "%)" :
            "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundAlpha + ")";
        }

        toHsl() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue);

            return {
                h: hsl.h * 360,
                s: hsl.s,
                l: hsl.l,
                a: this.alpha
            };
        }

        toHslString() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue),
                h = Math.round(hsl.h * 360),
                s = Math.round(hsl.s * 100),
                l = Math.round(hsl.l * 100);

            return this.alpha === 1 ?
            "hsl(" + h + ", " + s + "%, " + l + "%)" :
            "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundAlpha + ")";
        }

        toName() {
            if (this.alpha === 0) {
                return "transparent";
            } else if (this.alpha < 1) {
                return false;
            } else {
                return Rise.Color.hexNamesMap[Rise.Color.rgbToHex(this.red, this.green, this.blue)] || false;
            }
        }

        toString(format) {
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
        }

        lighten(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l = Rise.Math.clamp(0, 1, hsl.l + (amount / 100));

            return new Rise.Color(hsl);
        }

        darken(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.l = Rise.Math.clamp(0, 1, hsl.l - (amount / 100));

            return new Rise.Color(hsl);
        }

        desaturate(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s = Rise.Math.clamp(0, 1, hsl.s - (amount / 100));

            return new Rise.Color(hsl);
        }

        saturate(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var hsl = this.toHsl();
            hsl.s = Rise.Math.clamp(0, 1, hsl.s + (amount / 100));

            return new Rise.Color(hsl);
        }

        brighten(amount) {
            amount = (amount === 0) ? 0 : (amount || 10);

            var rgb = this.toRgb();
            rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
            rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
            rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));

            return new Rise.Color(rgb);
        }

        greyscale() {
            return this.desaturate(100);
        }

        spin(amount) {
            var hsl = this.toHsl(),
                hue = (Math.round(hsl.h) + amount) % 360;

            hsl.h = hue < 0 ? 360 + hue : hue;

            return new Rise.Color(hsl);
        }

        getAnalogous(results, slices) {
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
        }

        getComplementary() {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new Rise.Color(hsl);
        }

        getMonochromatic(results) {
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
        }

        getSplitComplementary() {
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
        }

        getTriad() {
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
        }

        getTetrad() {
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

        static colorNamesMap:Object = {
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
        };

        static rgbToRgb(r, g, b) {
            return {
                r: Rise.Math.bound(0, 255, r) * 255,
                g: Rise.Math.bound(0, 255, g) * 255,
                b: Rise.Math.bound(0, 255, b) * 255
            };
        }

        static rgbToHsv(r, g, b) {
            r = Rise.Math.bound(0, 255, r);
            g = Rise.Math.bound(0, 255, g);
            b = Rise.Math.bound(0, 255, b);

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                h, s, v = max,
                d = max - min;

            s = max === 0 ? 0 : d / max;

            if (max === min) {
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
        }

        static rgbToHsl(r, g, b) {
            r = Rise.Math.bound(0, 255, r);
            g = Rise.Math.bound(0, 255, g);
            b = Rise.Math.bound(0, 255, b);

            var max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                h, s, l = (max + min) / 2;

            if (max === min) {
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
        }

        static hslToRgb(h, s, l) {
            h = Rise.Math.bound(0, 360, h);
            s = Rise.Math.bound(0, 100, s);
            l = Rise.Math.bound(0, 100, l);

            function hue2rgb(p, q, t) {
                if (t < 0) {
                    t += 1;
                }

                if (t > 1) {
                    t -= 1;
                }

                if (t < 1 / 6) {
                    return p + (q - p) * 6 * t;
                }

                if (t < 1 / 2) {
                    return q;
                }

                if (t < 2 / 3) {
                    return p + (q - p) * (2 / 3 - t) * 6;
                }
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
        }

        static hsvToRgb(h, s, v) {
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
        }

        static rgbToHex(r, g, b, a) {
            var hex = [];

            function pad2(value) {
                return value.length === 1 ? '0' + value : value;
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
        }

        static equals(firstColor, secondColor) {
            if (!firstColor || !secondColor) {
                return false;
            }

            return new Rise.Color(firstColor).toRgbString() === new Rise.Color(secondColor).toRgbString();
        }

        static random() {
            return new Rise.Color({
                r: Math.random() * 255,
                g: Math.random() * 255,
                b: Math.random() * 255
            });
        }

        static mix(firstColor, secondColor, amount) {
            amount = amount === 0 ? 0 : (amount || 50);

            var rgbA = new Rise.Color(firstColor).toRgb(),
                rgbB = new Rise.Color(secondColor).toRgb(),
                p = amount / 100,
                w = p * 2 - 1,
                a = rgbB.a - rgbA.a,
                w1,
                w2;

            if (w * a === -1) {
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

        static fromString(color) {
            color = color.trim().replace(/#/g, '').toLowerCase();
            color = Rise.Color.colorNamesMap[color] || color;

            var match;

            if (color === 'transparent') {
                return new Rise.Color({
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                });
            } else if ((match = colorRegExpMap.rgb.exec(color))) {
                return new Rise.Color({
                    r: match[1],
                    g: match[2],
                    b: match[3]
                });
            } else if ((match = colorRegExpMap.rgba.exec(color))) {
                return new Rise.Color({
                    r: match[1],
                    g: match[2],
                    b: match[3],
                    a: match[4]
                });
            } else if ((match = colorRegExpMap.hsl.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3]
                });
            } else if ((match = colorRegExpMap.hsla.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    l: match[3],
                    a: match[4]
                });
            } else if ((match = colorRegExpMap.hsv.exec(color))) {
                return new Rise.Color({
                    h: match[1],
                    s: match[2],
                    v: match[3]
                });
            } else if ((match = colorRegExpMap.hex8.exec(color))) {
                return new Rise.Color({
                    a: parseInt(match[1], 16) / 255,
                    r: parseInt(match[2], 16),
                    g: parseInt(match[3], 16),
                    b: parseInt(match[4], 16)
                });
            } else if ((match = colorRegExpMap.hex6.exec(color))) {
                return new Rise.Color({
                    r: parseInt(match[1], 16),
                    g: parseInt(match[2], 16),
                    b: parseInt(match[3], 16)
                });
            } else if ((match = colorRegExpMap.hex3.exec(color))) {
                return new Rise.Color({
                    r: parseInt(match[1] + '' + match[1], 16),
                    g: parseInt(match[2] + '' + match[2], 16),
                    b: parseInt(match[3] + '' + match[3], 16)
                });
            } else {
                return false;
            }
        }
    }
}