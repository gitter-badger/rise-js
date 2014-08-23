// jshint ignore:start
describe('Rise.Class', function() {
    it('Should create basic class', function() {
        Rise.Class.extend().should.be.ok;
    });

    it('Should create class with prototype, static and mixins', function() {
        var Test = Rise.Class.extend({
            init: function() {
                this.test = 'test';
            },

            checkPrototype: function() {
                return this.test;
            }
        }, {
            checkStatic: function() {
                return true;
            }
        }, [{
            checkMixin: function() {
                return this.test;
            }
        }]);

        new Test().checkPrototype().should.be.equal('test');
        new Test().checkMixin().should.be.equal('test');
        Test.checkStatic().should.be.ok;
    })
});