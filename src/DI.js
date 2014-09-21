(function () {
    'use strict';

    /**
     * All registered services in DI container
     * @type {Object}
     */
    var services = {};

    Rise.DI = {
        /**
         * Get service by name
         * @param  {String} name Service name
         * @return {Object}       Returns service if exists
         */
        get: function (name) {
            return services[name];
        },

        /**
         * Register service by name
         * @param  {String} key   Service name
         * @param  {Object} value  Value of service
         * @return {Rise.DI}      Returns instance of Rise.DI
         */
        register: function (key, value) {
            services[key] = value;
            return this;
        },

        /**
         * Destroy module from DI container
         * @param key Key of module
         * @returns {Rise.DI}
         */
        unregister: function (key) {
            services[key] = null;
            return this;
        },

        /**
         * Resolve dependencies and call function
         * @param  {Array} dependencies Array with string items
         * @param  {Function} callback  Function which applies dependencies
         * @param  {Object} scope       Function context
         * @return {Rise.DI}            Returns Rise.DI
         * @example
         * Rise.DI.resolve(['Rise.Color'], function(Color) {
         *      new Color('black').toRgbString();
         * });
         */
        resolve: function (dependencies, callback, scope) {
            var args = [],
                service;

            for (var i = 0; i < dependencies.length; i++) {
                service = this.get(dependencies[i]);
                if (service) {
                    args.push(service);
                } else {
                    throw new Error('Dependency not resolved -> ' + dependencies[i]);
                }
            }

            callback.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
        }
    };
})();