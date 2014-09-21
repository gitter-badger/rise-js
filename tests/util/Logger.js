(function () {
    "use strict";

    chai.should();

    describe('Rise.Logger', function () {
        it('Should set and get level', function () {
            Rise.Logger.setLevel(Rise.Logger.VERBOSE);
            Rise.Logger.getLevel().should.be.equal(Rise.Logger.VERBOSE);
            Rise.Logger.setLevel(Rise.Logger.OFF);
            Rise.Logger.getLevel().should.be.equal(Rise.Logger.OFF);
        });

        it('Should call log', function () {
            Rise.Logger.log('test').should.be.equal(Rise.Logger);
        });

        it('Should call debug', function () {
            Rise.Logger.debug('test').should.be.equal(Rise.Logger);
        });

        it('Should call error', function () {
            Rise.Logger.error('test').should.be.equal(Rise.Logger);
        });

        it('Should call warning', function () {
            Rise.Logger.warning('test').should.be.equal(Rise.Logger);
        });

        it('Should call info', function () {
            Rise.Logger.info('test').should.be.equal(Rise.Logger);
        });

        it('Should start and end group', function () {
            Rise.Logger.startGroup('test').should.be.equal(Rise.Logger);
            Rise.Logger.endGroup().should.be.equal(Rise.Logger);
            Rise.Logger.startGroup(true, 'test').should.be.equal(Rise.Logger);
            Rise.Logger.endGroup().should.be.equal(Rise.Logger);
        });

        it('Should start and end time profiling', function () {
            Rise.Logger.startTime('test').should.be.equal(Rise.Logger);
            Rise.Logger.endTime('test').should.be.equal(Rise.Logger);
        });
    });
}());
