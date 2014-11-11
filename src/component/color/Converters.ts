module Rise.Color {
    export function rgbToRgb(r, g, b) {
        return {
            red: Rise.Math.bound(0, 255, r) * 255,
            green: Rise.Math.bound(0, 255, g) * 255,
            blue: Rise.Math.bound(0, 255, b) * 255
        };
    }

    export function rgbToHsv(r, g, b) {
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

    export function rgbToHsl(r, g, b) {
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

    export function hslToRgb(h, s, l) {
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
            red: r * 255,
            green: g * 255,
            blue: b * 255
        };
    }

    export function hsvToRgb(h, s, v) {
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
            red: r * 255,
            green: g * 255,
            blue: b * 255
        };
    }

    export function rgbToHex(r, g, b, a) {
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

    export function fromString(color) {
        color = color.trim().replace(/#/g, '').toLowerCase();
        color = Rise.Color.colorNamesMap[color] || color;

        var match;

        if (color === 'transparent') {
            return new Rise.Color({
                red: 0,
                green: 0,
                blue: 0,
                alpha: 0
            });
        } else if ((match = colorRegExpMap.rgb.exec(color))) {
            return new Rise.Color({
                red: match[1],
                green: match[2],
                blue: match[3]
            });
        } else if ((match = colorRegExpMap.rgba.exec(color))) {
            return new Rise.Color({
                red: match[1],
                green: match[2],
                blue: match[3],
                alpha: match[4]
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
                alpha: match[4]
            });
        } else if ((match = colorRegExpMap.hsv.exec(color))) {
            return new Rise.Color({
                h: match[1],
                s: match[2],
                v: match[3]
            });
        } else if ((match = colorRegExpMap.hex8.exec(color))) {
            return new Rise.Color({
                alpha: parseInt(match[1], 16) / 255,
                red: parseInt(match[2], 16),
                green: parseInt(match[3], 16),
                blue: parseInt(match[4], 16)
            });
        } else if ((match = colorRegExpMap.hex6.exec(color))) {
            return new Rise.Color({
                red: parseInt(match[1], 16),
                green: parseInt(match[2], 16),
                blue: parseInt(match[3], 16)
            });
        } else if ((match = colorRegExpMap.hex3.exec(color))) {
            return new Rise.Color({
                red: parseInt(match[1] + '' + match[1], 16),
                green: parseInt(match[2] + '' + match[2], 16),
                blue: parseInt(match[3] + '' + match[3], 16)
            });
        } else {
            return false;
        }
    }
}