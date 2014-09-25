(function () {
    "use strict";

    var expect = chai.expect;

    chai.should();

    describe('Rise.DI', function () {
        it('Should exists globally', function () {
            Rise.DI.should.be.an('object');
        });

        it('Should properly get module', function () {
            Rise.DI.register('Test', {
                test: function () {
                    return true;
                }
            });

            Rise.DI.get('Test').test().should.be.equal(true);
        });

        it('Should properly register module', function () {
            Rise.DI.register('Test', {});
            Rise.DI.register('Test2', {});

            Rise.DI.get('Test').should.be.an('object');
            Rise.DI.get('Test2').should.be.an('object');
        });

        it('Should properly unregister module', function () {
            Rise.DI.register('Test', {});
            Rise.DI.get('Test').should.be.an('object');
            Rise.DI.unregister('Test');
            expect(Rise.DI.get('Test')).be.a('undefined');
        });

        it('Should properly resolve modules', function () {
            Rise.DI.register('Test', {
                get: function () {
                    return true;
                }
            });

            Rise.DI.register('Test2', function () {
                this.get = function () {
                    return true;
                };
            });

            Rise.DI.resolve(function (Test, Test2) {
                Test.should.be.an('object');
                Test.get().should.be.equal(true);

                Test2.should.be.a('function');
                new Test2().get().should.be.equal(true);
            });
        });
    });
}());