(function () {
    'use strict';

    Rise.Font = Rise.Class.create({
        /**
         * Create new Rise.Font instance
         * @param {String|Object|Element} font
         * @return {Rise.Font|Object} Returns Rise.Font instance
         */
        init: function (font) {
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
        },

        /**
         * Check if Rise.Font is valid instance
         * @return {Boolean} Returns true if Rise.Font instance valid
         */
        isValid: function () {
            return Rise.Font.isFontValid(this);
        },

        /**
         * Get current style
         * @return {String} Returns CSS font style
         */
        getStyle: function () {
            return this.style;
        },

        /**
         * Set style to Rise.Font
         * @param {String} style New CSS font style
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setStyle: function (style) {
            if (Rise.Font.isFontStyleValid(style)) {
                this.style = style;
            } else {
                Rise.Logger.warning('Rise.Font.setStyle() -> "%s" is not valid value', style);
            }

            return this;
        },

        /**
         * Get current font variant
         * @return {String} Returns CSS font variant
         */
        getVariant: function () {
            return this.variant;
        },

        /**
         * Set font variant to Rise.Font
         * @param {String} variant New CSS font variant
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setVariant: function (variant) {
            if (Rise.Font.isFontVariantValid(variant)) {
                this.variant = variant;
            } else {
                Rise.Logger.warning('Rise.Font.setVariant() -> "%s" is not valid value', variant);
            }

            return this;
        },

        /**
         * Get current font weight
         * @return {String} Returns CSS font weight
         */
        getWeight: function () {
            return this.weight;
        },

        /**
         * Set font weight to Rise.Font
         * @param {String} weight New CSS font weight
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setWeight: function (weight) {
            if (Rise.Font.isFontWeightValid(weight)) {
                this.weight = weight;
            } else {
                Rise.Logger.warning('Rise.Font.setWeight() -> "%s" is not valid value', weight);
            }

            return this;
        },

        /**
         * Get current font size
         * @return {String} Returns CSS font size
         */
        getSize: function () {
            return this.size;
        },

        /**
         * Set font size to Rise.Font
         * @param {String} size New CSS font size
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setSize: function (size) {
            if (Rise.Font.isFontSizeValid(size)) {
                this.size = size;
            } else {
                Rise.Logger.warning('Rise.Font.setSize() -> "%s" is not valid value', size);
            }

            return this;
        },

        /**
         * Get current font line height
         * @return {String} Returns CSS font line-height
         */
        getLineHeight: function () {
            return this.lineHeight;
        },

        /**
         * Set font line height to Rise.Font
         * @param {String} lineHeight New CSS font line-height
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setLineHeight: function (lineHeight) {
            if (Rise.Font.isFontLineHeightValid(lineHeight)) {
                this.lineHeight = lineHeight;
            } else {
                Rise.Logger.warning('Rise.Font.setLineHeight() -> "%s" is not valid value', lineHeight);
            }

            return this;
        },

        /**
         * Get current font family
         * @return {String} Returns CSS font family
         */
        getFamily: function () {
            return this.family;
        },

        /**
         * Set font family to Rise.Font
         * @param {String} family New CSS font family
         * @return {Rise.Font} Returns Rise.Font instance
         */
        setFamily: function (family) {
            if (Rise.Font.isFontFamilyValid(family)) {
                this.family = family;
            } else {
                Rise.Logger.warning('Rise.Font.setFamily() -> "%s" is not valid value', family);
            }

            return this;
        },

        /**
         * Convert Rise.Font to CSS string representation
         * @return {String} Returns CSS string of Rise.Font representation
         */
        toString: function () {
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
    }, {
        /**
         * Map of CSS units
         * @static
         * @type {Array}
         */
        unitsMap: ['em', 'ex', 'pt', 'px', '%'],

        /**
         * Map of CSS font styles
         * @static
         * @type {Array}
         */
        fontStyleMap: ['normal', 'italic', 'oblique', 'inherit'],

        /**
         * Map of CSS font variants
         * @static
         * @type {Array}
         */
        fontVariantMap: ['normal', 'small-caps', 'inherit'],

        /**
         * Map of CSS font weights
         * @static
         * @type {Array}
         */
        fontWeightMap: ['bold', 'bolder', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'],

        /**
         * Map of CSS font sizes
         * @static
         * @type {Array}
         */
        fontSizeMap: ['xx-small', 'x-small', 'smaller', 'small', 'medium', 'large', 'larger', 'x-large', 'xx-large'],

        /**
         * Map of CSS font line heights
         * @static
         * @type {Array}
         */
        fontLineHeightMap: ['normal', 'inherit'],

        /**
         * Check if provided value is valid CSS value
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid CSS value
         */
        isCssValueValid: function (value) {
            return Rise.Font.unitsMap.some(function (unit) {
                return value && value.lastIndexOf(unit) !== -1;
            });
        },

        /**
         * Check if provided value is valid CSS font style
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         */
        isFontStyleValid: function (value) {
            return Rise.Font.fontStyleMap.indexOf(value) !== -1;
        },

        /**
         * Check if provided value is valid CSS font variant
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         */
        isFontVariantValid: function (value) {
            return Rise.Font.fontVariantMap.indexOf(value) !== -1;
        },

        /**
         * Check if provided value is valid CSS font weight
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         */
        isFontWeightValid: function (value) {
            return Rise.Font.fontWeightMap.indexOf(value) !== -1;
        },

        /**
         * Check if provided value is valid CSS font size
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         */
        isFontSizeValid: function (value) {
            return (
                Rise.Font.fontSizeMap.indexOf(value) !== -1 ||
                Rise.Font.isCssValueValid(value)
                );
        },

        /**
         * Check if provided value is valid CSS font line height
         * @static
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         */
        isFontLineHeightValid: function (value) {
            return (
                Rise.Font.isCssValueValid(value) ||
                Rise.Font.fontLineHeightMap.indexOf(value) !== -1
                );
        },

        /**
         * Check if provided value is valid CSS font family
         * @param {String} value Value that need to check
         * @return {Boolean} Returns true if value is valid
         * @static
         */
        isFontFamilyValid: function (value) {
            return typeof value === 'string';
        },

        /**
         * Check whole Rise.Font instance for valid values
         * @static
         * @param {Rise.Font} font Rise.Font instance where need to check their font values
         * @return {Boolean} Returns true if Rise.Font is correct instance
         */
        isFontValid: function (font) {
            return (
                Rise.Font.isFontStyleValid(font.getStyle()) &&
                Rise.Font.isFontVariantValid(font.getVariant()) &&
                Rise.Font.isFontWeightValid(font.getWeight()) &&
                Rise.Font.isFontSizeValid(font.getSize()) &&
                Rise.Font.isFontLineHeightValid(font.getLineHeight()) &&
                Rise.Font.isFontFamilyValid(font.getFamily())
                );
        },

        /**
         * Create Rise.Font instance from string representation
         * @param {String} value Font string
         * @return {Rise.Font} Returns Rise.Font instance with parsed options from string
         * @static
         */
        fromString: function (value) {
            // TODO: implement
            Rise.Logger.warning('Rise.Font -> fromString(%s) not realized yet', value);
            return new Rise.Font({});
        },

        /**
         * Create Rise.Font instance from exists node element
         * @static
         * @param  {Element} element Existing node element from where font options will parse
         * @return {Rise.Font} Returns Rise.Font instance
         */
        fromNode: function (element) {
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
    });
})();