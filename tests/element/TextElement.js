(function () {
    "use strict";

    chai.should();

    describe('Rise.TextElement', function () {
        it('Should exists globally', function () {
            Rise.TextElement.should.be.a('function');
        });

        it('Should properly return text node', function () {
            var element = new Rise.TextElement();
            element.getNode().is('span').should.equal(true);
        });

        it('Should properly return type', function () {
            var element = new Rise.TextElement();
            element.getName().should.be.equal('Text');
        });
    });
}());
