module Rise.Color {
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

    function decimalToPercentage(value) {
        value = parseFloat(value);

        if (isFinite(value) && value >= 0 && value <= 1) {
            return (value * 100) + "%";
        } else {
            return value;
        }
    }

    export interface RGBColorInterface {
        red:number;
        green:number;
        blue:number;
        alpha:number;
    }

    export class RGBColor implements Rise.Color.RGBColorInterface {
        private _red:number;
        private _green:number;
        private _blue:number;
        private _alpha:number;

        constructor(color:Rise.Color.RGBColorInterface);
        constructor(color:any) {
            var rgb = {};

            if (color instanceof Rise.Color) {
                return color;
            } else if (typeof color == 'string') {
                return Rise.Color.fromString(color);
            } else if (typeof color == 'object') {
                rgb = Rise.Color.rgbToRgb(color.red, color.green, color.blue);
                this.setRed(rgb.red);
                this.setGreen(rgb.green);
                this.setBlue(rgb.blue);
                this.setAlpha(color.hasOwnProperty('alpha') ? color.alpha : 1);
            } else {
                return false;
            }

            return this;
        }

        get red():number {
            return this._red;
        }

        set red(red:number) {
            this._red = Math.min(255, Math.max(0, red));
        }

        get green():number {
            return this._green;
        }

        set green(green:number) {
            this._green = Math.min(255, Math.max(0, green));
        }

        get blue():number {
            return this._blue;
        }

        set blue(blue:number) {
            this._blue = Math.min(255, Math.max(0, blue));
        }

        get alpha():number {
            return this._alpha;
        }

        set alpha(alpha:number) {
            this._alpha = (alpha < 0 || alpha > 1) ? 1 : Math.round(100 * this._alpha) / 100;
        }

        getRed():number {
            return this.red;
        }

        setRed(red:number) {
            this.red = red;
            return this;
        }

        getGreen():number {
            return this.green;
        }

        setGreen(green:number) {
            this.green = green;
            return this;
        }

        getBlue():number {
            return this.blue;
        }

        setBlue(blue:number) {
            this.blue = blue;
            return this;
        }

        getAlpha():number {
            return this.alpha;
        }

        setAlpha(alpha:number) {
            this.alpha = alpha;
            return this;
        }

        getBrightness():number {
            var rgb = this.toRgbObject();
            return (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
        }

        isDark():boolean {
            return this.getBrightness() < 128;
        }

        isLight():boolean {
            return !this.isDark();
        }

        toRgbObject() {
            return {
                red: Math.round(this.red),
                green: Math.round(this.green),
                blue: Math.round(this.blue),
                alpha: this.alpha
            };
        }

        toRgbString():string {
            var rgb = this.toRgbObject();

            return this.alpha === 1 ?
            "rgb(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ")" :
            "rgba(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ", " + rgb.alpha + ")";
        }

        toHexString(withChar:boolean = true):string {
            return this.alpha === 1 ?
                Rise.Color.rgbToHex(this.red, this.green, this.blue) :
                Rise.Color.rgbToHex(this.red, this.green, this.blue, this.alpha);
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
            rgb.red = Math.max(0, Math.min(255, rgb.red - Math.round(255 * -(amount / 100))));
            rgb.green = Math.max(0, Math.min(255, rgb.green - Math.round(255 * -(amount / 100))));
            rgb.blue = Math.max(0, Math.min(255, rgb.blue - Math.round(255 * -(amount / 100))));

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

        equals(color:Rise.Color.RGBColor):boolean {
            return this.toRgbString() === new Rise.Color.RGBColor(color).toRgbString();
        }

        mix(color:Rise.Color.RGBColor, amount:number = 50):Rise.Color.RGBColor {
            var rgbA = this.toRgbObject(),
                rgbB = new Rise.Color.RGBColor(color).toRgbObject(),
                p = amount / 100,
                w = p * 2 - 1,
                a = rgbB.alpha - rgbA.alpha,
                w1,
                w2;

            if (w * a === -1) {
                w1 = w;
            } else {
                w1 = (w + a) / (1 + w * a);
            }

            w1 = (w1 + 1) / 2;
            w2 = 1 - w1;

            return new Rise.Color.RGBColor({
                red: rgbB.red * w1 + rgbA.red * w2,
                green: rgbB.green * w1 + rgbA.green * w2,
                blue: rgbB.blue * w1 + rgbA.blue * w2,
                alpha: rgbB.alpha * p + rgbA.alpha * (1 - p)
            });
        }
    }
}