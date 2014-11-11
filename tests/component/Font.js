(function () {
    "use strict";

    describe('Rise.Font', function () {
        it('Should create instance with default font options', function () {
            var font = new Rise.Font();
            font.toString().should.be.equal('normal normal normal medium /normal serif');
        });

        it('Should correct instantiate from exists Font', function () {
            var font = new Rise.Font();
            new Rise.Font(font).toString().should.be.equal('normal normal normal medium /normal serif');
        });

        it('Should create instance from exists font string', function () {
            Rise.Font.fromString('').should.be.an.instanceOf(Rise.Font);
        });

        it('Should create instance from exists Node', function () {
            var body = document.getElementsByTagName('body')[0],
                element = document.createElement('div');

            body.appendChild(element);
            element.style.fontStyle = 'italic';
            element.style.fontVariant = 'small-caps';
            element.style.fontWeight = 'lighter';
            element.style.fontSize = 'smaller';
            element.style.lineHeight = '20px';
            element.style.fontFamily = 'Arial';

            var font = Rise.Font.fromNode(element);
            font.isValid().should.be.equal(true);
            font.toString().should.be.equal('italic small-caps 300 13px /20px Arial');

            body.removeChild(element);
        });

        it('Should create instance with custom font options', function () {
            var font = new Rise.Font({
                style: 'oblique',
                variant: 'small-caps',
                weight: 'lighter',
                size: 'smaller',
                lineHeight: '2em',
                family: 'Arial'
            });
            font.toString().should.be.equal('oblique small-caps lighter smaller /2em Arial');
        });

        it('Should properly validate font instance', function () {
            new Rise.Font().isValid().should.be.equal(true);

            new Rise.Font({
                style: 'oblique',
                variant: 'small-caps',
                weight: 'lighter',
                size: 'smaller',
                lineHeight: '2em',
                family: 'Arial'
            }).isValid().should.be.equal(true);

            new Rise.Font({
                style: 'bad'
            }).isValid().should.be.equal(false);

            new Rise.Font({
                variant: 'bad'
            }).isValid().should.be.equal(false);

            new Rise.Font({
                weight: 'bad'
            }).isValid().should.be.equal(false);

            new Rise.Font({
                size: 'bad'
            }).isValid().should.be.equal(false);

            new Rise.Font({
                lineHeight: 'bad'
            }).isValid().should.be.equal(false);

            new Rise.Font({
                family: 'bad'
            }).isValid().should.be.equal(true);
        });

        it('Should properly get and set values', function () {
            var font = new Rise.Font();

            font.setStyle('oblique');
            font.getStyle().should.be.equal('oblique');
            font.setStyle('bad');
            font.getStyle().should.be.equal('oblique');

            font.setVariant('small-caps');
            font.getVariant().should.be.equal('small-caps');
            font.setVariant('bad');
            font.getVariant().should.be.equal('small-caps');

            font.setWeight('lighter');
            font.getWeight().should.be.equal('lighter');
            font.setWeight('bad');
            font.getWeight().should.be.equal('lighter');

            font.setSize('smaller');
            font.getSize().should.be.equal('smaller');
            font.setSize('bad');
            font.getSize().should.be.equal('smaller');

            font.setLineHeight('2em');
            font.getLineHeight().should.be.equal('2em');
            font.setLineHeight('bad');
            font.getLineHeight().should.be.equal('2em');

            font.setFamily('bad');
            font.getFamily().should.be.equal('bad');

            font.toString().should.be.equal('oblique small-caps lighter smaller /2em bad');
        });

        it('Should properly convert to string', function () {
            var font = new Rise.Font();
            font.toString().should.be.equal('normal normal normal medium /normal serif');
        });

        it('Should properly validate CSS value', function () {
            Rise.Font.isCssValueValid('2em').should.be.equal(true);
            Rise.Font.isCssValueValid('2ex').should.be.equal(true);
            Rise.Font.isCssValueValid('2pt').should.be.equal(true);
            Rise.Font.isCssValueValid('2px').should.be.equal(true);
            Rise.Font.isCssValueValid('2%').should.be.equal(true);
            Rise.Font.isCssValueValid('2').should.be.equal(false);
        });

        it('Should properly validate font style', function () {
            Rise.Font.isFontStyleValid('normal').should.be.equal(true);
            Rise.Font.isFontStyleValid('italic').should.be.equal(true);
            Rise.Font.isFontStyleValid('oblique').should.be.equal(true);
            Rise.Font.isFontStyleValid('inherit').should.be.equal(true);
            Rise.Font.isFontStyleValid('bad').should.be.equal(false);
        });

        it('Should properly validate font variant', function () {
            Rise.Font.isFontVariantValid('normal').should.be.equal(true);
            Rise.Font.isFontVariantValid('small-caps').should.be.equal(true);
            Rise.Font.isFontVariantValid('inherit').should.be.equal(true);
            Rise.Font.isFontVariantValid('bad').should.be.equal(false);
        });

        it('Should properly validate font weight', function () {
            Rise.Font.isFontWeightValid('bold').should.be.equal(true);
            Rise.Font.isFontWeightValid('bolder').should.be.equal(true);
            Rise.Font.isFontWeightValid('lighter').should.be.equal(true);
            Rise.Font.isFontWeightValid('normal').should.be.equal(true);
            Rise.Font.isFontWeightValid('100').should.be.equal(true);
            Rise.Font.isFontWeightValid('200').should.be.equal(true);
            Rise.Font.isFontWeightValid('300').should.be.equal(true);
            Rise.Font.isFontWeightValid('400').should.be.equal(true);
            Rise.Font.isFontWeightValid('500').should.be.equal(true);
            Rise.Font.isFontWeightValid('600').should.be.equal(true);
            Rise.Font.isFontWeightValid('700').should.be.equal(true);
            Rise.Font.isFontWeightValid('800').should.be.equal(true);
            Rise.Font.isFontWeightValid('900').should.be.equal(true);
            Rise.Font.isFontWeightValid('bad').should.be.equal(false);
        });

        it('Should properly validate font size', function () {
            Rise.Font.isFontSizeValid('xx-small').should.be.equal(true);
            Rise.Font.isFontSizeValid('x-small').should.be.equal(true);
            Rise.Font.isFontSizeValid('smaller').should.be.equal(true);
            Rise.Font.isFontSizeValid('small').should.be.equal(true);
            Rise.Font.isFontSizeValid('medium').should.be.equal(true);
            Rise.Font.isFontSizeValid('large').should.be.equal(true);
            Rise.Font.isFontSizeValid('larger').should.be.equal(true);
            Rise.Font.isFontSizeValid('x-large').should.be.equal(true);
            Rise.Font.isFontSizeValid('xx-large').should.be.equal(true);
            Rise.Font.isFontSizeValid('20px').should.be.equal(true);
            Rise.Font.isFontSizeValid('20pt').should.be.equal(true);
            Rise.Font.isFontSizeValid('bad').should.be.equal(false);
        });

        it('Should properly validate font line height', function () {
            Rise.Font.isFontLineHeightValid('normal').should.be.equal(true);
            Rise.Font.isFontLineHeightValid('inherit').should.be.equal(true);
            Rise.Font.isFontLineHeightValid('20em').should.be.equal(true);
            Rise.Font.isFontLineHeightValid('20px').should.be.equal(true);
            Rise.Font.isFontLineHeightValid('bad').should.be.equal(false);
        });

        it('Should properly validate font family', function () {
            Rise.Font.isFontFamilyValid('Arial').should.be.equal(true);
        });

        it('Should properly validate font within static method', function () {
            Rise.Font.isFontValid(new Rise.Font()).should.be.equal(true);
        });
    });
}());
