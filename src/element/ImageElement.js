(function () {
    "use strict";

    Rise.ImageElement = Rise.BasicElement.extend({
        type: 'Image',

        init: function (options) {
            this._super();

            var node = Rise.$.create('img');

            node
                .attr({
                    src: options.src
                })
                .css(options.css);

            this.setNode(node);
            return this;
        }
    });
}());