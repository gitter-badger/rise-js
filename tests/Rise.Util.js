// jshint ignore:start
describe('Rise.Util', function() {
    it('Should return correct type', function() {
        Rise.Util.getType({}).should.be.equal('object');
        Rise.Util.getType(123).should.be.equal('number');
        Rise.Util.getType([]).should.be.equal('array');
        Rise.Util.getType(false).should.be.equal('boolean');
        Rise.Util.getType(function() {}).should.be.equal('function');
        Rise.Util.getType('Test').should.be.equal('string');
    });

    it('Should check if is object', function() {
        Rise.Util.isObject({}).should.be.ok;
        Rise.Util.isObject(123).should.be.not.ok;
        Rise.Util.isObject([]).should.be.not.ok;
        Rise.Util.isObject(false).should.be.not.ok;
        Rise.Util.isObject(function() {}).should.be.not.ok;
        Rise.Util.isObject('Test').should.be.not.ok;
    });

    it('Should check if is number', function() {
        Rise.Util.isNumber({}).should.be.not.ok;
        Rise.Util.isNumber(123).should.be.ok;
        Rise.Util.isNumber([]).should.be.not.ok;
        Rise.Util.isNumber(false).should.be.not.ok;
        Rise.Util.isNumber(function() {}).should.be.not.ok;
        Rise.Util.isNumber('Test').should.be.not.ok;
    });

    it('Should check if is array', function() {
        Rise.Util.isArray({}).should.be.not.ok;
        Rise.Util.isArray(123).should.be.not.ok;
        Rise.Util.isArray([]).should.be.ok;
        Rise.Util.isArray(false).should.be.not.ok;
        Rise.Util.isArray(function() {}).should.be.not.ok;
        Rise.Util.isArray('Test').should.be.not.ok;
    });

    it('Should check if is boolean', function() {
        Rise.Util.isBoolean({}).should.be.not.ok;
        Rise.Util.isBoolean(123).should.be.not.ok;
        Rise.Util.isBoolean([]).should.be.not.ok;
        Rise.Util.isBoolean(false).should.be.ok;
        Rise.Util.isBoolean(function() {}).should.be.not.ok;
        Rise.Util.isBoolean('Test').should.be.not.ok;
    });

    it('Should check if is function', function() {
        Rise.Util.isFunction({}).should.be.not.ok;
        Rise.Util.isFunction(123).should.be.not.ok;
        Rise.Util.isFunction([]).should.be.not.ok;
        Rise.Util.isFunction(false).should.be.not.ok;
        Rise.Util.isFunction(function() {}).should.be.ok;
        Rise.Util.isFunction('Test').should.be.not.ok;
    });

    it('Should check if is string', function() {
        Rise.Util.isString({}).should.be.not.ok;
        Rise.Util.isString(123).should.be.not.ok;
        Rise.Util.isString([]).should.be.not.ok;
        Rise.Util.isString(false).should.be.not.ok;
        Rise.Util.isString(function() {}).should.be.not.ok;
        Rise.Util.isString('Test').should.be.ok;
    });

    it('Should return random string', function() {
        Rise.Util.getRandomString().should.be.a.string;
        Rise.Util.getRandomString('rise').should.be.a.string;
        Rise.Util.getRandomString('rise', 'suffix').should.be.a.string;
        Rise.Util.getRandomString('rise', 'suffix', '-').should.be.a.string;
    });
});