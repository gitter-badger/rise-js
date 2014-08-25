// jshint ignore:start
describe('Rise.Opacity', function() {
    it('Should exists in global scope', function() {
        Rise.Opacity.should.be.a.function;
    });

    it('Should create basic instance', function() {
        var opacity = new Rise.Opacity();
        opacity.should.be.an.instanceof(Rise.Opacity);
        opacity.get().should.be.equal(0);
    });

    it('Should properly get and set opacity', function() {
        var opacity = new Rise.Opacity();
        opacity.get().should.be.equal(0);

        opacity.set(40);
        opacity.get().should.be.equal(40);

        opacity.set(0.3);
        opacity.get().should.be.equal(70);
    });

    it('Should properly convert to CSS string', function() {
        var opacity = new Rise.Opacity(70);
        opacity.toString().should.be.equal(0.3);

        opacity.set(45);
        opacity.toString().should.be.equal(0.55);
    });

    it('Should properly check for percentage value', function() {
        Rise.Opacity.isPercentageValue(0).should.be.ok;
        Rise.Opacity.isPercentageValue(30).should.be.ok;
        Rise.Opacity.isPercentageValue(100).should.be.ok;
        Rise.Opacity.isPercentageValue(0.30).should.be.not.ok;
        Rise.Opacity.isPercentageValue(300).should.be.not.ok;
    });

    it('Should properly check for decimal value [0, 1]', function() {
        Rise.Opacity.isDecimal01Value(0).should.be.not.ok;
        Rise.Opacity.isDecimal01Value(0.3).should.be.ok;
        Rise.Opacity.isDecimal01Value(1).should.be.not.ok;
        Rise.Opacity.isDecimal01Value(2).should.be.not.ok;
    });

    it('Should properly convert from CSS value to percentage value', function() {
        Rise.Opacity.fromCssToPercentage(0).should.be.equal(100);
        Rise.Opacity.fromCssToPercentage(0.3).should.be.equal(70);
        Rise.Opacity.fromCssToPercentage(1).should.be.equal(0);
    });

    it('Should properly convert from percentage value to CSS value', function() {
        Rise.Opacity.fromPercentageToCss(0).should.be.equal(1);
        Rise.Opacity.fromPercentageToCss(70).should.be.equal(0.3);
        Rise.Opacity.fromPercentageToCss(100).should.be.equal(0);
    });
});