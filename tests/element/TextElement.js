// jshint ignore:end
describe('Rise.TextElement', function () {
    it('Should exists globally', function () {
        Rise.TextElement.should.be.a.function;
    });

    it('Should properly return text node', function () {
        var element = new Rise.TextElement();
        element.getNode().is('span').should.be.ok;
    });

    it('Should properly return type', function () {
        var element = new Rise.TextElement();
        element.getType().should.be.equal('Text');
    });
});