module Rise.Color {
    export interface HSLColorInterface {
        hue:number;
        saturation:number;
        level:number;
        alpha:number;
    }

    export class HSLColor extends Rise.Color.RGBColor implements HSLColorInterface {
        private _hue:number;
        private _saturation:number;
        private _level:number;

        constructor(color:any) {
            super(color);
            color.s = decimalToPercentage(color.s);
            color.l = decimalToPercentage(color.l);
            rgb = Rise.Color.hslToRgb(color.h, color.s, color.l);
        }

        get hue() {
            return this._hue;
        }

        set hue(hue:number) {

        }

        get saturation() {
            return this._saturation;
        }

        set saturation(saturation:number) {

        }

        get level() {
            return this._level;
        }

        set level(level:number) {

        }

        getHue() {
            return this.hue;
        }

        setHue(hue:number) {
            this.hue = hue;
            return this;
        }

        getSaturation() {
            return this.saturation;
        }

        setSaturation(saturation:number) {
            this.saturation = saturation;
            return this;
        }

        getLevel() {
            return this.level;
        }

        setLevel(level:number) {
            this.level = level;
            return this;
        }

        toHslObject() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue);

            return {
                h: hsl.h * 360,
                s: hsl.s,
                l: hsl.l,
                alpha: this.alpha
            };
        }

        toHslString() {
            var hsl = Rise.Color.rgbToHsl(this.red, this.green, this.blue),
                h = Math.round(hsl.h * 360),
                s = Math.round(hsl.s * 100),
                l = Math.round(hsl.l * 100);

            return this.alpha === 1 ?
            "hsl(" + h + ", " + s + "%, " + l + "%)" :
            "hsla(" + h + ", " + s + "%, " + l + "%, " + this.getAlpha() + ")";
        }
    }
}