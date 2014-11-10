module Rise.Shadow {
    var shadowRegExp:RegExp = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/;

    export class Shadow {
        private _color:Rise.Color;
        private _blur:number;
        private _offsetX:number;
        private _offsetY:number;

        constructor(shadow:Shadow);
        constructor(shadow:IShadow);
        constructor(shadow:string);
        constructor(shadow:any) {
            if (shadow instanceof Shadow) {
                return shadow;
            } else if (typeof shadow == 'string') {
                return Rise.Shadow.fromString(shadow);
            } else if (typeof shadow == 'object') {
                this.color = shadow.color || 'black';
                this.blur = shadow.blur || 0;
                this.offsetX = shadow.offsetX || 0;
                this.offsetY = shadow.offsetY || 0;
            }
        }

        get color():Rise.Color {
            return this._color;
        }

        set color(color:any) {
            this._color = new Rise.Color(color);
        }

        get blur():Number {
            return this._blur;
        }

        set blur(blur:Number) {
            this._blur = blur;
        }

        get offsetX():Number {
            return this._offsetX;
        }

        set offsetX(offsetX:Number) {
            this._offsetX = offsetX;
        }

        get offsetY():Number {
            return this._offsetY;
        }

        set offsetY(offsetY:Number) {
            this._offsetY = offsetY;
        }

        toString():String {
            return [
                this.offsetX,
                this.offsetY,
                this.blur,
                this.color.toRgbString()
            ].join('px ');
        }

        static fromString(shadow:String) {
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
    }
}