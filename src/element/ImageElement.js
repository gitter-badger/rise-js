(function () {
    "use strict";

    Rise.ImageElement = Rise.Element.extend({
        type: 'Image',

        init: function (options) {
            this.super();

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