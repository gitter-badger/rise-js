module Rise {
    var shadowRegExp:RegExp = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/;

    export interface IShadowParam {
        color:Rise.Color;
        blur:number;
        offsetX:number;
        offsetY:number;
    }

    export interface IShadow extends IShadowParam {
        toString():string;
    }

    export class Shadow implements IShadow {
        private _color:Rise.Color;
        private _blur:number;
        private _offsetX:number;
        private _offsetY:number;

        constructor(shadow:Shadow) {
            return shadow;
        }

        constructor(shadow:string) {
            shadow = shadow.trim();

            var offsetsAndBlur = shadowRegExp.exec(shadow) || [],
                color = shadow.replace(shadowRegExp, '') || 'rgb(0, 0, 0)';

            return new Rise.Shadow({
                color: new Rise.Color(color),
                blur: parseInt(offsetsAndBlur[3], 10) || 0,
                offsetX: parseInt(offsetsAndBlur[1], 10) || 0,
                offsetY: parseInt(offsetsAndBlur[2], 10) || 0
            });
        }

        constructor(shadow:IShadowParam) {
            this.color = shadow.color || 'black';
            this.blur = shadow.blur || 0;
            this.offsetX = shadow.offsetX || 0;
            this.offsetY = shadow.offsetY || 0;
        }

        get color() {
            return this._color;
        }

        set color(color:any) {
            this._color = new Rise.Color(color);
        }

        get blur() {
            return this._blur;
        }

        set blur(blur:number) {
            this._blur = blur;
        }

        get offsetX() {
            return this._offsetX;
        }

        set offsetX(offsetX:number) {
            this._offsetX = offsetX;
        }

        get offsetY() {
            return this._offsetY;
        }

        set offsetY(offsetY:number) {
            this._offsetY = offsetY;
            return this;
        }

        toString() {
            return [
                this.offsetX,
                this.offsetY,
                this.blur,
                this.color.toRgbString()
            ].join('px ');
        }
    }
}