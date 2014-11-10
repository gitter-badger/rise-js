module Rise {
    var colorRegExpMap = (function () {
        // TODO: make normal
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