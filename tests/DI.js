(function () {
    "use strict";

    chai.should();

    describe('Rise.DI', function () {
        it('Should exists globally', function () {
            Rise.DI.should.be.a('object');
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
//            TODO: make test
        });

        it('Should properly resolve modules', function () {
            Rise.DI.register('Test', {});
            Rise.DI.register('Test2', {});

            Rise.DI.resolve(['Test', 'Test2'], function (Test, Test2) {
                Test.should.be.an('object');
                Test2.should.be.an('object');
            });
        });
    });
}());