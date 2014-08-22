describe('Rise.Util', function() {
    it('#getType()', function() {
        Rise.Util.getType({}).should.be.equal('object');
        Rise.Util.getType([]).should.be.equal('array');
        Rise.Util.getType(false).should.be.equal('array');
        Rise.Util.getType('Test').should.be.equal('string');
        Rise.Util.getType(123).should.be.equal('number');
    });

    it('#isObject()', function() {
        Rise.Util.isObject({}).should.be.ok;
        Rise.Util.isObject([]).should.be.not.ok;
        Rise.Util.isObject(false).should.be.not.ok;
        Rise.Util.isObject(123).should.be.not.ok;
        Rise.Util.isObject('Test').should.be.not.ok;
    });

    it('#isArray', function() {
        Rise.Util.isArray([]).should.be.ok;
        Rise.Util.isArray({}).should.be.not.ok;
        Rise.Util.isArray(false).should.be.not.ok;
        Rise.Util.isArray(123).should.be.not.ok;
        Rise.Util.isArray('Test').should.be.not.ok;
    });

    it('#isNumber', function() {
        Rise.Util.isNumber(123).should.be.ok;
        Rise.Util.isNumber('Test').should.be.not.ok;
        Rise.Util.isNumber(false).should.be.not.ok;
        Rise.Util.isNumber([]).should.be.not.ok;
        Rise.Util.isNumber({}).should.be.not.ok;
    });

    it('#isString', function() {
        Rise.Util.isString('Test').should.be.ok;
        Rise.Util.isString([]).should.be.not.ok;
        Rise.Util.isString({}).should.be.not.ok;
        Rise.Util.isString(123).should.be.not.ok;
        Rise.Util.isString(false).should.be.not.ok;
    });

    it('#isBoolean', function() {
        Rise.Util.isBoolean(false).should.be.ok;
        Rise.Util.isBoolean(true).should.be.ok;
        Rise.Util.isBoolean(123).should.be.not.ok;
        Rise.Util.isBoolean('Test').should.be.not.ok;
        Rise.Util.isBoolean({}).should.be.not.ok;
        Rise.Util.isBoolean([]).should.be.not.ok;
    });

    it('#getRandomString', function() {
        Rise.Util.getRandomString().should.be.a.string;
    });
});