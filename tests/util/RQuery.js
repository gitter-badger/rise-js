// jshint ignore:start
describe('Rise.RQuery', function () {
    it('Should shorthand Rise.$ exists globally', function () {
        Rise.$.should.be.a.function;
        Rise.$.create.should.be.a.function;
    });

    it('Should correctly create new node', function () {
        Rise.$.create('a').count().should.be.equal(1);
        Rise.$.create('a').should.be.an.instanceof(Rise.RQuery);
    });

    it('Should correctly instantiate new object with all supported types', function () {
        var rquery = Rise.$('#rquery');

        Rise.$(rquery).count().should.be.equal(1);
        Rise.$(document.querySelectorAll('#rquery')).count().should.be.equal(1);
        Rise.$(document.createElement('a')).count().should.be.equal(1);
        Rise.$('#rquery').count().should.be.equal(1);
    });

    it('Should correctly return nodes', function () {
        Rise.$('#rquery').get().should.have.length(1).and.be.an.array;
    });

    it('Should correctly return nodes count', function () {
        Rise.$('#rquery').count().should.be.equal(1);
    });

    it('Should properly iterate through all nodes', function (done) {
        var rquery = Rise.$('#rquery');

        rquery.count().should.be.equal(1);
        rquery.each(function (node, index, array) {
            if (!Rise.$(node).is('div')) {
                throw new Error();
            }

            if (array.length !== 1) {
                throw new Error();
            }

            done();
        }).should.be.an.instanceof(Rise.RQuery);
    });

    it('Should properly return parent node', function () {
        Rise.$('#rquery').parent().should.be.an.instanceof(Rise.RQuery);
        Rise.$('#rquery').parent().is('body').should.be.ok;
    });

    it('Should properly return children nodes', function () {
        Rise.$('#rquery').children().count().should.be.equal(0);
    });

    it('Should properly check if node contains in other', function () {
        Rise.$('body').contains(Rise.$('#rquery')).should.be.ok;
        Rise.$('#rquery').contains(Rise.$('body')).should.be.not.ok;
    });

    it('Should properly return offset width', function () {
        Rise.$('#rquery').offsetWidth().should.be.equal(200);
    });

    it('Should properly return offset height', function () {
        Rise.$('#rquery').offsetHeight().should.be.equal(200);
    });

    it('Should properly return offset left', function () {
        Rise.$('#rquery').offsetLeft().should.be.equal(200);
    });

    it('Should properly return offset top', function () {
        Rise.$('#rquery').offsetTop().should.be.equal(200);
    });

    it('Should properly focus at node', function () {
        Rise.$('#rquery').focus().should.be.an.instanceof(Rise.RQuery);
    });

    it('Should properly blur from node', function () {
        Rise.$('#rquery').blur().should.be.an.instanceof(Rise.RQuery);
    });

    it('Should properly filter out nodes', function () {
        Rise.$('body').children().filter(function (node, index, array) {
            return Rise.$(node).is('#rquery');
        }).count().should.be.equal(1);
    });

    it('Should properly find nodes from current', function () {
        Rise.$('body').find('#rquery').count().should.be.equal(1);
        Rise.$('body').find('#rquery').is('div').should.be.ok;
    });

    it('Should properly set and get attributes', function () {
        var rquery = Rise.$('#rquery');

        rquery.attr({
            foo: 'test',
            bar: 'test'
        }).should.be.an.instanceof(Rise.RQuery);

        rquery.attr('foo').should.be.equal('test');
        rquery.attr('bar').should.be.equal('test');

        rquery.attr({
            foo: false,
            bar: false
        }).should.be.an.instanceof(Rise.RQuery);

        Should(rquery.attr('foo')).be.a.null;
        Should(rquery.attr('bar')).be.a.null;
    });

    it('Should properly set and get CSS', function () {
        var rquery = Rise.$('#rquery');

        rquery.css('left').should.be.equal('200px');
        rquery.css('width').should.be.equal('200px');

        rquery.css({
            left: 100,
            width: 100
        }).should.be.an.instanceof(Rise.RQuery);

        rquery.css('left').should.be.equal('100px');
        rquery.css('width').should.be.equal('100px');

        rquery.css({
            left: 200,
            width: 200
        }).should.be.an.instanceof(Rise.RQuery);
    });

    it('Should properly wrap and unwrap node', function () {
        var rquery = Rise.$('#rquery');

        rquery.wrap(Rise.$.create('a')).should.be.an.instanceof(Rise.RQuery);
        rquery.parent().is('a').should.be.ok;
        rquery.unwrap().should.be.an.instanceof(Rise.RQuery);
        rquery.parent().is('body').should.be.ok;
    });

    it('Should properly match node to selector', function () {
        var rquery = Rise.$('#rquery');

        rquery.is('div').should.be.ok;
        rquery.is('#rquery').should.be.ok;
        rquery.is('body').should.be.not.ok;
    });

    it('Should properly add, remove, toggle and check has class', function () {
        var rquery = Rise.$('#rquery');

        rquery.hasClass('rquery').should.be.not.ok;

        rquery.addClass('rquery');
        rquery.hasClass('rquery').should.be.ok;

        rquery.removeClass('rquery');
        rquery.hasClass('rquery').should.be.not.ok;

        rquery.toggleClass('rquery');
        rquery.hasClass('rquery').should.be.ok;

        rquery.toggleClass('rquery');
        rquery.hasClass('rquery').should.be.not.ok;
    });

    it('Should properly bind/unbind events and trigger mouse event', function () {
        var clicked = false;

        function onMouseDown(event) {
            if (!(event instanceof MouseEvent)) {
                throw new Error();
            }

            if (event.type !== 'mousedown') {
                throw new Error();
            }

            clicked = !clicked;
        }

        Rise.$('#rquery').on('mousedown', onMouseDown).should.be.an.instanceof(Rise.RQuery);
        Rise.$('#rquery').triggerMouseEvent('mousedown').should.be.an.instanceof(Rise.RQuery);
        Rise.$('#rquery').off('mousedown', onMouseDown).should.be.an.instanceof(Rise.RQuery);
        Rise.$('#rquery').triggerMouseEvent('mousedown').should.be.an.instanceof(Rise.RQuery);

        clicked.should.be.ok;
    });

    it('Should properly remove node', function () {
        var rquery = Rise.$('#rquery'),
            clone = rquery.clone();

        rquery.append(clone.attr({
            id: false
        })).should.be.an.instanceof(Rise.RQuery);

        rquery.children().count().should.be.equal(1);
        clone.remove();
        rquery.children().count().should.be.equal(0);
    });

    it('Should properly set and get HTML', function () {
        var rquery = Rise.$('#rquery');

        rquery.html().should.be.equal('');
        rquery.html('test');
        rquery.html().should.be.equal('test');
        rquery.html('');
    });

    it('Should properly append/prepend HTML', function () {
        var rquery = Rise.$('#rquery').empty();

        rquery.append('test');
        rquery.html().should.be.equal('test');
        rquery.empty();

        rquery.append(Rise.$.create('a'));
        rquery.children().is('a').should.be.ok;
        rquery.empty();

        rquery.append(document.createElement('span'));
        rquery.children().is('span').should.be.ok;
        rquery.empty();

        rquery.prepend('test');
        rquery.html().should.be.equal('test');
        rquery.empty();

        rquery.prepend(Rise.$.create('a'));
        rquery.children().is('a').should.be.ok;
        rquery.empty();

        rquery.prepend(document.createElement('span'));
        rquery.children().is('span').should.be.ok;
        rquery.empty();
    });

    it('Should properly set/get text content', function () {
        var rquery = Rise.$('#rquery');

        rquery.text().should.be.equal('');
        rquery.text('test');
        rquery.text().should.be.equal('test');
        rquery.empty();
    });

    it('Should properly empty node', function () {
        var rquery = Rise.$('#rquery');

        rquery.text('test');
        rquery.text().should.be.equal('test');
        rquery.empty();
        rquery.text().should.be.equal('');
    });

    it('Should properly clone nodes', function () {
        var rquery = Rise.$('#rquery'),
            clone = rquery.clone();

        clone.attr({
            id: false,
            clone: true
        });

        rquery.attr('id').should.be.equal('rquery');
        Should(rquery.attr('clone')).be.a.null;

        Should(clone.attr('id')).be.a.null;
        clone.attr('clone').should.be.equal('true');

        clone.remove();
    });
});