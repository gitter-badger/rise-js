(function () {
    "use strict";

    Rise.TextElement = Rise.Element.extend({
        name: 'Text',

        /**
         * Instantiate new Text Element
         * @returns {Rise.TextElement}
         */
        init: function () {
            var textNode = Rise.$.create('span').text('test node');

            this._super();
            this.setNode(textNode);
            return this;
        },

        onElementAdded: function (element) {
            // TODO: make normal edit
            element.getNode().on('dblclick', function () {
                Rise.$(this).attr({
                    contenteditable: true
                });
            }).on('blur', function () {
                Rise.$(this).attr({
                    contenteditable: false
                });
            });
        }
    });
})();