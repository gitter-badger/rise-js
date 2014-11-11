module Rise.Color {
    export interface HSVColorInterface {
        hue:number;
        saturation:number;
        value:number;
        alpha:number;
    }

    export class HSVColor extends Rise.Color.RGBColor implements Rise.Color.HSVColorInterface {
        private _hue:number;
        private _saturation:number;
        private _value:number;

        constructor(color:any) {
            super(color);
            color.s = decimalToPercentage(color.s);
            color.v = decimalToPercentage(color.v);
            rgb = Rise.Color.hsvToRgb(color.h, color.s, color.v);
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

        get value() {
            return this._value;
        }

        set value(value:number) {

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

        getValue() {
            return this.value;
        }

        setValue(value:number) {
            this.value = value;
            return this;
        }

        toHsvObject() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue);

            return {
                h: hsv.h * 360,
                s: hsv.s,
                v: hsv.v,
                alpha: this.alpha
            };
        }

        toHsvString() {
            var hsv = Rise.Color.rgbToHsv(this.red, this.green, this.blue),
                h = Math.round(hsv.h * 360),
                s = Math.round(hsv.s * 100),
                v = Math.round(hsv.v * 100);

            return this.alpha === 1 ?
            "hsv(" + h + ", " + s + "%, " + v + "%)" :
            "hsva(" + h + ", " + s + "%, " + v + "%, " + this.getAlpha() + ")";
        }
    }
}