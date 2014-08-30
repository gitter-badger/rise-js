(function(global) {
    'use strict';

    /**
     * Copy properties from parent to target object
     * @param  {Object} source Object from where properties will be copied
     * @param  {Object} target Object to where properties will copy
     * @param  {Object} parent Parent object
     * @private
     */
    function copyProperties(source, target, parent) {
        Object.keys(source).forEach(function(key) {
            if (
                typeof source[key] == "function" &&
                typeof parent[key] == "function" &&
                /\b_super\b/.test(source[key])
            ) {
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
     * @param  {Function} parentMethod Parent method, in other words - this._super();
     * @return {Function}              Returns wrapped function
     * @private
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
     * @private
     */
    function Class() {}

    /**
     * Create new Class or extend exists
     * @static
     * @param {Object} [prototype] Prototype object for new Class
     * @param {Object} [staticProperties] Object with static properties for new Class
     * @param {Array}  [mixins] Array of mixins which need to inject in new Class prototype
     * @return {Object} Returns new Class
     *
     * @example
     * Rise.Class.create([prototype])
     * Rise.Class.create([prototype], [staticProperties])
     * Rise.Class.create([prototype], [staticProperties], [mixins])
     */
    Class.create = function(prototype, staticProperties, mixins) {
        prototype = prototype || {};
        staticProperties = staticProperties || {};
        mixins = mixins || [];

        function Constructor() {
            return this.init && this.init.apply(this, arguments);
        }

        Constructor.prototype = Object.create(this.prototype);
        Constructor.prototype.constructor = Constructor;
        Constructor.extend = Class.create;

        copyProperties(staticProperties, Constructor, this);
        copyProperties(prototype, Constructor.prototype, this.prototype);
        for (var i = mixins.length - 1; i >= 0; i--) {
            copyProperties(mixins[i], Constructor.prototype, this.prototype);
        }

        return Constructor;
    };

    global.Rise.Class = Class;

})(this);