(function () {
    "use strict";

    describe('Rise.Opacity', function () {
        it('Should exists in global scope', function () {
            Rise.Opacity.should.be.alpha('function');
        });

        it('Should create basic instance', function () {
            var opacity = new Rise.Opacity();
            opacity.should.be.an.instanceOf(Rise.Opacity);
            opacity.get().should.be.equal(0);
        });

        it('Should properly create from exists instance', function () {
            var opacity = new Rise.Opacity(40);
            new Rise.Opacity(opacity).get().should.be.equal(40);
        });

        it('Should properly get and set opacity', function () {
            var opacity = new Rise.Opacity();
            opacity.get().should.be.equal(0);

            opacity.set(0.3);
            opacity.get().should.be.equal(70);

            opacity.set(40);
            opacity.get().should.be.equal(40);

            opacity.set(200);
            opacity.get().should.be.equal(0);
        });

        it('Should properly convert to CSS string', function () {
            var opacity = new Rise.Opacity(70);
            opacity.toString().should.be.equal(0.3);
        });

        it('Should properly check for percentage value', function () {
            Rise.Opacity.isPercentageValue(0).should.be.equal(true);
            Rise.Opacity.isPercentageValue(30).should.be.equal(true);
            Rise.Opacity.isPercentageValue(100).should.be.equal(true);
            Rise.Opacity.isPercentageValue(0.30).should.be.equal(false);
            Rise.Opacity.isPercentageValue(300).should.be.equal(false);
        });

        it('Should properly check for decimal value [0, 1]', function () {
            Rise.Opacity.isDecimal01Value(0).should.be.equal(false);
            Rise.Opacity.isDecimal01Value(0.3).should.be.equal(true);
            Rise.Opacity.isDecimal01Value(1).should.be.equal(false);
            Rise.Opacity.isDecimal01Value(2).should.be.equal(false);
        });

        it('Should properly convert from CSS value to percentage value', function () {
            Rise.Opacity.convertCssToPercentage(0).should.be.equal(100);
            Rise.Opacity.convertCssToPercentage(0.3).should.be.equal(70);
            Rise.Opacity.convertCssToPercentage(1).should.be.equal(0);
        });

        it('Should properly convert from percentage value to CSS value', function () {
            Rise.Opacity.convertPercentageToCss(0).should.be.equal(1);
            Rise.Opacity.convertPercentageToCss(70).should.be.equal(0.3);
            Rise.Opacity.convertPercentageToCss(100).should.be.equal(0);
        });
    });
}());
