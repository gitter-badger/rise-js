(function () {
    "use strict";

    Rise.TextElement = Rise.Element.extend({
        type: 'Text',

        /**
         * Instantiate new Text Element
         * @returns {Rise.TextElement}
         */
        init: function () {
            var textNode = Rise.$.create('span').text('test node');

            this._super();
            this.setNode(textNode);
            return this;
        }
    });
})();