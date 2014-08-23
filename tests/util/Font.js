// jshint ignore:start
describe('Rise.Font', function() {
    it('Should create instance with default font options', function() {
        var font = new Rise.Font();
        font.toString().should.be.equal('normal normal normal medium /normal serif');
    });

    it('Should create instance with custom font options', function() {
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

    it('Should create instance from exists Node', function() {
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
        font.isValid().should.be.ok;
        font.toString().should.be.equal('italic small-caps 300 13px /20px Arial');
    });

    it('Should properly validate font instance', function() {
        var font = new Rise.Font();
        font.isValid().should.be.ok;
    });

    it('Should properly get and set values', function() {
        var font = new Rise.Font();

        font.setStyle('oblique');
        font.getStyle().should.be.equal('oblique');

        font.setVariant('small-caps');
        font.getVariant().should.be.equal('small-caps');

        font.setWeight('lighter');
        font.getWeight().should.be.equal('lighter');

        font.setSize('smaller');
        font.getSize().should.be.equal('smaller');

        font.setLineHeight('2em');
        font.getLineHeight().should.be.equal('2em');

        font.setFamily('Arial');
        font.getFamily().should.be.equal('Arial');

        font.toString().should.be.equal('oblique small-caps lighter smaller /2em Arial');
    });

    it('Should properly validate CSS value', function() {
        Rise.Font.isCssValueValid('2em').should.be.ok;
        Rise.Font.isCssValueValid('2ex').should.be.ok;
        Rise.Font.isCssValueValid('2pt').should.be.ok;
        Rise.Font.isCssValueValid('2px').should.be.ok;
        Rise.Font.isCssValueValid('2%').should.be.ok;
        Rise.Font.isCssValueValid('2').should.be.not.ok;
    });

    it('Should properly validate font style', function() {
        Rise.Font.isFontStyleValid('normal').should.be.ok;
        Rise.Font.isFontStyleValid('italic').should.be.ok;
        Rise.Font.isFontStyleValid('oblique').should.be.ok;
        Rise.Font.isFontStyleValid('inherit').should.be.ok;
        Rise.Font.isFontStyleValid('bad').should.be.not.ok;
    });

    it('Should properly validate font variant', function() {
        Rise.Font.isFontVariantValid('normal').should.be.ok;
        Rise.Font.isFontVariantValid('small-caps').should.be.ok;
        Rise.Font.isFontVariantValid('inherit').should.be.ok;
        Rise.Font.isFontVariantValid('bad').should.be.not.ok;
    });

    it('Should properly validate font weight', function() {
        Rise.Font.isFontWeightValid('bold').should.be.ok;
        Rise.Font.isFontWeightValid('bolder').should.be.ok;
        Rise.Font.isFontWeightValid('lighter').should.be.ok;
        Rise.Font.isFontWeightValid('normal').should.be.ok;
        Rise.Font.isFontWeightValid('100').should.be.ok;
        Rise.Font.isFontWeightValid('200').should.be.ok;
        Rise.Font.isFontWeightValid('300').should.be.ok;
        Rise.Font.isFontWeightValid('400').should.be.ok;
        Rise.Font.isFontWeightValid('500').should.be.ok;
        Rise.Font.isFontWeightValid('600').should.be.ok;
        Rise.Font.isFontWeightValid('700').should.be.ok;
        Rise.Font.isFontWeightValid('800').should.be.ok;
        Rise.Font.isFontWeightValid('900').should.be.ok;
        Rise.Font.isFontWeightValid('bad').should.be.not.ok;
    });

    it('Should properly validate font size', function() {
        Rise.Font.isFontSizeValid('xx-small').should.be.ok;
        Rise.Font.isFontSizeValid('x-small').should.be.ok;
        Rise.Font.isFontSizeValid('smaller').should.be.ok;
        Rise.Font.isFontSizeValid('small').should.be.ok;
        Rise.Font.isFontSizeValid('medium').should.be.ok;
        Rise.Font.isFontSizeValid('large').should.be.ok;
        Rise.Font.isFontSizeValid('larger').should.be.ok;
        Rise.Font.isFontSizeValid('x-large').should.be.ok;
        Rise.Font.isFontSizeValid('xx-large').should.be.ok;
        Rise.Font.isFontSizeValid('20px').should.be.ok;
        Rise.Font.isFontSizeValid('20pt').should.be.ok;
        Rise.Font.isFontSizeValid('bad').should.be.not.ok;
    });

    it('Should properly validate font line height', function() {
        Rise.Font.isFontLineHeightValid('normal').should.be.ok;
        Rise.Font.isFontLineHeightValid('inherit').should.be.ok;
        Rise.Font.isFontLineHeightValid('20em').should.be.ok;
        Rise.Font.isFontLineHeightValid('20px').should.be.ok;
        Rise.Font.isFontLineHeightValid('bad').should.be.not.ok;
    });
});