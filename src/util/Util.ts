module Rise {
    export var Util:Object = {
        assign: function (destination, ...source) {
            for (var i = 0; i < source.length; i++) {
                Object.keys(source[i]).forEach((key) => {
                    if (source[key] && source[key].constructor && source[key].constructor === Object) {
                        destination[key] = destination[key] || {};
                        this.assign(destination[key], source[key]);
                    } else {
                        destination[key] = source[key];
                    }
                });
            }

            return destination;
        },

        toCamelizeString: function (text:string) {
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