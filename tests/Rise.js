// jshint ignore:start
describe('Rise', function() {
    it('Should Rise exists globally', function() {
        Rise.should.be.ok;
        Rise.should.have.property('getVersion');
        Rise.getVersion().should.be.a.string;
    });

    it('Should Rise instantiated successfully', function() {
        var rise = new Rise('#rise-test');

        new Rise().should.be.an.instanceof(Rise).and.be.ok;
        new Rise(rise).should.be.an.instanceof(Rise).and.be.ok;
        rise.should.be.an.instanceof(Rise).and.be.ok;
        new Rise(document.createElement('div')).should.be.an.instanceof(Rise).and.be.ok;
    });

    it('Should properly return parent node', function() {
        var rise = new Rise('#rise-test');

        rise.getParentNode().should.be.an.instanceof(Rise.RQuery);
        rise.getParentNode().is('div').should.be.ok;
    });

    it('Should properly return canvas node', function() {
        var rise = new Rise('#rise-test');

        rise.getCanvasNode().should.be.an.instanceof(Rise.RQuery);
        rise.getCanvasNode().is('div').should.be.ok;
    });

    it('Should properly get/set config', function() {
        var rise = new Rise('#rise-test');

        rise.setConfig({
            foo: 'bar',
            bar: {
                foo: 'bar'
            }
        }).should.be.an.instanceof(Rise);

        rise.getConfig('foo').should.be.equal('bar');
        rise.getConfig('bar.foo').should.be.equal('bar');
        rise.getConfig().should.containEql({
            foo: 'bar',
            bar: {
                foo: 'bar'
            }
        });
    });

    it('Should properly get/set width/dimensions', function() {
        var rise = new Rise('#rise-test');

        rise.setWidth(200).should.be.an.instanceof(Rise);
        rise.getWidth().should.be.equal(200);

        rise.setHeight(200).should.be.an.instanceof(Rise);
        rise.getHeight().should.be.equal(200);

        rise.setDimensions(400, 400).should.be.an.instanceof(Rise);
        rise.getDimensions().should.be.eql({
            width: 400,
            height: 400
        });

        rise.setDimensions(200).should.be.an.instanceof(Rise);
        rise.getDimensions().should.be.eql({
            width: 200,
            height: 400
        });

        rise.setDimensions(null, 200).should.be.an.instanceof(Rise);
        rise.getDimensions().should.be.eql({
            width: 200,
            height: 200
        });
    });

    it('Should properly return current version', function() {
        Rise.getVersion().should.be.a.string;
    });
});