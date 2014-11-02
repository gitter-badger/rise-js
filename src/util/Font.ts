module Rise {
    export class Font {
        constructor(font:string);
        constructor(font:Element);
        constructor(font:Object);
        constructor(font:Rise.Font) {
            font = font || {};

            if (font instanceof Rise.Font) {
                return font;
            } else if (Rise.Util.isString(font)) {
                return Rise.Font.fromString(font);
            } else if (font instanceof Element) {
                return Rise.Font.fromNode(font);
            } else if (Rise.Util.isObject(font)) {
                Rise.Logger.startGroup(true, 'Rise.Font -> init()');
                Rise.Logger.log('Trying to parse font object -> %O', font);

                this.setStyle(font.style || 'normal');
                this.setVariant(font.variant || 'normal');
                this.setWeight(font.weight || 'normal');
                this.setSize(font.size || 'medium');
                this.setLineHeight(font.lineHeight || 'normal');
                this.setFamily(font.family || 'serif');

                Rise.Logger.log('Instantiated Rise.Font -> %O', this);
                Rise.Logger.endGroup();
            } else {
                Rise.Logger.warning('Font -> %O not parsed', font);
                return false;
            }

            return this;
        }

        isValid() {
            return Rise.Font.isFontValid(this);
        }

        getStyle() {
            return this.style;
        }

        setStyle(style) {
            if (Rise.Font.isFontStyleValid(style)) {
                this.style = style;
            } else {
                Rise.Logger.warning('Rise.Font.setStyle() -> "%s" is not valid value', style);
            }

            return this;
        }

        getVariant() {
            return this.variant;
        }

        setVariant(variant) {
            if (Rise.Font.isFontVariantValid(variant)) {
                this.variant = variant;
            } else {
                Rise.Logger.warning('Rise.Font.setVariant() -> "%s" is not valid value', variant);
            }

            return this;
        }

        getWeight() {
            return this.weight;
        }

        setWeight(weight) {
            if (Rise.Font.isFontWeightValid(weight)) {
                this.weight = weight;
            } else {
                Rise.Logger.warning('Rise.Font.setWeight() -> "%s" is not valid value', weight);
            }

            return this;
        }

        getSize() {
            return this.size;
        }

        setSize(size) {
            if (Rise.Font.isFontSizeValid(size)) {
                this.size = size;
            } else {
                Rise.Logger.warning('Rise.Font.setSize() -> "%s" is not valid value', size);
            }

            return this;
        }

        getLineHeight() {
            return this.lineHeight;
        }

        setLineHeight(lineHeight) {
            if (Rise.Font.isFontLineHeightValid(lineHeight)) {
                this.lineHeight = lineHeight;
            } else {
                Rise.Logger.warning('Rise.Font.setLineHeight() -> "%s" is not valid value', lineHeight);
            }

            return this;
        }

        getFamily() {
            return this.family;
        }

        setFamily(family) {
            if (Rise.Font.isFontFamilyValid(family)) {
                this.family = family;
            } else {
                Rise.Logger.warning('Rise.Font.setFamily() -> "%s" is not valid value', family);
            }

            return this;
        }

        toString() {
            return (
                [
                    this.getStyle(),
                    this.getVariant(),
                    this.getWeight(),
                    this.getSize(),
                    '/' + this.getLineHeight(),
                    this.getFamily()
                ].join(' ')
            );
        }

        static unitsMap:Array = ['em', 'ex', 'pt', 'px', '%'];
        static fontStyleMap:Array = ['normal', 'italic', 'oblique', 'inherit'];
        static fontVariantMap:Array = ['normal', 'small-caps', 'inherit'];
        static fontWeightMap:Array = ['bold', 'bolder', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        static fontSizeMap:Array = ['xx-small', 'x-small', 'smaller', 'small', 'medium', 'large', 'larger', 'x-large', 'xx-large'];
        static fontLineHeightMap:Array = ['normal', 'inherit'];

        static isCssValueValid(value) {
            return Rise.Font.unitsMap.some(function (unit) {
                return value && value.lastIndexOf(unit) !== -1;
            });
        }

        static isFontStyleValid(value) {
            return Rise.Font.fontStyleMap.indexOf(value) !== -1;
        }

        static isFontVariantValid(value) {
            return Rise.Font.fontVariantMap.indexOf(value) !== -1;
        }

        static isFontWeightValid(value) {
            return Rise.Font.fontWeightMap.indexOf(value) !== -1;
        }

        static isFontSizeValid(value) {
            return (
            Rise.Font.fontSizeMap.indexOf(value) !== -1 ||
            Rise.Font.isCssValueValid(value)
            );
        }

        static isFontLineHeightValid(value) {
            return (
            Rise.Font.isCssValueValid(value) ||
            Rise.Font.fontLineHeightMap.indexOf(value) !== -1
            );
        }

        static isFontFamilyValid(value) {
            return typeof value === 'string';
        }

        static isFontValid(font) {
            return (
            Rise.Font.isFontStyleValid(font.getStyle()) &&
            Rise.Font.isFontVariantValid(font.getVariant()) &&
            Rise.Font.isFontWeightValid(font.getWeight()) &&
            Rise.Font.isFontSizeValid(font.getSize()) &&
            Rise.Font.isFontLineHeightValid(font.getLineHeight()) &&
            Rise.Font.isFontFamilyValid(font.getFamily())
            );
        }

        static fromString(value) {
            // TODO: implement
            Rise.Logger.warning('Rise.Font -> fromString(%s) not realized yet', value);
            return new Rise.Font({});
        }

        static fromNode(element) {
            var style = window.getComputedStyle(element, null);

            return new Rise.Font({
                style: style.getPropertyValue('font-style'),
                variant: style.getPropertyValue('font-variant'),
                weight: style.getPropertyValue('font-weight'),
                size: style.getPropertyValue('font-size'),
                lineHeight: style.getPropertyValue('line-height'),
                family: style.getPropertyValue('font-family')
            });
        }
    }
}