Rise.Font = Rise.Class.extend({
    /**
     * Create new Font object
     * @constructor
     * @param  {Object} options Font options
     * @return {Rise.Font}      Returns Rise.Font instance
     */
    init: function(options) {
        options = options || {};

        Rise.Logger.startGroup(true, 'Rise.Font -> init()');
        Rise.Logger.log('Trying to parse options object -> %O', options);

        this.style = options.style || 'normal';
        this.variant = options.variant || 'normal';
        this.weight = options.weight || 'normal';
        this.size = options.size || 'medium';
        this.lineHeight = options.lineHeight || 'normal';
        this.family = options.family || 'serif';

        if (!Rise.Font.isFontValid(this)) {
            Rise.Logger.warning('Font %O not parsed, reset to defaults', options);
        }

        Rise.Logger.log('Font %O parsed to Rise.Font -> %O', options, this);
        Rise.Logger.endGroup();

        return this;
    },

    isValid: function() {
        return this.valid;
    },

    getStyle: function() {
        return this.style;
    },

    setStyle: function(style) {
        if (isFontStyleValid(style)) {
            this.style = style;
        }

        return this;
    },

    getVariant: function() {
        return this.variant;
    },

    setVariant: function(variant) {
        if (isFontVariantValid(variant)) {
            this.variant = variant;
        }

        return this;
    },

    getWeight: function() {
        return this.weight;
    },

    setWeight: function(weight) {
        if (isFontWeightValid(weight)) {
            this.weight = weight;
        }

        return this;
    },

    getSize: function() {
        return this.size;
    },

    setSize: function(size) {
        if (isFontSizeValid(size)) {
            this.size = size;
        }

        return this;
    },

    getLineHeight: function() {
        return this.lineHeight;
    },

    setLineHeight: function(lineHeight) {
        if (isFontLineHeightValid(lineHeight)) {
            this.lineHeight = lineHeight;
        }

        return this;
    },

    getFamily: function() {
        return this.family;
    },

    setFamily: function(family) {
        if (isFontFamilyValid(family)) {
            this.family = family;
        }

        return this;
    },

    toString: function() {
        return (
            [
                this.style,
                this.variant,
                this.weight,
                this.size,
                '/' + this.lineHeight,
                this.family
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
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid CSS value
     */
    isCssValueValid: function(value) {
        return Rise.Font.unitsMap.some(function(unit) {
            return value.lastIndexOf(unit) != -1;
        });
    },

    /**
     * Check if provided value is valid CSS font style
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontStyleValid: function(value) {
        return Rise.Font.fontStyleMap.indexOf(value) != -1;
    },

    /**
     * Check if provided value is valid CSS font variant
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontVariantValid: function(value) {
        return Rise.Font.fontVariantMap.indexOf(value) != -1;
    },

    /**
     * Check if provided value is valid CSS font weight
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontWeightValid: function(value) {
        return Rise.Font.fontWeightMap.indexOf(value) != -1;
    },

    /**
     * Check if provided value is valid CSS font size
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontSizeValid: function(value) {
        return (
            Rise.Font.fontSizeMap.indexOf(value) != -1 ||
            Rise.Font.isCssValueValid(value)
        );
    },

    /**
     * Check if provided value is valid CSS font line height
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontLineHeightValid: function(value) {
        return (
            Rise.Font.isCssValueValid(value) ||
            Rise.Font.fontLineHeightMap.indexOf(value) != -1
        );
    },

    /**
     * Check if provided value is valid CSS font family
     * @static
     * @param  {String}  value Value that need to check
     * @return {Boolean}       Returns true if value is valid
     */
    isFontFamilyValid: function(value) {
        // TODO: implement
        return true;
    },

    /**
     * Check whole Rise.Font instance for valid values
     * @static
     * @param  {Rise.Font}  font Rise.Font instance where need to check their font values
     * @return {Boolean}         Returns true if Rise.Font is correct instance
     */
    isFontValid: function(font) {
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
     * @static
     * @param  {String} font    Font string
     * @return {Rise.Font}      Returns Rise.Font instance with parsed options from string
     */
    fromString: function(font) {
        // TODO: implement
        Rise.Logger.warning('Rise.Font -> fromString() not realized yet');
        return new Rise.Font();
    },

    /**
     * Create Rise.Font instance from exists node element
     * @static
     * @param  {Element} element Existing node element from where font options will parse
     * @return {Rise.Font}       Returns Rise.Font instance
     */
    fromNode: function(element) {
        element = Rise.$(element);

        var style = window.getComputedStyle(element.get(0), null);

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