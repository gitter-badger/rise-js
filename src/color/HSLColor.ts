module Rise.Color {
    function decimalToPercentage(value) {
        value = parseFloat(value);

        if (isFinite(value) && value >= 0 && value <= 1) {
            return (value * 100) + "%";
        } else {
            return value;
        }
    }

    export class HSLColor extends Rise.Color.RGBColor implements Rise.Color.HSLColorInterface {
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


    }
}