(function () {
    "use strict";

    chai.should();

    describe('Rise.Element', function () {
        it('Should exists globally', function () {
            Rise.Element.should.be.a('function');
        });

        it('Should properly instantiate', function () {
            var element = new Rise.Element();
            element.should.be.an.instanceof(Rise.Element);
        });

        it('Should properly get/set node', function () {
            var element = new Rise.Element();

            element.setNode(Rise.$.create('div')).should.be.an.instanceof(Rise.Element);
            element.getNode().should.be.an.instanceof(Rise.RQuery);
            element.getNode().is('div').should.be.equal(true);
        });

        it('Should properly return type', function () {
            var element = new Rise.Element();
            element.getType().should.be.a('string');
            element.getType().should.be.equal('Basic');
        });
    });
}());