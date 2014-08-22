// jshint ignore:start
describe('Rise', function() {
    it('Should Rise exists globally', function() {
        Rise.should.be.ok;
        Rise.should.have.property('getVersion');
        Rise.getVersion().should.be.a.string;
    });

    it('Should Rise instantiated successfully', function() {
        var rise = new Rise();
        rise.should.be.ok;
    });
});