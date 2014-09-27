(function () {
    "use strict";

    Rise.Extension = Rise.Class.create({
        /**
         * Name of extension
         */
        name: 'Basic',

        /**
         * Basic constructor for new extensions
         * @param {Rise} rise Current Rise instance where extension is instantiated
         * @returns {Rise.Extension} Returns basic extension class that you can extend
         */
        init: function (rise) {
            Rise.Logger.log('Registered %s extension for -> %O', this.name, rise);
            return this;
        }
    });

}());