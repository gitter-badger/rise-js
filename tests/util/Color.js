// jshint ignore:start
describe('Rise.Color', function() {
    var colorConversions = [{
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF",
        "rgb": {
            "r": "100.0%",
            "g": "100.0%",
            "b": "100.0%"
        },
        "hsv": {
            "h": "0",
            "s": "0.000",
            "v": "1.000"
        },
        "hsl": {
            "h": "0",
            "s": "0.000",
            "l": "1.000"
        }
    }, {
        "hex": "#808080",
        "hex8": "#FF808080",
        "rgb": {
            "r": "050.0%",
            "g": "050.0%",
            "b": "050.0%"
        },
        "hsv": {
            "h": "0",
            "s": "0.000",
            "v": "0.500"
        },
        "hsl": {
            "h": "0",
            "s": "0.000",
            "l": "0.500"
        }
    }, {
        "hex": "#000000",
        "hex8": "#FF000000",
        "rgb": {
            "r": "000.0%",
            "g": "000.0%",
            "b": "000.0%"
        },
        "hsv": {
            "h": "0",
            "s": "0.000",
            "v": "0.000"
        },
        "hsl": {
            "h": "0",
            "s": "0.000",
            "l": "0.000"
        }
    }, {
        "hex": "#FF0000",
        "hex8": "#FFFF0000",
        "rgb": {
            "r": "100.0%",
            "g": "000.0%",
            "b": "000.0%"
        },
        "hsv": {
            "h": "0.0",
            "s": "1.000",
            "v": "1.000"
        },
        "hsl": {
            "h": "0.0",
            "s": "1.000",
            "l": "0.500"
        }
    }, {
        "hex": "#BFBF00",
        "hex8": "#FFBFBF00",
        "rgb": {
            "r": "075.0%",
            "g": "075.0%",
            "b": "000.0%"
        },
        "hsv": {
            "h": "60.0",
            "s": "1.000",
            "v": "0.750"
        },
        "hsl": {
            "h": "60.0",
            "s": "1.000",
            "l": "0.375"
        }
    }, {
        "hex": "#008000",
        "hex8": "#FF008000",
        "rgb": {
            "r": "000.0%",
            "g": "050.0%",
            "b": "000.0%"
        },
        "hsv": {
            "h": "120.0",
            "s": "1.000",
            "v": "0.500"
        },
        "hsl": {
            "h": "120.0",
            "s": "1.000",
            "l": "0.250"
        }
    }, {
        "hex": "#80FFFF",
        "hex8": "#FF80FFFF",
        "rgb": {
            "r": "050.0%",
            "g": "100.0%",
            "b": "100.0%"
        },
        "hsv": {
            "h": "180.0",
            "s": "0.500",
            "v": "1.000"
        },
        "hsl": {
            "h": "180.0",
            "s": "1.000",
            "l": "0.750"
        }
    }, {
        "hex": "#8080FF",
        "hex8": "#FF8080FF",
        "rgb": {
            "r": "050.0%",
            "g": "050.0%",
            "b": "100.0%"
        },
        "hsv": {
            "h": "240.0",
            "s": "0.500",
            "v": "1.000"
        },
        "hsl": {
            "h": "240.0",
            "s": "1.000",
            "l": "0.750"
        }
    }, {
        "hex": "#BF40BF",
        "hex8": "#FFBF40BF",
        "rgb": {
            "r": "075.0%",
            "g": "025.0%",
            "b": "075.0%"
        },
        "hsv": {
            "h": "300.0",
            "s": "0.667",
            "v": "0.750"
        },
        "hsl": {
            "h": "300.0",
            "s": "0.500",
            "l": "0.500"
        }
    }, {
        "hex": "#A0A424",
        "hex8": "#FFA0A424",
        "rgb": {
            "r": "062.8%",
            "g": "064.3%",
            "b": "014.2%"
        },
        "hsv": {
            "h": "61.8",
            "s": "0.779",
            "v": "0.643"
        },
        "hsl": {
            "h": "61.8",
            "s": "0.638",
            "l": "0.393"
        }
    }, {
        "hex": "#1EAC41",
        "hex8": "#FF1EAC41",
        "rgb": {
            "r": "011.6%",
            "g": "067.5%",
            "b": "025.5%"
        },
        "hsv": {
            "h": "134.9",
            "s": "0.828",
            "v": "0.675"
        },
        "hsl": {
            "h": "134.9",
            "s": "0.707",
            "l": "0.396"
        }
    }, {
        "hex": "#B430E5",
        "hex8": "#FFB430E5",
        "rgb": {
            "r": "070.4%",
            "g": "018.7%",
            "b": "089.7%"
        },
        "hsv": {
            "h": "283.7",
            "s": "0.792",
            "v": "0.897"
        },
        "hsl": {
            "h": "283.7",
            "s": "0.775",
            "l": "0.542"
        }
    }, {
        "hex": "#FEF888",
        "hex8": "#FFFEF888",
        "rgb": {
            "r": "099.8%",
            "g": "097.4%",
            "b": "053.2%"
        },
        "hsv": {
            "h": "56.9",
            "s": "0.467",
            "v": "0.998"
        },
        "hsl": {
            "h": "56.9",
            "s": "0.991",
            "l": "0.765"
        }
    }, {
        "hex": "#19CB97",
        "hex8": "#FF19CB97",
        "rgb": {
            "r": "009.9%",
            "g": "079.5%",
            "b": "059.1%"
        },
        "hsv": {
            "h": "162.4",
            "s": "0.875",
            "v": "0.795"
        },
        "hsl": {
            "h": "162.4",
            "s": "0.779",
            "l": "0.447"
        }
    }, {
        "hex": "#362698",
        "hex8": "#FF362698",
        "rgb": {
            "r": "021.1%",
            "g": "014.9%",
            "b": "059.7%"
        },
        "hsv": {
            "h": "248.3",
            "s": "0.750",
            "v": "0.597"
        },
        "hsl": {
            "h": "248.3",
            "s": "0.601",
            "l": "0.373"
        }
    }, {
        "hex": "#7E7EB8",
        "hex8": "#FF7E7EB8",
        "rgb": {
            "r": "049.5%",
            "g": "049.3%",
            "b": "072.1%"
        },
        "hsv": {
            "h": "240.5",
            "s": "0.316",
            "v": "0.721"
        },
        "hsl": {
            "h": "240.5",
            "s": "0.290",
            "l": "0.607"
        }
    }];

    it("Should properly instantiate", function() {
        var color = new Rise.Color();
        color.should.be.an.instanceof(Rise.Color);
        color.toHexString().should.be.equal('#000000');

        new Rise.Color(color).toHexString().should.be.equal('#000000');
        new Rise.Color('white').toHexString().should.be.equal('#FFFFFF');

        new Rise.Color({
            r: 1,
            g: 1,
            b: 1
        }).toHexString().should.be.equal('#010101');

        new Rise.Color({
            r: 0.1,
            g: 0.1,
            b: 0.1
        }).toHexString().should.be.equal('#000000');
    });

    it("Should properly instantiate from exists instance", function() {
        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex);
            color.toHexString().should.be.equal(new Rise.Color(color).toHexString());
        });
    });

    it("Should properly get brightness", function() {
        new Rise.Color('#000').getBrightness().should.be.equal(0);
        new Rise.Color('#fff').getBrightness().should.be.equal(255);
    });

    it("Should properly returns true/false for dark/light colors", function() {
        new Rise.Color('#000').isDark().should.be.ok;
        new Rise.Color('#111').isDark().should.be.ok;
        new Rise.Color('#222').isDark().should.be.ok;
        new Rise.Color('#333').isDark().should.be.ok;
        new Rise.Color('#444').isDark().should.be.ok;
        new Rise.Color('#555').isDark().should.be.ok;
        new Rise.Color('#666').isDark().should.be.ok;
        new Rise.Color('#777').isDark().should.be.ok;
        new Rise.Color('#888').isDark().should.be.not.ok;
        new Rise.Color('#999').isDark().should.be.not.ok;
        new Rise.Color('#aaa').isDark().should.be.not.ok;
        new Rise.Color('#bbb').isDark().should.be.not.ok;
        new Rise.Color('#ccc').isDark().should.be.not.ok;
        new Rise.Color('#ddd').isDark().should.be.not.ok;
        new Rise.Color('#eee').isDark().should.be.not.ok;
        new Rise.Color('#fff').isDark().should.be.not.ok;
    });

    it("Should properly returns true/false for light/dark colors", function() {
        new Rise.Color('#000').isLight().should.be.not.ok;
        new Rise.Color('#111').isLight().should.be.not.ok;
        new Rise.Color('#222').isLight().should.be.not.ok;
        new Rise.Color('#333').isLight().should.be.not.ok;
        new Rise.Color('#444').isLight().should.be.not.ok;
        new Rise.Color('#555').isLight().should.be.not.ok;
        new Rise.Color('#666').isLight().should.be.not.ok;
        new Rise.Color('#777').isLight().should.be.not.ok;
        new Rise.Color('#888').isLight().should.be.ok;
        new Rise.Color('#999').isLight().should.be.ok;
        new Rise.Color('#aaa').isLight().should.be.ok;
        new Rise.Color('#bbb').isLight().should.be.ok;
        new Rise.Color('#ccc').isLight().should.be.ok;
        new Rise.Color('#ddd').isLight().should.be.ok;
        new Rise.Color('#eee').isLight().should.be.ok;
        new Rise.Color('#fff').isLight().should.be.ok;
    });

    it('Should properly get/set red, green and blue channels', function() {
        var color = new Rise.Color();
        color.toHexString().should.be.equal('#000000');

        color.getRed().should.be.equal(0);
        color.setRed(100).should.be.an.instanceof(Rise.Color);
        color.getRed().should.be.equal(100);
        color.setRed(400).should.be.an.instanceof(Rise.Color);
        color.getRed().should.be.equal(255);

        color.getGreen().should.be.equal(0);
        color.setGreen(100).should.be.an.instanceof(Rise.Color);
        color.getGreen().should.be.equal(100);
        color.setGreen(400).should.be.an.instanceof(Rise.Color);
        color.getGreen().should.be.equal(255);

        color.getBlue().should.be.equal(0);
        color.setBlue(100).should.be.an.instanceof(Rise.Color);
        color.getBlue().should.be.equal(100);
        color.setBlue(400).should.be.an.instanceof(Rise.Color);
        color.getBlue().should.be.equal(255);

        color.toHexString().should.be.equal('#FFFFFF');
    });

    it("Should properly get/set alpha channel", function() {
        var color = new Rise.Color("rgba(255, 0, 0, 1)");
        color.getAlpha().should.be.equal(1);

        color.setAlpha(0.9);
        color.getAlpha().should.be.equal(0.9);

        color.setAlpha(0.5);
        color.getAlpha().should.be.equal(0.5);

        color.setAlpha(0);
        color.getAlpha().should.be.equal(0);

        color.setAlpha(-1);
        color.getAlpha().should.be.equal(1);

        color.setAlpha(2);
        color.getAlpha().should.be.equal(1);

        color.setAlpha();
        color.getAlpha().should.be.equal(1);

        color.setAlpha(null);
        color.getAlpha().should.be.equal(1);

        color.setAlpha("test");
        color.getAlpha().should.be.equal(1);
    });

    it("Should properly parse/convert RGB", function() {
        new Rise.Color('rgb 255 0 0').toRgbString().should.be.equal('rgb(255, 0, 0)');
        new Rise.Color('rgba(255, 0, 0, 0.5)').toRgbString().should.be.equal('rgba(255, 0, 0, 0.5)');
        new Rise.Color('rgb 255 0 0').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgb(255, 0, 0)').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgb (255, 0, 0)').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgb 100% 0% 0%').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgb(100%, 0%, 0%)').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgb (100%, 0%, 0%)').toHexString().should.be.equal('#FF0000');
        new Rise.Color({
            r: 255,
            g: 0,
            b: 0
        }).toHexString().should.be.equal('#FF0000');

        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex),
                input = color.toRgb(),
                output = new Rise.Color(color.toRgbString()).toRgb(),
                maxDiff = 2;

            color.toHexString().should.be.equal(new Rise.Color(color.toRgb()).toHexString());
            color.toHexString().should.be.equal(new Rise.Color(color.toRgbString()).toHexString());

            Should(Math.abs(input.r - output.r) <= maxDiff).be.ok;
            Should(Math.abs(input.g - output.g) <= maxDiff).be.ok;
            Should(Math.abs(input.b - output.b) <= maxDiff).be.ok;
        });
    });

    it("Should properly parse/convert HEX", function() {
        new Rise.Color('#ff0000').toHexString().should.be.equal('#FF0000');
        new Rise.Color('rgba(255, 255, 255, 0.5)').toHexString().should.be.equal('#80FFFFFF');
        new Rise.Color({
            r: 255,
            g: 255,
            b: 255,
            a: 0.5
        }).toHexString().should.be.equal('#80FFFFFF');

        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex);
            color.toHexString().should.be.equal(new Rise.Color(color.toHex()).toHexString());
            color.toHexString().should.be.equal(new Rise.Color(color.toHexString()).toHexString());
        });
    });

    it("Should properly parse/convert HSV", function() {
        new Rise.Color('hsv 251.1 0.887 .918').toHsvString().should.be.equal('hsv(251, 89%, 92%)');
        new Rise.Color('hsv 251.1 0.887 0.918').toHsvString().should.be.equal('hsv(251, 89%, 92%)');
        new Rise.Color({
            h: 251,
            s: 100,
            v: 0.92
        }).toHsvString().should.be.equal('hsv(251, 100%, 92%)');

        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex),
                input = color.toRgb(),
                output = new Rise.Color(color.toHsvString()).toRgb(),
                maxDiff = 2;

            color.toHexString().should.be.equal(new Rise.Color(color.toHsv()).toHexString());

            Should(Math.abs(input.r - output.r) <= maxDiff).be.ok;
            Should(Math.abs(input.g - output.g) <= maxDiff).be.ok;
            Should(Math.abs(input.b - output.b) <= maxDiff).be.ok;
        });
    });

    it("Should properly parse/convert HSL", function() {
        new Rise.Color('hsl 251 100 0.38').toHslString().should.be.equal('hsl(251, 100%, 38%)');
        new Rise.Color('hsla 251 100 0.38 0.5').toHslString().should.be.equal('hsla(251, 100%, 38%, 0.5)');
        new Rise.Color({
            h: 251,
            s: 100,
            l: 0.38
        }).toHslString().should.be.equal('hsl(251, 100%, 38%)');

        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex),
                input = color.toRgb(),
                output = new Rise.Color(color.toHslString()).toRgb(),
                maxDiff = 2;

            color.toHexString().should.be.equal(new Rise.Color(color.toHsl()).toHexString());

            Should(Math.abs(input.r - output.r) <= maxDiff).be.ok;
            Should(Math.abs(input.g - output.g) <= maxDiff).be.ok;
            Should(Math.abs(input.b - output.b) <= maxDiff).be.ok;
        });
    });

    it('Should properly return name of color', function() {
        new Rise.Color("#f00").toName().should.be.equal("red");
        new Rise.Color("#FFFFFF").toName().should.be.equal("white");
        new Rise.Color("#000000").toName().should.be.equal("black");
        new Rise.Color("#fa0a0a").toName().should.be.equal(false);
    });

    it("Should properly return string", function() {
        var color = new Rise.Color({
            r: 255,
            g: 0,
            b: 0,
            a: 0.5
        });

        color.toString('rgb').should.be.equal('rgba(255, 0, 0, 0.5)');
        color.toString('hex').should.be.equal('#80FF0000');
        color.toString('hsv').should.be.equal('hsva(0, 100%, 100%, 0.5)');
        color.toString('hsl').should.be.equal('hsla(0, 100%, 50%, 0.5)');
        color.toString("name").should.be.not.ok;

        color.setAlpha(0);
        color.toString('name').should.be.equal('transparent');

        color.setAlpha(1);
        color.toString('rgb').should.be.equal('rgb(255, 0, 0)');
        color.toString('hex').should.be.equal('#FF0000');
        color.toString('hsv').should.be.equal('hsv(0, 100%, 100%)');
        color.toString('hsl').should.be.equal('hsl(0, 100%, 50%)');
        color.toString("name").should.be.equal('red');
    });

    it("Should properly make lighten", function() {
        var LIGHTENS = ["FF0000", "FF0505", "FF0A0A", "FF0F0F", "FF1414", "FF1A1A", "FF1F1F", "FF2424", "FF2929", "FF2E2E", "FF3333", "FF3838", "FF3D3D", "FF4242", "FF4747", "FF4D4D", "FF5252", "FF5757", "FF5C5C", "FF6161", "FF6666", "FF6B6B", "FF7070", "FF7575", "FF7A7A", "FF8080", "FF8585", "FF8A8A", "FF8F8F", "FF9494", "FF9999", "FF9E9E", "FFA3A3", "FFA8A8", "FFADAD", "FFB3B3", "FFB8B8", "FFBDBD", "FFC2C2", "FFC7C7", "FFCCCC", "FFD1D1", "FFD6D6", "FFDBDB", "FFE0E0", "FFE5E5", "FFEBEB", "FFF0F0", "FFF5F5", "FFFAFA", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").lighten(i).toHex().should.be.equal(LIGHTENS[i]);
        }
    });

    it('Should properly make darken color', function() {
        var DARKENS = ["FF0000", "FA0000", "F50000", "F00000", "EB0000", "E60000", "E00000", "DB0000", "D60000", "D10000", "CC0000", "C70000", "C20000", "BD0000", "B80000", "B30000", "AD0000", "A80000", "A30000", "9E0000", "990000", "940000", "8F0000", "8A0000", "850000", "800000", "7A0000", "750000", "700000", "6B0000", "660000", "610000", "5C0000", "570000", "520000", "4D0000", "470000", "420000", "3D0000", "380000", "330000", "2E0000", "290000", "240000", "1F0000", "190000", "140000", "0F0000", "0A0000", "050000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").darken(i).toHex().should.be.equal(DARKENS[i]);
        }
    });

    it('Should properly make desaturate color', function() {
        var DESATURATIONS = ["FF0000", "FE0101", "FC0303", "FB0404", "FA0505", "F90606", "F70808", "F60909", "F50A0A", "F40B0B", "F20D0D", "F10E0E", "F00F0F", "EE1111", "ED1212", "EC1313", "EB1414", "E91616", "E81717", "E71818", "E61919", "E41B1B", "E31C1C", "E21D1D", "E01F1F", "DF2020", "DE2121", "DD2222", "DB2424", "DA2525", "D92626", "D72828", "D62929", "D52A2A", "D42B2B", "D22D2D", "D12E2E", "D02F2F", "CF3030", "CD3232", "CC3333", "CB3434", "C93636", "C83737", "C73838", "C63939", "C43B3B", "C33C3C", "C23D3D", "C13E3E", "BF4040", "BE4141", "BD4242", "BB4444", "BA4545", "B94646", "B84747", "B64949", "B54A4A", "B44B4B", "B34D4D", "B14E4E", "B04F4F", "AF5050", "AD5252", "AC5353", "AB5454", "AA5555", "A85757", "A75858", "A65959", "A45B5B", "A35C5C", "A25D5D", "A15E5E", "9F6060", "9E6161", "9D6262", "9C6363", "9A6565", "996666", "986767", "966969", "956A6A", "946B6B", "936C6C", "916E6E", "906F6F", "8F7070", "8E7171", "8C7373", "8B7474", "8A7575", "887777", "877878", "867979", "857A7A", "837C7C", "827D7D", "817E7E", "808080"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").desaturate(i).toHex().should.be.equal(DESATURATIONS[i]);
        }
    });

    it('Should properly make saturate color', function() {
        var SATURATIONS = ["FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000", "FF0000"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").saturate(i).toHex().should.be.equal(SATURATIONS[i]);
        }
    });

    it('Should properly make brighten color', function() {
        var BRIGHTENS = ["FF0000", "FF0303", "FF0505", "FF0808", "FF0A0A", "FF0D0D", "FF0F0F", "FF1212", "FF1414", "FF1717", "FF1919", "FF1C1C", "FF1F1F", "FF2121", "FF2424", "FF2626", "FF2929", "FF2B2B", "FF2E2E", "FF3030", "FF3333", "FF3636", "FF3838", "FF3B3B", "FF3D3D", "FF4040", "FF4242", "FF4545", "FF4747", "FF4A4A", "FF4C4C", "FF4F4F", "FF5252", "FF5454", "FF5757", "FF5959", "FF5C5C", "FF5E5E", "FF6161", "FF6363", "FF6666", "FF6969", "FF6B6B", "FF6E6E", "FF7070", "FF7373", "FF7575", "FF7878", "FF7A7A", "FF7D7D", "FF7F7F", "FF8282", "FF8585", "FF8787", "FF8A8A", "FF8C8C", "FF8F8F", "FF9191", "FF9494", "FF9696", "FF9999", "FF9C9C", "FF9E9E", "FFA1A1", "FFA3A3", "FFA6A6", "FFA8A8", "FFABAB", "FFADAD", "FFB0B0", "FFB2B2", "FFB5B5", "FFB8B8", "FFBABA", "FFBDBD", "FFBFBF", "FFC2C2", "FFC4C4", "FFC7C7", "FFC9C9", "FFCCCC", "FFCFCF", "FFD1D1", "FFD4D4", "FFD6D6", "FFD9D9", "FFDBDB", "FFDEDE", "FFE0E0", "FFE3E3", "FFE5E5", "FFE8E8", "FFEBEB", "FFEDED", "FFF0F0", "FFF2F2", "FFF5F5", "FFF7F7", "FFFAFA", "FFFCFC", "FFFFFF"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").brighten(i).toHex().should.be.equal(BRIGHTENS[i]);
        }
    });

    it('Should properly make greyscale color', function() {
        new Rise.Color("red").greyscale().toHexString().should.be.equal("#808080");
    });

    it("Should properly spin color", function() {
        Should(Math.round(new Rise.Color("#f00").spin(-1234).toHsl().h)).be.equal(206);
        Should(Math.round(new Rise.Color("#f00").spin(-360).toHsl().h)).be.equal(0);
        Should(Math.round(new Rise.Color("#f00").spin(-120).toHsl().h)).be.equal(240);
        Should(Math.round(new Rise.Color("#f00").spin(0).toHsl().h)).be.equal(0);
        Should(Math.round(new Rise.Color("#f00").spin(10).toHsl().h)).be.equal(10);
        Should(Math.round(new Rise.Color("#f00").spin(360).toHsl().h)).be.equal(0);
        Should(Math.round(new Rise.Color("#f00").spin(2345).toHsl().h)).be.equal(185);
    });

    it('Should properly generate color combinations', function() {
        function arrayToString(colors) {
            return colors.map(function(color) {
                return color.toHex();
            }).join(",");
        }

        var color = new Rise.Color('red'),
            analogous = color.getAnalogous(),
            complementary = color.getComplementary(),
            monochromatic = color.getMonochromatic(),
            splitComplementary = color.getSplitComplementary(),
            triad = color.getTriad(),
            tetrad = color.getTetrad();

        color.toHexString().should.be.equal("#FF0000");

        arrayToString(analogous).should.be.equal("FF0000,FF0066,FF0033,FF0000,FF3300,FF6600");
        complementary.toHex().should.be.equal("00FFFF");
        arrayToString(monochromatic).should.be.equal("FF0000,2A0000,550000,800000,AA0000,D40000");
        arrayToString(splitComplementary).should.be.equal("FF0000,CCFF00,0066FF");
        arrayToString(triad).should.be.equal("FF0000,00FF00,0000FF");
        arrayToString(tetrad).should.be.equal("FF0000,80FF00,00FFFF,7F00FF");
    });

    it("Should properly parse named colors", function() {
        new Rise.Color("aliceblue").toHexString().should.be.equal("#F0F8FF");
        new Rise.Color("antiquewhite").toHexString().should.be.equal("#FAEBD7");
        new Rise.Color("aqua").toHexString().should.be.equal("#00FFFF");
        new Rise.Color("aquamarine").toHexString().should.be.equal("#7FFFD4");
        new Rise.Color("azure").toHexString().should.be.equal("#F0FFFF");
        new Rise.Color("beige").toHexString().should.be.equal("#F5F5DC");
        new Rise.Color("bisque").toHexString().should.be.equal("#FFE4C4");
        new Rise.Color("black").toHexString().should.be.equal("#000000");
        new Rise.Color("blanchedalmond").toHexString().should.be.equal("#FFEBCD");
        new Rise.Color("blue").toHexString().should.be.equal("#0000FF");
        new Rise.Color("blueviolet").toHexString().should.be.equal("#8A2BE2");
        new Rise.Color("brown").toHexString().should.be.equal("#A52A2A");
        new Rise.Color("burlywood").toHexString().should.be.equal("#DEB887");
        new Rise.Color("cadetblue").toHexString().should.be.equal("#5F9EA0");
        new Rise.Color("chartreuse").toHexString().should.be.equal("#7FFF00");
        new Rise.Color("chocolate").toHexString().should.be.equal("#D2691E");
        new Rise.Color("coral").toHexString().should.be.equal("#FF7F50");
        new Rise.Color("cornflowerblue").toHexString().should.be.equal("#6495ED");
        new Rise.Color("cornsilk").toHexString().should.be.equal("#FFF8DC");
        new Rise.Color("crimson").toHexString().should.be.equal("#DC143C");
        new Rise.Color("cyan").toHexString().should.be.equal("#00FFFF");
        new Rise.Color("darkblue").toHexString().should.be.equal("#00008B");
        new Rise.Color("darkcyan").toHexString().should.be.equal("#008B8B");
        new Rise.Color("darkgoldenrod").toHexString().should.be.equal("#B8860B");
        new Rise.Color("darkgray").toHexString().should.be.equal("#A9A9A9");
        new Rise.Color("darkgreen").toHexString().should.be.equal("#006400");
        new Rise.Color("darkkhaki").toHexString().should.be.equal("#BDB76B");
        new Rise.Color("darkmagenta").toHexString().should.be.equal("#8B008B");
        new Rise.Color("darkolivegreen").toHexString().should.be.equal("#556B2F");
        new Rise.Color("darkorange").toHexString().should.be.equal("#FF8C00");
        new Rise.Color("darkorchid").toHexString().should.be.equal("#9932CC");
        new Rise.Color("darkred").toHexString().should.be.equal("#8B0000");
        new Rise.Color("darksalmon").toHexString().should.be.equal("#E9967A");
        new Rise.Color("darkseagreen").toHexString().should.be.equal("#8FBC8F");
        new Rise.Color("darkslateblue").toHexString().should.be.equal("#483D8B");
        new Rise.Color("darkslategray").toHexString().should.be.equal("#2F4F4F");
        new Rise.Color("darkturquoise").toHexString().should.be.equal("#00CED1");
        new Rise.Color("darkviolet").toHexString().should.be.equal("#9400D3");
        new Rise.Color("deeppink").toHexString().should.be.equal("#FF1493");
        new Rise.Color("deepskyblue").toHexString().should.be.equal("#00BFFF");
        new Rise.Color("dimgray").toHexString().should.be.equal("#696969");
        new Rise.Color("dodgerblue").toHexString().should.be.equal("#1E90FF");
        new Rise.Color("firebrick").toHexString().should.be.equal("#B22222");
        new Rise.Color("floralwhite").toHexString().should.be.equal("#FFFAF0");
        new Rise.Color("forestgreen").toHexString().should.be.equal("#228B22");
        new Rise.Color("fuchsia").toHexString().should.be.equal("#FF00FF");
        new Rise.Color("gainsboro").toHexString().should.be.equal("#DCDCDC");
        new Rise.Color("ghostwhite").toHexString().should.be.equal("#F8F8FF");
        new Rise.Color("gold").toHexString().should.be.equal("#FFD700");
        new Rise.Color("goldenrod").toHexString().should.be.equal("#DAA520");
        new Rise.Color("gray").toHexString().should.be.equal("#808080");
        new Rise.Color("grey").toHexString().should.be.equal("#808080");
        new Rise.Color("green").toHexString().should.be.equal("#008000");
        new Rise.Color("greenyellow").toHexString().should.be.equal("#ADFF2F");
        new Rise.Color("honeydew").toHexString().should.be.equal("#F0FFF0");
        new Rise.Color("hotpink").toHexString().should.be.equal("#FF69B4");
        new Rise.Color("indianred ").toHexString().should.be.equal("#CD5C5C");
        new Rise.Color("indigo ").toHexString().should.be.equal("#4B0082");
        new Rise.Color("ivory").toHexString().should.be.equal("#FFFFF0");
        new Rise.Color("khaki").toHexString().should.be.equal("#F0E68C");
        new Rise.Color("lavender").toHexString().should.be.equal("#E6E6FA");
        new Rise.Color("lavenderblush").toHexString().should.be.equal("#FFF0F5");
        new Rise.Color("lawngreen").toHexString().should.be.equal("#7CFC00");
        new Rise.Color("lemonchiffon").toHexString().should.be.equal("#FFFACD");
        new Rise.Color("lightblue").toHexString().should.be.equal("#ADD8E6");
        new Rise.Color("lightcoral").toHexString().should.be.equal("#F08080");
        new Rise.Color("lightcyan").toHexString().should.be.equal("#E0FFFF");
        new Rise.Color("lightgoldenrodyellow").toHexString().should.be.equal("#FAFAD2");
        new Rise.Color("lightgrey").toHexString().should.be.equal("#D3D3D3");
        new Rise.Color("lightgreen").toHexString().should.be.equal("#90EE90");
        new Rise.Color("lightpink").toHexString().should.be.equal("#FFB6C1");
        new Rise.Color("lightsalmon").toHexString().should.be.equal("#FFA07A");
        new Rise.Color("lightseagreen").toHexString().should.be.equal("#20B2AA");
        new Rise.Color("lightskyblue").toHexString().should.be.equal("#87CEFA");
        new Rise.Color("lightslategray").toHexString().should.be.equal("#778899");
        new Rise.Color("lightsteelblue").toHexString().should.be.equal("#B0C4DE");
        new Rise.Color("lightyellow").toHexString().should.be.equal("#FFFFE0");
        new Rise.Color("lime").toHexString().should.be.equal("#00FF00");
        new Rise.Color("limegreen").toHexString().should.be.equal("#32CD32");
        new Rise.Color("linen").toHexString().should.be.equal("#FAF0E6");
        new Rise.Color("magenta").toHexString().should.be.equal("#FF00FF");
        new Rise.Color("maroon").toHexString().should.be.equal("#800000");
        new Rise.Color("mediumaquamarine").toHexString().should.be.equal("#66CDAA");
        new Rise.Color("mediumblue").toHexString().should.be.equal("#0000CD");
        new Rise.Color("mediumorchid").toHexString().should.be.equal("#BA55D3");
        new Rise.Color("mediumpurple").toHexString().should.be.equal("#9370DB");
        new Rise.Color("mediumseagreen").toHexString().should.be.equal("#3CB371");
        new Rise.Color("mediumslateblue").toHexString().should.be.equal("#7B68EE");
        new Rise.Color("mediumspringgreen").toHexString().should.be.equal("#00FA9A");
        new Rise.Color("mediumturquoise").toHexString().should.be.equal("#48D1CC");
        new Rise.Color("mediumvioletred").toHexString().should.be.equal("#C71585");
        new Rise.Color("midnightblue").toHexString().should.be.equal("#191970");
        new Rise.Color("mintcream").toHexString().should.be.equal("#F5FFFA");
        new Rise.Color("mistyrose").toHexString().should.be.equal("#FFE4E1");
        new Rise.Color("moccasin").toHexString().should.be.equal("#FFE4B5");
        new Rise.Color("navajowhite").toHexString().should.be.equal("#FFDEAD");
        new Rise.Color("navy").toHexString().should.be.equal("#000080");
        new Rise.Color("oldlace").toHexString().should.be.equal("#FDF5E6");
        new Rise.Color("olive").toHexString().should.be.equal("#808000");
        new Rise.Color("olivedrab").toHexString().should.be.equal("#6B8E23");
        new Rise.Color("orange").toHexString().should.be.equal("#FFA500");
        new Rise.Color("orangered").toHexString().should.be.equal("#FF4500");
        new Rise.Color("orchid").toHexString().should.be.equal("#DA70D6");
        new Rise.Color("palegoldenrod").toHexString().should.be.equal("#EEE8AA");
        new Rise.Color("palegreen").toHexString().should.be.equal("#98FB98");
        new Rise.Color("paleturquoise").toHexString().should.be.equal("#AFEEEE");
        new Rise.Color("palevioletred").toHexString().should.be.equal("#DB7093");
        new Rise.Color("papayawhip").toHexString().should.be.equal("#FFEFD5");
        new Rise.Color("peachpuff").toHexString().should.be.equal("#FFDAB9");
        new Rise.Color("peru").toHexString().should.be.equal("#CD853F");
        new Rise.Color("pink").toHexString().should.be.equal("#FFC0CB");
        new Rise.Color("plum").toHexString().should.be.equal("#DDA0DD");
        new Rise.Color("powderblue").toHexString().should.be.equal("#B0E0E6");
        new Rise.Color("purple").toHexString().should.be.equal("#800080");
        new Rise.Color("red").toHexString().should.be.equal("#FF0000");
        new Rise.Color("rosybrown").toHexString().should.be.equal("#BC8F8F");
        new Rise.Color("royalblue").toHexString().should.be.equal("#4169E1");
        new Rise.Color("saddlebrown").toHexString().should.be.equal("#8B4513");
        new Rise.Color("salmon").toHexString().should.be.equal("#FA8072");
        new Rise.Color("sandybrown").toHexString().should.be.equal("#F4A460");
        new Rise.Color("seagreen").toHexString().should.be.equal("#2E8B57");
        new Rise.Color("seashell").toHexString().should.be.equal("#FFF5EE");
        new Rise.Color("sienna").toHexString().should.be.equal("#A0522D");
        new Rise.Color("silver").toHexString().should.be.equal("#C0C0C0");
        new Rise.Color("skyblue").toHexString().should.be.equal("#87CEEB");
        new Rise.Color("slateblue").toHexString().should.be.equal("#6A5ACD");
        new Rise.Color("slategray").toHexString().should.be.equal("#708090");
        new Rise.Color("snow").toHexString().should.be.equal("#FFFAFA");
        new Rise.Color("springgreen").toHexString().should.be.equal("#00FF7F");
        new Rise.Color("steelblue").toHexString().should.be.equal("#4682B4");
        new Rise.Color("tan").toHexString().should.be.equal("#D2B48C");
        new Rise.Color("teal").toHexString().should.be.equal("#008080");
        new Rise.Color("thistle").toHexString().should.be.equal("#D8BFD8");
        new Rise.Color("tomato").toHexString().should.be.equal("#FF6347");
        new Rise.Color("turquoise").toHexString().should.be.equal("#40E0D0");
        new Rise.Color("violet").toHexString().should.be.equal("#EE82EE");
        new Rise.Color("wheat").toHexString().should.be.equal("#F5DEB3");
        new Rise.Color("white").toHexString().should.be.equal("#FFFFFF");
        new Rise.Color("whitesmoke").toHexString().should.be.equal("#F5F5F5");
        new Rise.Color("yellow").toHexString().should.be.equal("#FFFF00");
        new Rise.Color("yellowgreen").toHexString().should.be.equal("#9ACD32");
    });

    it("Should properly check for equals colors", function() {
        Rise.Color.equals("#ff0000", "#ff0000").should.be.ok;
        Rise.Color.equals("#ff0000", "rgb(255, 0, 0)").should.be.ok;
        Rise.Color.equals("ff0000", "#ff0000").should.be.ok;
        Rise.Color.equals("#f00", "#ff0000").should.be.ok;
        Rise.Color.equals("f00", "#ff0000").should.be.ok;
        Rise.Color.equals("#ff8000", "rgb(100%, 50%, 0%)").should.be.ok;

        colorConversions.forEach(function(color) {
            Rise.Color.equals(color.rgb, color.hex).should.be.ok;
            Rise.Color.equals(color.rgb, color.hex8).should.be.ok;
            Rise.Color.equals(color.rgb, color.hsl).should.be.ok;
            Rise.Color.equals(color.rgb, color.hsv).should.be.ok;
            Rise.Color.equals(color.rgb, color.rgb).should.be.ok;
            Rise.Color.equals(color.hex, color.hex).should.be.ok;
            Rise.Color.equals(color.hex, color.hex8).should.be.ok;
            Rise.Color.equals(color.hex, color.hsl).should.be.ok;
            Rise.Color.equals(color.hex, color.hsv).should.be.ok;
            Rise.Color.equals(color.hsl, color.hsv).should.be.ok;
        });
    });

    it("Should properly mix colors", function() {
        Rise.Color.mix('#000', '#fff').toHsl().l.should.be.equal(0.5);
        Rise.Color.mix('#f00', '#000', 0).toHexString().should.be.equal('#FF0000');

        for (var i = 0; i < 100; i++) {
            Should(Math.round(Rise.Color.mix('#000', '#fff', i).toHsl().l * 100) / 100).be.equal(i / 100);

            var newHex = Math.round(255 * (1 - (i / 100))).toString(16).toUpperCase();
            newHex = newHex.length === 1 ? '0' + newHex : newHex;

            Rise.Color.mix('#f00', '#000', i).toHex().should.be.equal(newHex + '0000');
            Rise.Color.mix('#0f0', '#000', i).toHex().should.be.equal('00' + newHex + '00');
            Rise.Color.mix('#00f', '#000', i).toHex().should.be.equal('0000' + newHex);
            Rise.Color.mix(new Rise.Color('transparent'), '#000', i).toRgb().a.should.be.equal(i / 100);
        }
    });

    it('Should properly return color from string', function() {
        Rise.Color.fromString('transparent').toHexString().should.be.equal('#00000000');
        Rise.Color.fromString('black').toHexString().should.be.equal('#000000');
        Rise.Color.fromString('rgb(0, 0, 0)').toHexString().should.be.equal('#000000');
        Rise.Color.fromString('rgba(0, 0, 0, 0)').toHexString().should.be.equal('#00000000');
        Rise.Color.fromString('hsl(0, 0%, 0%)').toHexString().should.be.equal('#000000');
        Rise.Color.fromString('hsla(0, 0%, 0%, 0)').toHexString().should.be.equal('#00000000');
        Rise.Color.fromString('hsv(0, 0%, 0%)').toHexString().should.be.equal('#000000');
        Rise.Color.fromString('#00000000').toHexString().should.be.equal('#00000000');
        Rise.Color.fromString('#000000').toHexString().should.be.equal('#000000');
        Rise.Color.fromString('#000').toHexString().should.be.equal('#000000');
    });

    it("Should invalid alpha normalize to 1", function() {
        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: -1
        }).toRgbString().should.be.equal('rgb(255, 20, 10)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: -0
        }).toRgbString().should.be.equal('rgba(255, 20, 10, 0)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: 0
        }).toRgbString().should.be.equal('rgba(255, 20, 10, 0)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: 0.5
        }).toRgbString().should.be.equal('rgba(255, 20, 10, 0.5)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: 1
        }).toRgbString().should.be.equal('rgb(255, 20, 10)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: 100
        }).toRgbString().should.be.equal('rgb(255, 20, 10)');

        new Rise.Color({
            r: 255,
            g: 20,
            b: 10,
            a: "asdfasd"
        }).toRgbString().should.be.equal('rgb(255, 20, 10)');
    });
});