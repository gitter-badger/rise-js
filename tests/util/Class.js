(function () {
    "use strict";

    describe('Rise.Class', function () {
        it('Should create basic class', function () {
            var Test = Rise.Class.create();
            Test.extend.should.be.a('function');
        });

        it('Should create class with prototype, static and mixin', function () {
            var Test = Rise.Class.create({
                init: function () {
                    this.test = 'test';
                },

                checkPrototype: function () {
                    return this.test;
                }
            }, {
                checkStatic: function () {
                    return true;
                }
            }, [
                {
                    checkMixin: function () {
                        return this.test;
                    }
                }
            ]);

            new Test().checkPrototype().should.be.equal('test');
            new Test().checkMixin().should.be.equal('test');
            Test.checkStatic().should.be.equal(true);
        });

        it('Should properly extend from exists class', function () {
            var Test = Rise.Class.create({
                init: function () {
                    this.test = 'test';
                },

                getTest: function () {
                    return this.test;
                }
            });

            var Foo = Test.extend();
            new Foo().getTest().should.be.equal('test');
        });

        it('Should properly call super', function () {
            var Test = Rise.Class.create({
                init: function () {
                    this.test = 'test';
                },

                getTest: function () {
                    return this.test;
                }
            });

            var Foo = Test.extend({
                init: function () {
                    this._super();
                    this.foo = 'bar';
                },

                getFoo: function () {
                    return this.foo;
                }
            });

            new Foo().getTest().should.be.equal('test');
            new Foo().getFoo().should.be.equal('bar');
        });
    });
}());
