(function(global) {
    'use strict';

    global.Rise.Element = Rise.Class.create({
        /**
         * Create basic element
         * @return {Rise.Element} Returns Rise.Element instance
         */
        init: function() {
            return this;
        },

        /**
         * Get Element's node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        getNode: function() {
            return this.node;
        },

        /**
         * Set Element's node
         * @param {Rise.RQuery} node Element's node which contains all nodes that needs for Element
         * @return {Rise.Element} Returns Rise.Element instance
         */
        setNode: function(node) {
            this.node = Rise.$(node);
            return this;
        }
    });
})(this);