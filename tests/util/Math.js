// jshint ignore:start
describe('Rise.Math', function() {
    it('Should properly clamp value', function() {
        Rise.Math.clamp(0, 2, -2).should.be.equal(0);
        Rise.Math.clamp(0, 2, 0).should.be.equal(0);
        Rise.Math.clamp(0, 2, 1).should.be.equal(1);
        Rise.Math.clamp(0, 2, 2).should.be.equal(2);
        Rise.Math.clamp(0, 2, 4).should.be.equal(2);
    });

    it('Should properly bound value', function() {
        Rise.Math.bound(0, 100, -100).should.be.equal(0);
        Rise.Math.bound(0, 100, 0).should.be.equal(0);
        Rise.Math.bound(0, 100, 50).should.be.equal(0.5);
        Rise.Math.bound(0, 100, 100).should.be.equal(1);
        Rise.Math.bound(0, 100, 200).should.be.equal(1);

        Rise.Math.bound(0, 360, -100).should.be.equal(0);
        Rise.Math.bound(0, 360, 0).should.be.equal(0);
        Rise.Math.bound(0, 360, 180).should.be.approximately(0.5, 0.00001);
        Rise.Math.bound(0, 360, 360).should.be.equal(1);
        Rise.Math.bound(0, 360, 400).should.be.equal(1);
    });

    it('Should properly return random value', function() {
        for (var i = 0; i < 100; i++) {
            Rise.Math.getRandomValue(50, 200).should.be.within(50, 200);
            Rise.Math.getRandomValue(50).should.be.within(50, 100);
            Rise.Math.getRandomValue().should.be.within(0, 100);
        }
    });

    it('Should properly convert decimal to percentage', function() {
        Rise.Math.decimalToPercentage(-2).should.be.equal(-2);
        Rise.Math.decimalToPercentage(0).should.be.equal('0%');
        Rise.Math.decimalToPercentage(0.2).should.be.equal('20%');
        Rise.Math.decimalToPercentage(0.9).should.be.equal('90%');
        Rise.Math.decimalToPercentage(1).should.be.equal('100%');
        Rise.Math.decimalToPercentage(2).should.be.equal(2);
    });
});