// jshint ignore:end
describe('Rise.RQuery', function() {
    it('Should shorthand Rise.$ exists globally', function() {
        Rise.$.should.be.ok;
        Rise.$.should.be.a.function;
        Rise.$.create.should.be.a.function;
    });

    // it('Should correctly instantiate new object with all supported types', function() {
    //     var body = Rise.$('body');

    //     Rise.$(body).count().should.be.equal(1);
    //     Rise.$(document.querySelectorAll('body')).count().should.be.equal(1);
    //     Rise.$(Window).count().should.be.equal(1);
    //     Rise.$('body').count().should.be.equal(1);
    // });
});