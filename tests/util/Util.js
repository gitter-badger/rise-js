(function () {
    "use strict";

    chai.should();

    describe('Rise.Util', function () {
        it('Should properly assign (extend) objects', function () {
            var testObject = Rise.Util.assign({}, {
                test: 'test'
            }, {
                foo: 'test',
                test: 'test2'
            });
            testObject.should.be.deep.equal({
                foo: 'test',
                test: 'test2'
            });

            Rise.Util.assign(testObject, {
                bar: 'test'
            });
            testObject.should.be.deep.equal({
                foo: 'test',
                bar: 'test',
                test: 'test2'
            });
        });

        it('Should properly convert string to camelCase string', function () {
            Rise.Util.toCamelizeString('font-family').should.be.equal('fontFamily');
            Rise.Util.toCamelizeString('fontFamily').should.be.equal('fontFamily');
            Rise.Util.toCamelizeString('very-big-some-thing').should.be.equal('veryBigSomeThing');
        });

        it('Should properly convert string to dashed string', function () {
            Rise.Util.toDashedString('fontFamily').should.be.equal('font-family');
            Rise.Util.toDashedString('font-family').should.be.equal('font-family');
            Rise.Util.toDashedString('veryBigSomeThing').should.be.equal('very-big-some-thing');
        });

        it('Should return random string', function () {
            Rise.Util.getRandomString().should.be.a('string');

            Rise.Util.getRandomString('rise').should.be.a('string');
            Rise.Util.getRandomString('rise').should.match(/^rise/g);

            Rise.Util.getRandomString('rise', 'suffix').should.be.a('string');
            Rise.Util.getRandomString('rise', 'suffix').should.match(/^rise(.+)suffix$/g);

            Rise.Util.getRandomString('rise', 'suffix', '-').should.be.a('string');
            Rise.Util.getRandomString('rise', 'suffix', '-').should.match(/^rise-(.+)-suffix$/g);
        });

        it('Should properly flip object', function () {
            var source = {
                    foo: 'bar',
                    bar: 'test'
                },
                destination = Rise.Util.flipObject(source);

            destination.should.be.deep.equal({
                bar: 'foo',
                test: 'bar'
            });
        });

        it('Should return correct type', function () {
            Rise.Util.getType({}).should.be.equal('object');
            Rise.Util.getType(123).should.be.equal('number');
            Rise.Util.getType([]).should.be.equal('array');
            Rise.Util.getType(false).should.be.equal('boolean');
            Rise.Util.getType(function () {
            }).should.be.equal('function');
            Rise.Util.getType('Test').should.be.equal('string');
        });

        it('Should properly check if object', function () {
            Rise.Util.isObject({}).should.be.equal(true);
            Rise.Util.isObject(123).should.be.equal(false);
            Rise.Util.isObject([]).should.be.equal(false);
            Rise.Util.isObject(false).should.be.equal(false);
            Rise.Util.isObject(function () {
            }).should.be.equal(false);
            Rise.Util.isObject('Test').should.be.equal(false);
            Rise.Util.isObject(undefined).should.be.equal(false);
        });

        it('Should properly check if number', function () {
            Rise.Util.isNumber({}).should.be.equal(false);
            Rise.Util.isNumber(123).should.be.equal(true);
            Rise.Util.isNumber([]).should.be.equal(false);
            Rise.Util.isNumber(false).should.be.equal(false);
            Rise.Util.isNumber(function () {
            }).should.be.equal(false);
            Rise.Util.isNumber('Test').should.be.equal(false);
            Rise.Util.isNumber(undefined).should.be.equal(false);
        });

        it('Should properly check if array', function () {
            Rise.Util.isArray({}).should.be.equal(false);
            Rise.Util.isArray(123).should.be.equal(false);
            Rise.Util.isArray([]).should.be.equal(true);
            Rise.Util.isArray(false).should.be.equal(false);
            Rise.Util.isArray(function () {
            }).should.be.equal(false);
            Rise.Util.isArray('Test').should.be.equal(false);
            Rise.Util.isArray(undefined).should.be.equal(false);
        });

        it('Should properly check if boolean', function () {
            Rise.Util.isBoolean({}).should.be.equal(false);
            Rise.Util.isBoolean(123).should.be.equal(false);
            Rise.Util.isBoolean([]).should.be.equal(false);
            Rise.Util.isBoolean(false).should.be.equal(true);
            Rise.Util.isBoolean(function () {
            }).should.be.equal(false);
            Rise.Util.isBoolean('Test').should.be.equal(false);
            Rise.Util.isBoolean(undefined).should.be.equal(false);
        });

        it('Should properly check if function', function () {
            Rise.Util.isFunction({}).should.be.equal(false);
            Rise.Util.isFunction(123).should.be.equal(false);
            Rise.Util.isFunction([]).should.be.equal(false);
            Rise.Util.isFunction(false).should.be.equal(false);
            Rise.Util.isFunction(function () {
            }).should.be.equal(true);
            Rise.Util.isFunction('Test').should.be.equal(false);
            Rise.Util.isFunction(undefined).should.be.equal(false);
        });

        it('Should properly check if string', function () {
            Rise.Util.isString({}).should.be.equal(false);
            Rise.Util.isString(123).should.be.equal(false);
            Rise.Util.isString([]).should.be.equal(false);
            Rise.Util.isString(false).should.be.equal(false);
            Rise.Util.isString(function () {
            }).should.be.equal(false);
            Rise.Util.isString('Test').should.be.equal(true);
            Rise.Util.isString(undefined).should.be.equal(false);
        });

        it('Should properly check if undefined', function () {
            Rise.Util.isUndefined({}).should.be.equal(false);
            Rise.Util.isUndefined(123).should.be.equal(false);
            Rise.Util.isUndefined([]).should.be.equal(false);
            Rise.Util.isUndefined(false).should.be.equal(false);
            Rise.Util.isUndefined(function () {
            }).should.be.equal(false);
            Rise.Util.isUndefined('Test').should.be.equal(false);
            Rise.Util.isUndefined(undefined).should.be.equal(true);
        });
    });
}());

