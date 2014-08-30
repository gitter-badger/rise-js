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
        color.isValid().should.be.ok;

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

        color.toHexString().should.be.equal('#ffffff');
    });

    it("Should properly set alpha channel", function() {
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

    it("Should properly get brightness", function() {
        new Rise.Color('#000').getBrightness().should.be.equal(0);
        new Rise.Color('#fff').getBrightness().should.be.equal(255);
    });

    it("Should properly parse/convert HSV", function() {
        new Rise.Color('hsv 251.1 0.887 .918').toHsvString().should.be.equal('hsv(251, 89%, 92%)');
        new Rise.Color('hsv 251.1 0.887 0.918').toHsvString().should.be.equal('hsv(251, 89%, 92%)');

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

    it("Should properly parse/convert HEX", function() {
        new Rise.Color('#80ff0000').toHex8String().should.be.equal('#80ff0000');
        new Rise.Color('#ff0000').toHexString().should.be.equal('#ff0000');
        new Rise.Color('#f00').toHexString(true).should.be.equal('#f00');
    });

    it("Should properly parse/convert RGB/PRGB", function() {
        new Rise.Color('rgb 255 0 0').toRgbString().should.be.equal('rgb(255, 0, 0)');
        new Rise.Color('rgba(255, 0, 0, 0.5)').toRgbString().should.be.equal('rgba(255, 0, 0, 0.5)');
        new Rise.Color('rgb 255 0 0').toHexString().should.be.equal('#ff0000');
        new Rise.Color('rgb(255, 0, 0)').toHexString().should.be.equal('#ff0000');
        new Rise.Color('rgb (255, 0, 0)').toHexString().should.be.equal('#ff0000');
        new Rise.Color('rgb 100% 0% 0%').toHexString().should.be.equal('#ff0000');
        new Rise.Color('rgb(100%, 0%, 0%)').toHexString().should.be.equal('#ff0000');
        new Rise.Color('rgb (100%, 0%, 0%)').toHexString().should.be.equal('#ff0000');

        new Rise.Color({
            r: 255,
            g: 0,
            b: 0
        }).toHexString().should.be.equal('#ff0000');

        new Rise.Color({
            r: 255,
            g: 0,
            b: 0
        }).toRgb().should.be.eql({
            r: 255,
            g: 0,
            b: 0,
            a: 1
        });

        new Rise.Color({
            r: "100%",
            g: "0%",
            b: "0%"
        }).toHexString().should.be.equal('#ff0000');

        new Rise.Color({
            r: "100%",
            g: "0%",
            b: "0%"
        }).toRgb().should.be.eql({
            r: 255,
            g: 0,
            b: 0,
            a: 1
        });

        Rise.Color.equals({
            r: 200,
            g: 100,
            b: 0
        }, 'rgb(200, 100, 0)').should.be.ok;

        Rise.Color.equals({
            r: 200,
            g: 100,
            b: 0
        }, 'rgb 200 100 0').should.be.ok;

        Rise.Color.equals({
            r: "90%",
            g: "45%",
            b: "0%"
        }, 'rgb(90%, 45%, 0%)').should.be.ok;

        Rise.Color.equals({
            r: "90%",
            g: "45%",
            b: "0%",
            a: 0.4
        }, 'rgba(90%, 45%, 0%, 0.4)').should.be.ok;

        colorConversions.forEach(function(colorItem) {
            var color = new Rise.Color(colorItem.hex),
                input = color.toRgb(),
                output = new Rise.Color(color.toPercentageRgb()).toRgb(),
                maxDiff = 2;

            color.toHexString().should.be.equal(new Rise.Color(color.toRgb()).toHexString());
            color.toHexString().should.be.equal(new Rise.Color(color.toRgbString()).toHexString());

            Should(Math.abs(input.r - output.r) <= maxDiff).be.ok;
            Should(Math.abs(input.g - output.g) <= maxDiff).be.ok;
            Should(Math.abs(input.b - output.b) <= maxDiff).be.ok;
        });
    });

    it('Should properly return name of color', function() {
        new Rise.Color("#f00").toName().should.be.equal("red");
        new Rise.Color("#fa0a0a").toName().should.be.equal(false);
    });

    it("Should properly return filter string", function() {
        new Rise.Color("red").toFilterString().should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffff0000,endColorstr=#ffff0000)");
        new Rise.Color("red").toFilterString("blue").should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffff0000,endColorstr=#ff0000ff)");
        new Rise.Color("transparent").toFilterString().should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#00000000)");
        new Rise.Color("transparent").toFilterString("red").should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#ffff0000)");
        new Rise.Color("#ddf0f0f0").toFilterString().should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#ddf0f0f0,endColorstr=#ddf0f0f0)");
        new Rise.Color("rgba(0, 0, 255, .5").toFilterString().should.be.equal("progid:DXImageTransform.Microsoft.gradient(startColorstr=#800000ff,endColorstr=#800000ff)");
    });

    it("Should properly return string", function() {
        var transparentColor = Rise.Color.fromRatio({
                r: 255,
                g: 0,
                b: 0,
                a: 0
            }, {
                format: "name"
            }),
            redColorName = Rise.Color.fromRatio({
                r: 255,
                g: 0,
                b: 0,
                a: 0.5
            }, {
                format: "name"
            }),
            redColorHex = Rise.Color.fromRatio({
                r: 255,
                g: 0,
                b: 0,
                a: 0.5
            }, {
                format: "hex"
            });

        transparentColor.toString().should.be.equal('transparent');

        redColorName.getFormat().should.be.equal('name');
        redColorName.toString().should.be.equal('#ff0000');
        redColorName.toString("hex").should.be.equal('#ff0000');
        redColorName.toString("hex6").should.be.equal('#ff0000');
        redColorName.toString("hex3").should.be.equal('#f00');
        redColorName.toString("name").should.be.equal('#ff0000');
        redColorName.toName().should.be.not.ok;
        redColorName.setAlpha(0);
        redColorName.toString().should.be.equal('transparent');
        redColorName.setAlpha(1);
        redColorName.toString().should.be.equal('red');

        redColorHex.getFormat().should.be.equal('hex');
        redColorHex.toString().should.be.equal('#ff0000');
    });

    it("Should properly make lighten", function() {
        var LIGHTENS = ["ff0000", "ff0505", "ff0a0a", "ff0f0f", "ff1414", "ff1a1a", "ff1f1f", "ff2424", "ff2929", "ff2e2e", "ff3333", "ff3838", "ff3d3d", "ff4242", "ff4747", "ff4d4d", "ff5252", "ff5757", "ff5c5c", "ff6161", "ff6666", "ff6b6b", "ff7070", "ff7575", "ff7a7a", "ff8080", "ff8585", "ff8a8a", "ff8f8f", "ff9494", "ff9999", "ff9e9e", "ffa3a3", "ffa8a8", "ffadad", "ffb3b3", "ffb8b8", "ffbdbd", "ffc2c2", "ffc7c7", "ffcccc", "ffd1d1", "ffd6d6", "ffdbdb", "ffe0e0", "ffe5e5", "ffebeb", "fff0f0", "fff5f5", "fffafa", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").lighten(i).toHex().should.be.equal(LIGHTENS[i]);
        }
    });

    it('Should properly make brighten color', function() {
        var BRIGHTENS = ["ff0000", "ff0303", "ff0505", "ff0808", "ff0a0a", "ff0d0d", "ff0f0f", "ff1212", "ff1414", "ff1717", "ff1919", "ff1c1c", "ff1f1f", "ff2121", "ff2424", "ff2626", "ff2929", "ff2b2b", "ff2e2e", "ff3030", "ff3333", "ff3636", "ff3838", "ff3b3b", "ff3d3d", "ff4040", "ff4242", "ff4545", "ff4747", "ff4a4a", "ff4c4c", "ff4f4f", "ff5252", "ff5454", "ff5757", "ff5959", "ff5c5c", "ff5e5e", "ff6161", "ff6363", "ff6666", "ff6969", "ff6b6b", "ff6e6e", "ff7070", "ff7373", "ff7575", "ff7878", "ff7a7a", "ff7d7d", "ff7f7f", "ff8282", "ff8585", "ff8787", "ff8a8a", "ff8c8c", "ff8f8f", "ff9191", "ff9494", "ff9696", "ff9999", "ff9c9c", "ff9e9e", "ffa1a1", "ffa3a3", "ffa6a6", "ffa8a8", "ffabab", "ffadad", "ffb0b0", "ffb2b2", "ffb5b5", "ffb8b8", "ffbaba", "ffbdbd", "ffbfbf", "ffc2c2", "ffc4c4", "ffc7c7", "ffc9c9", "ffcccc", "ffcfcf", "ffd1d1", "ffd4d4", "ffd6d6", "ffd9d9", "ffdbdb", "ffdede", "ffe0e0", "ffe3e3", "ffe5e5", "ffe8e8", "ffebeb", "ffeded", "fff0f0", "fff2f2", "fff5f5", "fff7f7", "fffafa", "fffcfc", "ffffff"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").brighten(i).toHex().should.be.equal(BRIGHTENS[i]);
        }
    });

    it('Should properly make darken color', function() {
        var DARKENS = ["ff0000", "fa0000", "f50000", "f00000", "eb0000", "e60000", "e00000", "db0000", "d60000", "d10000", "cc0000", "c70000", "c20000", "bd0000", "b80000", "b30000", "ad0000", "a80000", "a30000", "9e0000", "990000", "940000", "8f0000", "8a0000", "850000", "800000", "7a0000", "750000", "700000", "6b0000", "660000", "610000", "5c0000", "570000", "520000", "4d0000", "470000", "420000", "3d0000", "380000", "330000", "2e0000", "290000", "240000", "1f0000", "190000", "140000", "0f0000", "0a0000", "050000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").darken(i).toHex().should.be.equal(DARKENS[i]);
        }
    });

    it('Should properly make desaturate color', function() {
        var DESATURATIONS = ["ff0000", "fe0101", "fc0303", "fb0404", "fa0505", "f90606", "f70808", "f60909", "f50a0a", "f40b0b", "f20d0d", "f10e0e", "f00f0f", "ee1111", "ed1212", "ec1313", "eb1414", "e91616", "e81717", "e71818", "e61919", "e41b1b", "e31c1c", "e21d1d", "e01f1f", "df2020", "de2121", "dd2222", "db2424", "da2525", "d92626", "d72828", "d62929", "d52a2a", "d42b2b", "d22d2d", "d12e2e", "d02f2f", "cf3030", "cd3232", "cc3333", "cb3434", "c93636", "c83737", "c73838", "c63939", "c43b3b", "c33c3c", "c23d3d", "c13e3e", "bf4040", "be4141", "bd4242", "bb4444", "ba4545", "b94646", "b84747", "b64949", "b54a4a", "b44b4b", "b34d4d", "b14e4e", "b04f4f", "af5050", "ad5252", "ac5353", "ab5454", "aa5555", "a85757", "a75858", "a65959", "a45b5b", "a35c5c", "a25d5d", "a15e5e", "9f6060", "9e6161", "9d6262", "9c6363", "9a6565", "996666", "986767", "966969", "956a6a", "946b6b", "936c6c", "916e6e", "906f6f", "8f7070", "8e7171", "8c7373", "8b7474", "8a7575", "887777", "877878", "867979", "857a7a", "837c7c", "827d7d", "817e7e", "808080"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").desaturate(i).toHex().should.be.equal(DESATURATIONS[i]);
        }
    });

    it('Should properly make saturate color', function() {
        var SATURATIONS = ["ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000", "ff0000"];
        for (var i = 0; i <= 100; i++) {
            new Rise.Color("red").saturate(i).toHex().should.be.equal(SATURATIONS[i]);
        }
    });

    it('Should properly make greyscale color', function() {
        new Rise.Color("red").greyscale().toHex().should.be.equal("808080");
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

        color.toHex().should.be.equal("ff0000");

        arrayToString(analogous).should.be.equal("ff0000,ff0066,ff0033,ff0000,ff3300,ff6600");
        complementary.toHex().should.be.equal("00ffff");
        arrayToString(monochromatic).should.be.equal("ff0000,2a0000,550000,800000,aa0000,d40000");
        arrayToString(splitComplementary).should.be.equal("ff0000,ccff00,0066ff");
        arrayToString(triad).should.be.equal("ff0000,00ff00,0000ff");
        arrayToString(tetrad).should.be.equal("ff0000,80ff00,00ffff,7f00ff");
    });

    it("Should properly parse named colors", function() {
        new Rise.Color("aliceblue").toHexString().should.be.equal("#f0f8ff");
        new Rise.Color("antiquewhite").toHexString().should.be.equal("#faebd7");
        new Rise.Color("aqua").toHexString().should.be.equal("#00ffff");
        new Rise.Color("aquamarine").toHexString().should.be.equal("#7fffd4");
        new Rise.Color("azure").toHexString().should.be.equal("#f0ffff");
        new Rise.Color("beige").toHexString().should.be.equal("#f5f5dc");
        new Rise.Color("bisque").toHexString().should.be.equal("#ffe4c4");
        new Rise.Color("black").toHexString().should.be.equal("#000000");
        new Rise.Color("blanchedalmond").toHexString().should.be.equal("#ffebcd");
        new Rise.Color("blue").toHexString().should.be.equal("#0000ff");
        new Rise.Color("blueviolet").toHexString().should.be.equal("#8a2be2");
        new Rise.Color("brown").toHexString().should.be.equal("#a52a2a");
        new Rise.Color("burlywood").toHexString().should.be.equal("#deb887");
        new Rise.Color("cadetblue").toHexString().should.be.equal("#5f9ea0");
        new Rise.Color("chartreuse").toHexString().should.be.equal("#7fff00");
        new Rise.Color("chocolate").toHexString().should.be.equal("#d2691e");
        new Rise.Color("coral").toHexString().should.be.equal("#ff7f50");
        new Rise.Color("cornflowerblue").toHexString().should.be.equal("#6495ed");
        new Rise.Color("cornsilk").toHexString().should.be.equal("#fff8dc");
        new Rise.Color("crimson").toHexString().should.be.equal("#dc143c");
        new Rise.Color("cyan").toHexString().should.be.equal("#00ffff");
        new Rise.Color("darkblue").toHexString().should.be.equal("#00008b");
        new Rise.Color("darkcyan").toHexString().should.be.equal("#008b8b");
        new Rise.Color("darkgoldenrod").toHexString().should.be.equal("#b8860b");
        new Rise.Color("darkgray").toHexString().should.be.equal("#a9a9a9");
        new Rise.Color("darkgreen").toHexString().should.be.equal("#006400");
        new Rise.Color("darkkhaki").toHexString().should.be.equal("#bdb76b");
        new Rise.Color("darkmagenta").toHexString().should.be.equal("#8b008b");
        new Rise.Color("darkolivegreen").toHexString().should.be.equal("#556b2f");
        new Rise.Color("darkorange").toHexString().should.be.equal("#ff8c00");
        new Rise.Color("darkorchid").toHexString().should.be.equal("#9932cc");
        new Rise.Color("darkred").toHexString().should.be.equal("#8b0000");
        new Rise.Color("darksalmon").toHexString().should.be.equal("#e9967a");
        new Rise.Color("darkseagreen").toHexString().should.be.equal("#8fbc8f");
        new Rise.Color("darkslateblue").toHexString().should.be.equal("#483d8b");
        new Rise.Color("darkslategray").toHexString().should.be.equal("#2f4f4f");
        new Rise.Color("darkturquoise").toHexString().should.be.equal("#00ced1");
        new Rise.Color("darkviolet").toHexString().should.be.equal("#9400d3");
        new Rise.Color("deeppink").toHexString().should.be.equal("#ff1493");
        new Rise.Color("deepskyblue").toHexString().should.be.equal("#00bfff");
        new Rise.Color("dimgray").toHexString().should.be.equal("#696969");
        new Rise.Color("dodgerblue").toHexString().should.be.equal("#1e90ff");
        new Rise.Color("firebrick").toHexString().should.be.equal("#b22222");
        new Rise.Color("floralwhite").toHexString().should.be.equal("#fffaf0");
        new Rise.Color("forestgreen").toHexString().should.be.equal("#228b22");
        new Rise.Color("fuchsia").toHexString().should.be.equal("#ff00ff");
        new Rise.Color("gainsboro").toHexString().should.be.equal("#dcdcdc");
        new Rise.Color("ghostwhite").toHexString().should.be.equal("#f8f8ff");
        new Rise.Color("gold").toHexString().should.be.equal("#ffd700");
        new Rise.Color("goldenrod").toHexString().should.be.equal("#daa520");
        new Rise.Color("gray").toHexString().should.be.equal("#808080");
        new Rise.Color("grey").toHexString().should.be.equal("#808080");
        new Rise.Color("green").toHexString().should.be.equal("#008000");
        new Rise.Color("greenyellow").toHexString().should.be.equal("#adff2f");
        new Rise.Color("honeydew").toHexString().should.be.equal("#f0fff0");
        new Rise.Color("hotpink").toHexString().should.be.equal("#ff69b4");
        new Rise.Color("indianred ").toHexString().should.be.equal("#cd5c5c");
        new Rise.Color("indigo ").toHexString().should.be.equal("#4b0082");
        new Rise.Color("ivory").toHexString().should.be.equal("#fffff0");
        new Rise.Color("khaki").toHexString().should.be.equal("#f0e68c");
        new Rise.Color("lavender").toHexString().should.be.equal("#e6e6fa");
        new Rise.Color("lavenderblush").toHexString().should.be.equal("#fff0f5");
        new Rise.Color("lawngreen").toHexString().should.be.equal("#7cfc00");
        new Rise.Color("lemonchiffon").toHexString().should.be.equal("#fffacd");
        new Rise.Color("lightblue").toHexString().should.be.equal("#add8e6");
        new Rise.Color("lightcoral").toHexString().should.be.equal("#f08080");
        new Rise.Color("lightcyan").toHexString().should.be.equal("#e0ffff");
        new Rise.Color("lightgoldenrodyellow").toHexString().should.be.equal("#fafad2");
        new Rise.Color("lightgrey").toHexString().should.be.equal("#d3d3d3");
        new Rise.Color("lightgreen").toHexString().should.be.equal("#90ee90");
        new Rise.Color("lightpink").toHexString().should.be.equal("#ffb6c1");
        new Rise.Color("lightsalmon").toHexString().should.be.equal("#ffa07a");
        new Rise.Color("lightseagreen").toHexString().should.be.equal("#20b2aa");
        new Rise.Color("lightskyblue").toHexString().should.be.equal("#87cefa");
        new Rise.Color("lightslategray").toHexString().should.be.equal("#778899");
        new Rise.Color("lightsteelblue").toHexString().should.be.equal("#b0c4de");
        new Rise.Color("lightyellow").toHexString().should.be.equal("#ffffe0");
        new Rise.Color("lime").toHexString().should.be.equal("#00ff00");
        new Rise.Color("limegreen").toHexString().should.be.equal("#32cd32");
        new Rise.Color("linen").toHexString().should.be.equal("#faf0e6");
        new Rise.Color("magenta").toHexString().should.be.equal("#ff00ff");
        new Rise.Color("maroon").toHexString().should.be.equal("#800000");
        new Rise.Color("mediumaquamarine").toHexString().should.be.equal("#66cdaa");
        new Rise.Color("mediumblue").toHexString().should.be.equal("#0000cd");
        new Rise.Color("mediumorchid").toHexString().should.be.equal("#ba55d3");
        new Rise.Color("mediumpurple").toHexString().should.be.equal("#9370db");
        new Rise.Color("mediumseagreen").toHexString().should.be.equal("#3cb371");
        new Rise.Color("mediumslateblue").toHexString().should.be.equal("#7b68ee");
        new Rise.Color("mediumspringgreen").toHexString().should.be.equal("#00fa9a");
        new Rise.Color("mediumturquoise").toHexString().should.be.equal("#48d1cc");
        new Rise.Color("mediumvioletred").toHexString().should.be.equal("#c71585");
        new Rise.Color("midnightblue").toHexString().should.be.equal("#191970");
        new Rise.Color("mintcream").toHexString().should.be.equal("#f5fffa");
        new Rise.Color("mistyrose").toHexString().should.be.equal("#ffe4e1");
        new Rise.Color("moccasin").toHexString().should.be.equal("#ffe4b5");
        new Rise.Color("navajowhite").toHexString().should.be.equal("#ffdead");
        new Rise.Color("navy").toHexString().should.be.equal("#000080");
        new Rise.Color("oldlace").toHexString().should.be.equal("#fdf5e6");
        new Rise.Color("olive").toHexString().should.be.equal("#808000");
        new Rise.Color("olivedrab").toHexString().should.be.equal("#6b8e23");
        new Rise.Color("orange").toHexString().should.be.equal("#ffa500");
        new Rise.Color("orangered").toHexString().should.be.equal("#ff4500");
        new Rise.Color("orchid").toHexString().should.be.equal("#da70d6");
        new Rise.Color("palegoldenrod").toHexString().should.be.equal("#eee8aa");
        new Rise.Color("palegreen").toHexString().should.be.equal("#98fb98");
        new Rise.Color("paleturquoise").toHexString().should.be.equal("#afeeee");
        new Rise.Color("palevioletred").toHexString().should.be.equal("#db7093");
        new Rise.Color("papayawhip").toHexString().should.be.equal("#ffefd5");
        new Rise.Color("peachpuff").toHexString().should.be.equal("#ffdab9");
        new Rise.Color("peru").toHexString().should.be.equal("#cd853f");
        new Rise.Color("pink").toHexString().should.be.equal("#ffc0cb");
        new Rise.Color("plum").toHexString().should.be.equal("#dda0dd");
        new Rise.Color("powderblue").toHexString().should.be.equal("#b0e0e6");
        new Rise.Color("purple").toHexString().should.be.equal("#800080");
        new Rise.Color("red").toHexString().should.be.equal("#ff0000");
        new Rise.Color("rosybrown").toHexString().should.be.equal("#bc8f8f");
        new Rise.Color("royalblue").toHexString().should.be.equal("#4169e1");
        new Rise.Color("saddlebrown").toHexString().should.be.equal("#8b4513");
        new Rise.Color("salmon").toHexString().should.be.equal("#fa8072");
        new Rise.Color("sandybrown").toHexString().should.be.equal("#f4a460");
        new Rise.Color("seagreen").toHexString().should.be.equal("#2e8b57");
        new Rise.Color("seashell").toHexString().should.be.equal("#fff5ee");
        new Rise.Color("sienna").toHexString().should.be.equal("#a0522d");
        new Rise.Color("silver").toHexString().should.be.equal("#c0c0c0");
        new Rise.Color("skyblue").toHexString().should.be.equal("#87ceeb");
        new Rise.Color("slateblue").toHexString().should.be.equal("#6a5acd");
        new Rise.Color("slategray").toHexString().should.be.equal("#708090");
        new Rise.Color("snow").toHexString().should.be.equal("#fffafa");
        new Rise.Color("springgreen").toHexString().should.be.equal("#00ff7f");
        new Rise.Color("steelblue").toHexString().should.be.equal("#4682b4");
        new Rise.Color("tan").toHexString().should.be.equal("#d2b48c");
        new Rise.Color("teal").toHexString().should.be.equal("#008080");
        new Rise.Color("thistle").toHexString().should.be.equal("#d8bfd8");
        new Rise.Color("tomato").toHexString().should.be.equal("#ff6347");
        new Rise.Color("turquoise").toHexString().should.be.equal("#40e0d0");
        new Rise.Color("violet").toHexString().should.be.equal("#ee82ee");
        new Rise.Color("wheat").toHexString().should.be.equal("#f5deb3");
        new Rise.Color("white").toHexString().should.be.equal("#ffffff");
        new Rise.Color("whitesmoke").toHexString().should.be.equal("#f5f5f5");
        new Rise.Color("yellow").toHexString().should.be.equal("#ffff00");
        new Rise.Color("yellowgreen").toHexString().should.be.equal("#9acd32");
    });

    it('Should properly instantiate from ratio', function() {
        Rise.Color.fromRatio({
            r: 1,
            g: 1,
            b: 1
        }).toHexString().should.be.equal('#ffffff');

        Rise.Color.fromRatio({
            r: 1,
            g: 0,
            b: 0,
            a: 0.5
        }).toRgbString().should.be.equal('rgba(255, 0, 0, 0.5)');

        Rise.Color.fromRatio({
            r: 1,
            g: 0,
            b: 0,
            a: 1
        }).toRgbString().should.be.equal('rgb(255, 0, 0)');

        Rise.Color.fromRatio({
            r: 1,
            g: 0,
            b: 0,
            a: 10
        }).toRgbString().should.be.equal('rgb(255, 0, 0)');

        Rise.Color.fromRatio({
            r: 1,
            g: 0,
            b: 0,
            a: -1
        }).toRgbString().should.be.equal('rgb(255, 0, 0)');
    });

    it("Should properly check for equals colors", function() {
        new Rise.Color("010101").toHexString().should.be.equal("#010101");

        Rise.Color.equals("#ff0000", "#ff0000").should.be.ok;
        Rise.Color.equals("#ff0000", "rgb(255, 0, 0)").should.be.ok;
        Rise.Color.equals("ff0000", "#ff0000").should.be.ok;
        Rise.Color.equals("#f00", "#ff0000").should.be.ok;
        Rise.Color.equals("f00", "#ff0000").should.be.ok;
        Rise.Color.equals("#ff8000", "rgb(100%, 50%, 0%)").should.be.ok;

        colorConversions.forEach(function(color) {
            new Rise.Color(color.hex).isValid().should.be.ok;

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

    it("Should properly mix colors", function() {
        Rise.Color.mix('#000', '#fff').toHsl().l.should.be.equal(0.5);
        Rise.Color.mix('#f00', '#000', 0).toHex().should.be.equal('ff0000');

        for (var i = 0; i < 100; i++) {
            Should(Math.round(Rise.Color.mix('#000', '#fff', i).toHsl().l * 100) / 100).be.equal(i / 100);

            var newHex = Math.round(255 * (1 - (i / 100))).toString(16);
            newHex = newHex.length === 1 ? '0' + newHex : newHex;

            Rise.Color.mix('#f00', '#000', i).toHex().should.be.equal(newHex + '0000');
            Rise.Color.mix('#0f0', '#000', i).toHex().should.be.equal('00' + newHex + '00');
            Rise.Color.mix('#00f', '#000', i).toHex().should.be.equal('0000' + newHex);
            Rise.Color.mix(new Rise.Color('transparent'), '#000', i).toRgb().a.should.be.equal(i / 100);
        }
    });
});