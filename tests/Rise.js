describe('Rise', function() {
    it('Constructor exists globally', function() {
        Rise.should.be.ok;
        Rise.should.have.property('getVersion');
    });

    it('Constructor instantiate object', function() {
        var rise = new Rise();
        rise.should.be.ok;
    });
});