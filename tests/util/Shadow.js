// jshint ignore:start
describe('Rise.Shadow', function() {
    it('Should Shadow exists globally', function() {
        Rise.Shadow.should.be.a.function;
    });

    it('Should create instance with default options', function() {
        var shadow = new Rise.Shadow();
        shadow.toString().should.be.equal('0px 0px 0px rgb(0, 0, 0)');
    });

    it('Should create instance with custom options', function() {
        var shadow = new Rise.Shadow({
            color: new Rise.Color('white'),
            blur: 5,
            offsetX: 10,
            offsetY: -10
        });

        shadow.toString().should.be.equal('10px -10px 5px rgb(255, 255, 255)');
    });

    it('Should properly get and set color', function() {
        var shadow = new Rise.Shadow();
        shadow.setColor('#FF0000');
        shadow.getColor().toHexString().toUpperCase().should.be.equal('#FF0000');
    });

    it('Should properly get and set blur', function() {
        var shadow = new Rise.Shadow();
        shadow.setBlur(10);
        shadow.getBlur().should.be.equal(10);
    });

    it('Should properly get and set offset', function() {
        var shadow = new Rise.Shadow();

        shadow.setOffsetX(10);
        shadow.getOffsetX().should.be.equal(10);

        shadow.setOffsetY(-10);
        shadow.getOffsetY().should.be.equal(-10);
    });

    it('Should properly convert to string', function() {
        var shadow = new Rise.Shadow();
        shadow.toString().should.be.equal('0px 0px 0px rgb(0, 0, 0)');
    });

    it('Should properly create instance from shadow string', function() {
        var shadow = Rise.Shadow.fromString('2px 2px 10px rgba(0, 0, 0, 0.2)');
        shadow.should.be.an.instanceof(Rise.Shadow);
        shadow.toString().should.be.equal('2px 2px 10px rgba(0, 0, 0, 0.2)');
    });
});