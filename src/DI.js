(function () {
    'use strict';

    /**
     * All registered services in DI container
     * @type {Object}
     */
    var serviceContainer = {};

    Rise.DI = {
        /**
         * Get service by name
         * @param {String} name Service name (key)
         * @returns {*} Returns service
         */
        get: function (name) {
            return serviceContainer[name];
        },

        /**
         * Register new service in container
         * @param {String} key Service name (key)
         * @param value Service can be as object or function
         * @returns {Rise.DI}
         */
        register: function (key, value) {
            serviceContainer[key] = value;
            return this;
        },

        /**
         * Delete service from DI container
         * @param {String} key Service name (key)
         * @returns {Rise.DI}
         */
        unregister: function (key) {
            delete serviceContainer[key];
            return this;
        },

        /**
         * Resolve service dependencies and send to function
         * @param {Function} [callback] Function which apply all dependencies as arguments
         * @param {Object} [scope] Custom scope for callback function
         * @returns {Rise.DI}
         */
        resolve: function (callback, scope) {
            var args = [],
                dependencies = callback.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(','),
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

            return this;
        }
    };
})();