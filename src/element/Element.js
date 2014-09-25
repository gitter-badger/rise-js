(function () {
    'use strict';

    Rise.Element = Rise.Class.create({
        /**
         * Field that declare what exactly type of this element
         * @type {String}
         */
        type: 'Basic',

        /**
         * Create basic element
         * @return {Rise.Element} Returns Rise.Element instance
         */
        init: function () {
            this.setNode(Rise.$.create('span').text('Basic Element'));
            return this;
        },

        /**
         * Get Element's node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        getNode: function () {
            return this.node;
        },

        /**
         * Set Element's node
         * @param {Rise.RQuery|Object} node Element's node which contains all nodes that needs for Element
         * @return {Rise.Element} Returns Rise.Element instance
         */
        setNode: function (node) {
            this.node = Rise.$(node);
            return this;
        },

        /**
         * Get type of Element
         * @return {String} Returns type of Element
         */
        getType: function () {
            return this.type;
        }
    });
})();