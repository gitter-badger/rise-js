module Rise {
    export var Util = {
        assign: function (destination, ...source) {
            for (let i = 0; i < source.length; i++) {
                let obj = source[i];

                Object.keys(obj).forEach((key) => {
                    if (obj[key] && obj[key].constructor && obj[key].constructor === Object) {
                        destination[key] = destination[key] || {};
                        this.assign(destination[key], obj[key]);
                    } else {
                        destination[key] = obj[key];
                    }
                });
            }

            return destination;
        },

        toCamelizedString: function (text:string) {
            return text.replace(/\-(\w)/g, function (text, letter) {
                return letter.toUpperCase();
            });
        },

        toDashedString: function (text:string) {
            return text.replace(/([A-Z])/g, function (text) {
                return '-' + text.toLowerCase();
            });
        },

        getRandomString: function (prepend:string = '', append:string = '', separator:string = '') {
            return [
                prepend,
                Math.random().toString(36).slice(2),
                append
            ].join(separator);
        },

        flipObject: function (object:Object) {
            var flipped = {};

            Object.keys(object).forEach(function (key) {
                flipped[object[key]] = key;
            });

            return flipped;
        }
    };
}