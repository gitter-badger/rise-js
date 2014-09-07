(function(global) {
    'use strict';

    global.Rise.TextElement = Rise.Element.extend({
        /**
         * Declare type of Element
         * @type {String}
         */
        type: 'Text',

        /**
         * Create new Rise.TextElement instance
         * @constructor
         * @param  {Object} options Additional options for TextElement
         * @return {Rise.TextElement}         Returns Rise.TextElement instance
         */
        init: function(options) {
            var textNode = Rise.$.create('span').text('test node');

            this._super();
            this.setNode(textNode);
            return this;
        }
    });
})(this);