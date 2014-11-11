module Rise.Color {
    function bound(min, max, value) {
        // TODO: make normal
        if (typeof value == 'string' && value.indexOf('.') !== -1 && parseFloat(value) === 1) {
            value = '100%';
        }

        var isPercentageValue = typeof value == 'string' && value.indexOf('%') !== -1;

        value = Math.min(max, Math.max(min, value));

        if (isPercentageValue) {
            value = parseInt(value * max, 10) / 100;
        }

        if (Math.abs(value - max) < 0.000001) {
            return 1;
        }

        return (value % max) / parseFloat(max);
    }

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

    export function rgbToRgb(red:number, green:number, blue:number) {
        return {
            red: bound(0, 255, red) * 255,
            green: bound(0, 255, green) * 255,
            blue: bound(0, 255, blue) * 255
        };
    }

    export function rgbToHex(red:number, green:number, blue:number, alpha:number = 1) {
        function pad2(value:string) {
            return value.length === 1 ? '0' + value : value;
        }

        return [
            pad2(Math.round(alpha * 255).toString(16)),
            pad2(Math.round(red).toString(16)),
            pad2(Math.round(green).toString(16)),
            pad2(Math.round(blue).toString(16))
        ].join('').toUpperCase();
    }

    export function rgbToHsv(red:number, green:number, blue:number) {
        red = bound(0, 255, red);
        green = bound(0, 255, green);
        blue = bound(0, 255, blue);

        var max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            hue, saturation, value = max,
            d = max - min;

        saturation = max === 0 ? 0 : d / max;

        if (max === min) {
            hue = 0;
        } else {
            switch (max) {
                case red:
                    hue = (green - blue) / d + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / d + 2;
                    break;
                case blue:
                    hue = (red - green) / d + 4;
                    break;
            }

            hue /= 6;
        }

        return {
            hue: hue,
            saturation: saturation,
            value: value
        };
    }

    export function rgbToHsl(red:number, green:number, blue:number) {
        red = bound(0, 255, red);
        green = bound(0, 255, green);
        blue = bound(0, 255, blue);

        var max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            hue, saturation, lightness = (max + min) / 2;

        if (max === min) {
            hue = saturation = 0;
        } else {
            var d = max - min;

            saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case red:
                    hue = (green - blue) / d + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / d + 2;
                    break;
                case blue:
                    hue = (red - green) / d + 4;
                    break;
            }

            hue /= 6;
        }

        return {
            hue: hue,
            saturation: saturation,
            lightness: lightness
        };
    }

    export function hslToRgb(hue, saturation, lightness) {
        hue = bound(0, 360, hue);
        saturation = bound(0, 100, saturation);
        lightness = bound(0, 100, lightness);

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

        var red, green, blue;

        if (saturation === 0) {
            red = green = blue = lightness;
        } else {
            var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation,
                p = 2 * lightness - q;

            red = hue2rgb(p, q, hue + 1 / 3);
            green = hue2rgb(p, q, hue);
            blue = hue2rgb(p, q, hue - 1 / 3);
        }

        return {
            red: red * 255,
            green: green * 255,
            blue: blue * 255
        };
    }

    export function hsvToRgb(hue, saturation, value) {
        hue = bound(0, 360, hue) * 6;
        saturation = bound(0, 100, saturation);
        value = bound(0, 100, value);

        var i = Math.floor(hue),
            f = hue - i,
            p = value * (1 - saturation),
            q = value * (1 - f * saturation),
            t = value * (1 - (1 - f) * saturation),
            mod = i % 6,
            r = [value, q, p, p, t, value][mod],
            g = [t, value, value, q, p, p][mod],
            b = [p, p, t, value, value, q][mod];

        return {
            red: r * 255,
            green: g * 255,
            blue: b * 255
        };
    }

    export function fromString(color:string) {
        color = color.trim().replace(/#/g, '').toLowerCase();
        color = Rise.Color[color] || color;

        var match;

        if (color === 'transparent') {
            return new Rise.Color.RGBColor({
                red: 0,
                green: 0,
                blue: 0,
                alpha: 0
            });
        } else if ((match = colorRegExpMap.rgb.exec(color))) {
            return new Rise.Color.RGBColor({
                red: match[1],
                green: match[2],
                blue: match[3]
            });
        } else if ((match = colorRegExpMap.rgba.exec(color))) {
            return new Rise.Color.RGBColor({
                red: match[1],
                green: match[2],
                blue: match[3],
                alpha: match[4]
            });
        } else if ((match = colorRegExpMap.hsl.exec(color))) {
            return new Rise.Color.HSLColor({
                h: match[1],
                s: match[2],
                l: match[3]
            });
        } else if ((match = colorRegExpMap.hsla.exec(color))) {
            return new Rise.Color.HSLColor({
                h: match[1],
                s: match[2],
                l: match[3],
                alpha: match[4]
            });
        } else if ((match = colorRegExpMap.hsv.exec(color))) {
            return new Rise.Color.HSVColor({
                h: match[1],
                s: match[2],
                v: match[3]
            });
        } else if ((match = colorRegExpMap.hex8.exec(color))) {
            return new Rise.Color.RGBColor({
                alpha: parseInt(match[1], 16) / 255,
                red: parseInt(match[2], 16),
                green: parseInt(match[3], 16),
                blue: parseInt(match[4], 16)
            });
        } else if ((match = colorRegExpMap.hex6.exec(color))) {
            return new Rise.Color.RGBColor({
                red: parseInt(match[1], 16),
                green: parseInt(match[2], 16),
                blue: parseInt(match[3], 16)
            });
        } else if ((match = colorRegExpMap.hex3.exec(color))) {
            return new Rise.Color.RGBColor({
                red: parseInt(match[1] + '' + match[1], 16),
                green: parseInt(match[2] + '' + match[2], 16),
                blue: parseInt(match[3] + '' + match[3], 16)
            });
        } else {
            return false;
        }
    }
}