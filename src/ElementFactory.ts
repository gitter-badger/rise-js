(function () {
    "use strict";

    Rise.ElementFactory = Rise.Class.create({
        /**
         * Create new Rise.Element
         * @param {String} type Element's type i.e. Text
         * @param {Object} [options] Additional options to element constructor
         * @returns {Boolean|Rise.Element|Object} Returns created element of false
         */
        create: function (type, options) {
            type = [type.charAt(0).toUpperCase() , type.slice(1) , 'Element'].join('');

            if (!Rise.Util.isFunction(Rise[type])) {
                return false;
            }

            return new Rise[type](options);
        }
    });

    Rise.Element = new Rise.ElementFactory();
}());