(function(global) {
    'use strict';

    var services = {};

    global.Rise.DI = {
        /**
         * Get service by name
         * @param  {String} name Service name
         * @return {Mixed}       Returns service if exists
         */
        get: function(name) {
            return services[name];
        },

        /**
         * Register service by name
         * @param  {String} key   Service name
         * @param  {Mixed} value  Value of service
         * @return {Rise.DI}      Returns instance of Rise.DI
         */
        register: function(key, value) {
            services[key] = value;
            return this;
        },

        /**
         * Resolve dependencies and call function
         * @param  {Array} deps         Array with dependencies
         * @param  {Function} callback  Function which applies dependencies
         * @param  {Object} scope       Function context
         * @return {Rise.DI}            Returns Rise.DI
         */
        resolve: function(dependencies, callback, scope) {
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
})(this);