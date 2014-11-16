module Rise.Color {
    export class RGBColor implements Rise.Color.RGBColorInterface {
        private _red:number;
        private _green:number;
        private _blue:number;
        private _alpha:number;

        constructor(color:string);
        constructor(color:any) {
            if (color instanceof Rise.Color.RGBColor) {
                return color;
            } else if (typeof color == 'string') {
                return Rise.Color.fromString(color);
            } else if (typeof color == 'object') {
                this.red = color.red;
                this.green = color.green;
                this.blue = color.blue;
                this.alpha = color.alpha || 1;
            } else {
                throw new Error('Implement Logger');
            }
        }

        get red():number {
            return Math.round(this._red);
        }

        set red(red:number) {
            this._red = Math.min(255, Math.max(0, red));
        }

        get green():number {
            return Math.round(this._green);
        }

        set green(green:number) {
            this._green = Math.min(255, Math.max(0, green));
        }

        get blue():number {
            return Math.round(this._blue);
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
            return (this.red * 299 + this.green * 587 + this.blue * 114) / 1000;
        }

        isDark():boolean {
            return this.getBrightness() < 128;
        }

        isLight():boolean {
            return !this.isDark();
        }

        toRgbObject():Rise.Color.RGBColorObjectInterface {
            return {
                red: this.red,
                green: this.green,
                blue: this.blue,
                alpha: this.alpha
            };
        }

        toRgbString():string {
            return this.alpha === 1 ?
            "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")" :
            "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
        }

        toHexString(withChar:boolean = true):string {
            var hex = Rise.Color.rgbToHex(this.red, this.green, this.blue, this.alpha);
            return withChar ? '#' + hex : hex
        }

        toHslObject():Rise.Color.HSLColorObjectInterface {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue);

            return {
                hue: hsl.hue * 360,
                saturation: hsl.saturation,
                lightness: hsl.lightness,
                alpha: this.alpha
            };
        }

        toHslString():string {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue),
                hue = Math.round(hsl.hue * 360),
                saturation = Math.round(hsl.saturation * 100),
                lightness = Math.round(hsl.lightness * 100);

            return this.alpha === 1 ?
            "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)" :
            "hsla(" + hue + ", " + saturation + "%, " + lightness + "%, " + this.alpha + ")";
        }

        toHsvObject():Rise.Color.HSVColorObjectInterface {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue);

            return {
                hue: hsv.hue * 360,
                saturation: hsv.saturation,
                value: hsv.value,
                alpha: this.alpha
            };
        }

        toHsvString():string {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue),
                hue = Math.round(hsv.hue * 360),
                saturation = Math.round(hsv.saturation * 100),
                value = Math.round(hsv.value * 100);

            return this.alpha === 1 ?
            "hsv(" + hue + ", " + saturation + "%, " + value + "%)" :
            "hsva(" + hue + ", " + saturation + "%, " + value + "%, " + this.alpha + ")";
        }

        lighten(amount:number = 10):Rise.Color.HSLColor {
            var hsl = this.toHslObject();
            hsl.lightness = Math.min(1, Math.max(0, hsl.lightness + (amount / 100)));

            return new Rise.Color.HSLColor(hsl);
        }

        darken(amount:number = 10):Rise.Color.HSLColor {
            var hsl = this.toHslObject();
            hsl.lightness = Math.min(1, Math.max(0, hsl.lightness - (amount / 100)));

            return new Rise.Color.HSLColor(hsl);
        }

        desaturate(amount:number = 10):Rise.Color.HSLColor {
            var hsl = this.toHslObject();
            hsl.saturation = Math.min(1, Math.max(0, hsl.saturation - (amount / 100)));

            return new Rise.Color.HSLColor(hsl);
        }

        saturate(amount:number = 10):Rise.Color.HSLColor {
            var hsl = this.toHslObject();
            hsl.saturation = Math.min(1, Math.max(0, hsl.saturation + (amount / 100)));

            return new Rise.Color.HSLColor(hsl);
        }

        brighten(amount:number = 10):Rise.Color.RGBColor {
            return new Rise.Color.RGBColor({
                red: Math.max(0, Math.min(255, this.red - Math.round(255 * -(amount / 100)))),
                green: Math.max(0, Math.min(255, this.green - Math.round(255 * -(amount / 100)))),
                blue: Math.max(0, Math.min(255, this.blue - Math.round(255 * -(amount / 100))))
            });
        }

        greyscale():Rise.Color.HSLColor {
            return this.desaturate(100);
        }

        spin(amount:number = 0):Rise.Color.HSLColor {
            var hsl = this.toHslObject(),
                hue = (Math.round(hsl.hue) + amount) % 360;

            hsl.hue = hue < 0 ? 360 + hue : hue;

            return new Rise.Color.HSLColor(hsl);
        }

        getAnalogous(results:number = 6, slices:number = 30):Array<Rise.Color.RGBColor> {
            var hsl = this.toHslObject(),
                part = 360 / slices,
                result = [new Rise.Color.RGBColor(this)];

            for (hsl.hue = ((hsl.hue - (part * results >> 1)) + 720) % 360; --results;) {
                hsl.hue = (hsl.hue + part) % 360;
                result.push(new Rise.Color.HSLColor(hsl));
            }

            return result;
        }

        getComplementary():Rise.Color.HSLColor {
            var hsl = this.toHslObject();
            hsl.hue = (hsl.hue + 180) % 360;
            return new Rise.Color.HSLColor(hsl);
        }

        getMonochromatic(results:number = 6):Array<Rise.Color.HSVColor> {
            var hsv = this.toHsvObject(),
                result = [],
                modification = 1 / results;

            while (results--) {
                result.push(new Rise.Color.HSVColor({
                    h: hsv.hue,
                    s: hsv.saturation,
                    v: hsv.value
                }));

                hsv.value = (hsv.value + modification) % 1;
            }

            return result;
        }

        getSplitComplementary():Array<Rise.Color.RGBColor> {
            var hsl = this.toHslObject();

            return [
                new Rise.Color.RGBColor(this),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 72) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                }),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 216) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                })
            ];
        }

        getTriad():Array<Rise.Color.RGBColor> {
            var hsl = this.toHslObject();

            return [
                new Rise.Color.RGBColor(this),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 120) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                }),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 240) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                })
            ];
        }

        getTetrad():Array<Rise.Color.RGBColor> {
            var hsl = this.toHslObject();

            return [
                new Rise.Color.RGBColor(this),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 90) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                }),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 180) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
                }),
                new Rise.Color.HSLColor({
                    h: (hsl.hue + 270) % 360,
                    s: hsl.saturation,
                    l: hsl.lightness
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