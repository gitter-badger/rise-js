(function(global) {
    /**
     * Copy properties from parent to target object
     * @param  {Object} source Object from where properties will be copied
     * @param  {Object} target Object to where properties will copy
     * @param  {Object} parent Parent object
     * @private
     */
    function copyProperties(source, target, parent) {
        Object.keys(source).forEach(function(key) {
            if (typeof source[key] == "function" && typeof parent[key] == "function" && /\b_super\b/.test(source[key])) {
                target[key] = wrapMethod(source[key], parent[key]);
            } else {
                target[key] = source[key];
            }
        });
    }

    /**
     * Wrap method with parent method.
     * Useful for create this._super() in subclasses.
     * @param  {Function} method       Method that need to be wrapped
     * @param  {Function} parentMethod Parent method in other works - this._super();
     * @return {Function}              Returns wrapped function
     */
    function wrapMethod(method, parentMethod) {
        return function() {
            var backup = this._super;
            this._super = parentMethod;

            try {
                return method.apply(this, arguments);
            } finally {
                this._super = backup;
            }
        };
    }

    /**
     * Empty function (interface)
     * @member Rise.Class
     * @private
     */
    function Class() {}

    /**
     * Create new Class or extend exists
     * @param {Array} [mixins] Optional parameter. Array of mixins which need to inject in new Class
     * @param {Object} prototype Prototype object for new Class
     * @param {Object} staticProperties Object with static properties for new Class. Will send in Object.defineProperties.
     * @return {Object} Returns new Class
     * @member Rise.Class
     *
     * @example
     * Rise.Class.extend([prototype])
     * Rise.Class.extend([prototype], [staticProperties])
     * Rise.Class.extend([prototype], [staticProperties], [mixins])
     */
    Class.extend = function(prototype, staticProperties, mixins) {
        prototype = prototype || {};
        staticProperties = staticProperties || {};
        mixins = mixins || [];

        function Constructor() {
            return this.init && this.init.apply(this, arguments);
        }

        Constructor.prototype = Object.create(this.prototype);
        Constructor.prototype.constructor = Constructor;
        Constructor.extend = Class.extend;

        copyProperties(staticProperties, Constructor, this);
        copyProperties(prototype, Constructor.prototype, this.prototype);
        for (var i = mixins.length - 1; i >= 0; i--) {
            copyProperties(mixins[i], Constructor.prototype, this.prototype);
        }

        return Constructor;
    };

    global.Rise.Class = Class;

})(this);