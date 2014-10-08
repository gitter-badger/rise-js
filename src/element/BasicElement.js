(function () {
    'use strict';

    Rise.BasicElement = Rise.Class.create({
        /**
         * Field that declare what exactly type of this element
         * @type {String}
         */
        name: 'Basic',

        /**
         * By default element node is null
         * @type {Rise.RQuery}
         */
        node: null,

        /**
         * Create basic element
         * @return {Rise.BasicElement} Returns Rise.Element instance
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
         * @return {Rise.BasicElement} Returns Rise.Element instance
         */
        setNode: function (node) {
            this.node = Rise.$(node);
            return this;
        },

        /**
         * Get type of Element
         * @return {String} Returns type of Element
         */
        getName: function () {
            return this.name;
        },

        /**
         * Remove element from canvas
         * @return {Rise.BasicElement} Returns Rise.Element instance
         */
        remove: function () {
            this.node.remove();
            return this;
        }
    });
})();