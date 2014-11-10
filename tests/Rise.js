(function () {
    "use strict";

    describe('Rise', function () {
        it('Should Rise exists globally', function () {
            Rise.getVersion().should.be.a('string');
        });

        it('Should Rise instantiated successfully', function () {
            var rise = new Rise('#rise-test');

            new Rise().should.be.an.instanceOf(Rise);
            new Rise(rise).should.be.an.instanceOf(Rise);
            rise.should.be.an.instanceOf(Rise);
            new Rise(document.createElement('div')).should.be.an.instanceOf(Rise);
        });

        it('Should properly call update method', function () {
            var rise = new Rise('#rise-test');
            rise.update().should.be.an.instanceOf(Rise);
        });

        it('Should properly get/set parent node', function () {
            var rise = new Rise('#rise-test');

            rise.getParentNode().should.be.an.instanceOf(Rise.RQuery);
            rise.getParentNode().is('div').should.be.equal(true);

            rise.setParentNode(Rise.$.create('a')).should.be.an.instanceOf(Rise);
            rise.getParentNode().should.be.an.instanceOf(Rise.RQuery);
            rise.getParentNode().is('a').should.be.equal(true);
        });

        it('Should properly get/set canvas node', function () {
            var rise = new Rise('#rise-test');

            rise.getCanvasNode().should.be.an.instanceOf(Rise.RQuery);
            rise.getCanvasNode().is('div').should.be.equal(true);

            rise.setCanvasNode(Rise.$.create('span')).should.be.an.instanceOf(Rise);
            rise.getCanvasNode().should.be.an.instanceOf(Rise.RQuery);
            rise.getCanvasNode().is('span').should.be.equal(true);
        });

        it('Should properly get/set config', function () {
            var rise = new Rise('#rise-test', {
                foo: 'test',
                bar: {
                    key: 'value'
                }
            });

            rise.getConfig('foo').should.be.equal('test');
            rise.getConfig('bar.key').should.be.equal('value');

            rise.setConfig({
                foo: 'bar'
            }, {
                bar: {
                    foo: 'bar'
                }
            }).should.be.an.instanceOf(Rise);

            rise.getConfig('foo').should.be.equal('bar');
            rise.getConfig('bar.foo').should.be.equal('bar');
            rise.getConfig('bar.key').should.be.equal('value');
        });

        it('Should properly get/set width/dimensions', function () {
            var rise = new Rise('#rise-test');

            rise.setWidth(200).should.be.an.instanceOf(Rise);
            rise.getWidth().should.be.equal(200);

            rise.setHeight(200).should.be.an.instanceOf(Rise);
            rise.getHeight().should.be.equal(200);

            rise.setDimensions(400, 400).should.be.an.instanceOf(Rise);
            rise.getDimensions().should.be.eql({
                width: 400,
                height: 400
            });

            rise.setDimensions(200).should.be.an.instanceOf(Rise);
            rise.getDimensions().should.be.eql({
                width: 200,
                height: 400
            });

            rise.setDimensions(null, 200).should.be.an.instanceOf(Rise);
            rise.getDimensions().should.be.eql({
                width: 200,
                height: 200
            });
        });

        it('Should properly get/set HTML', function () {
            var rise = new Rise('#rise-test');

            rise.getHtml().should.be.a('string');
            rise.setHtml('<span>Test</span>').should.be.an.instanceOf(Rise);
            rise.getHtml().should.be.equal('<span>Test</span>');

            rise.getCanvasNode().should.be.an.instanceOf(Rise.RQuery);
            rise.getCanvasNode().is('span').should.be.equal(true);
            rise.getParentNode().find('span').count().should.be.equal(1);
        });

        it('Should properly add new Element', function () {
            var rise = new Rise('#rise-test'),
                element = new Rise.BaseElement();

            rise.getCanvasNode().children().count().should.be.equal(0);
            rise.add(element).should.be.an.instanceOf(Rise);
            rise.getCanvasNode().children().count().should.be.equal(1);
            rise.getCanvasNode().empty().should.be.an.instanceOf(Rise.RQuery);
            rise.getCanvasNode().children().count().should.be.equal(0);
        });

        it('Should properly return current version', function () {
            Rise.getVersion().should.be.a('string');
        });
    });
}());
