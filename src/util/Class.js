(function () {
    'use strict';

    /**
     * Wrap method with function which set super to object
     * @param {Function} sourceMethod Source method that need to wrap
     * @param {Function} superMethod super method that will be called
     * @returns {Function} Returns wrapped function
     */
    function wrapMethod(sourceMethod, superMethod) {
        return function () {
            var backup = this._super;

            this._super = superMethod;

            try {
                return sourceMethod.apply(this, arguments);
            } finally {
                this._super = backup;
            }
        };
    }

    /**
     * Copy properties from source object to target object
     * @param source Source object from where properties will copied
     * @param target Target object to where properties will copied
     * @param parent Parent object for wrap source methods with super
     */
    function copyProperties(source, target, parent) {
        Object.keys(source).forEach(function (key) {
            if (typeof source[key] === "function" && typeof parent[key] === "function" && /this\._super\(/.test(source[key])) {
                target[key] = wrapMethod(source[key], parent[key]);
            } else {
                target[key] = source[key];
            }
        });
    }

    /**
     * Blank function
     * @constructor
     */
    function Class() {
    }

    /**
     * Create new class
     * @param {Object} [prototype] Prototype object for class
     * @param {Object} [staticProperties] Static properties for new class
     * @param {Array} [mixin] Array of object which will be mixed into class prototype
     * @returns {Constructor} Returns new created class
     */
    Class.create = function (prototype, staticProperties, mixin) {
        prototype = prototype || {};
        staticProperties = staticProperties || {};
        mixin = mixin || [];

        var i;

        function Constructor() {
            return this.init && this.init.apply(this, arguments);
        }

        Constructor.prototype = Object.create(this.prototype);
        Constructor.prototype.constructor = Constructor;
        Constructor.extend = Class.create;

        copyProperties(staticProperties, Constructor, this);
        copyProperties(prototype, Constructor.prototype, this.prototype);

        for (i = 0; i < mixin.length; i++) {
            copyProperties(mixin[i], Constructor.prototype, this.prototype);
        }

        return Constructor;
    };

    Rise.Class = Class;

}());