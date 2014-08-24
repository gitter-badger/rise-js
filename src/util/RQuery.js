(function(global) {
    'use strict';

    /**
     * Factory method that returns new Rise.RQuery instance
     * @static
     * @return {Rise.RQuery} Returns Rise.RQuery instance
     * @example
     * Rise.$('div');
     * Rise.$('.my-selector');
     */
    global.Rise.$ = function() {
        return Rise.RQuery.apply(Object.create(Rise.RQuery.prototype), arguments);
    };

    /**
     * Factory method that returns new Rise.RQuery instance with created Element
     * @static
     * @param  {String} tag Tag element that need to create
     * @return {Rise.RQuery} Returns Rise.RQuery instance with created Element
     * @example
     * Rise.$.create('div');
     * Rise.$.create('span').text('My text');
     */
    global.Rise.$.create = function(tag) {
        return new Rise.RQuery(document.createElement(tag));
    };

    global.Rise.RQuery = Rise.Class.extend({
        /**
         * Create new Rise.RQuery instance
         * @constructor
         * @param  {String|Rise.RQuery|Element|Array} selector Selector or exists Element
         * @param  {Element|Document|Window} parent Parent from where selector will parse
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        init: function(selector, parent) {
            selector = selector || window;
            parent = parent || document;

            /**
             * Push Element to this.elements if valid
             * @this {Rise.RQuery}
             * @param  {Element} element It should be Element instance
             * @private
             */
            var pushElement = function(element) {
                if (element instanceof Element) {
                    this.elements.push(element);
                }
            }.bind(this);

            this.elements = [];

            Rise.Logger.startGroup(true, 'Rise.RQuery -> init()');
            Rise.Logger.log('Parsing selector -> "%O" with parent -> %O', selector, parent);

            if (selector instanceof Rise.RQuery) {
                this.elements = selector.get();
            } else if (Rise.Util.isArray(selector) || selector instanceof HTMLCollection) {
                Array.prototype.forEach.call(selector, pushElement);
            } else if (selector instanceof Element || selector instanceof Window) {
                this.elements[0] = selector;
            } else if (Rise.Util.isString(selector)) {
                Array.prototype.forEach.call(parent.querySelectorAll(selector), pushElement);
            } else {
                Rise.Logger.warning('Selector is not valid -> %O', selector);
            }

            Rise.Logger.log('Instantiated Rise.RQuery -> %O', this);
            Rise.Logger.endGroup();

            return this;
        },

        /**
         * Get Element by index
         * @param  {Integer} index Index
         * @return {Array|Element} Returns Element with corresponding index or array of elements
         * @example
         * Rise.$('body').get(0);
         * Rise.$('div').get();
         */
        get: function(index) {
            return Rise.Util.isUndefined(index) ? this.elements : this.elements[index];
        },

        /**
         * Get elements count
         * @return {Integer} Returns elements count
         */
        count: function() {
            return (this.elements && this.elements.length) || 0;
        },

        /**
         * Iterate through all elements and call callback function
         * @param  {Function} cb Callback which called at each iteration cb(element, index, array)
         * @return {Rise.RQuery}
         * @example
         * Rise.$('div').each(function(element, index, array) {
         *     console.log(element, index, array);
         * });
         */
        each: function(cb) {
            Array.prototype.forEach.call(this.get(), cb);
            return this;
        },

        /**
         * Get parent node
         * @return {Rise.RQuery} Returns parent node of element
         * @example
         * Rise.$('body').parent();
         */
        parent: function() {
            return new Rise.RQuery(this.get(0).parentNode);
        },

        /**
         * Get array of children nodes
         * @return {Rise.RQuery} Return Rise.RQuery object with child nodes
         * @example
         * Rise.$('body').children();
         */
        children: function() {
            return new Rise.RQuery(this.get(0).children);
        },

        /**
         * Check if node contains other node
         * @param {Rise.RQuery} child Child node which need to check for exists in node
         * @return {Boolean} True if contains
         * @example
         * Rise.$('body').contains(Rise.$('div'));
         */
        contains: function(child) {
            child = child.get(0);

            var element = this.get(0);

            return element !== child && element.contains(child);
        },

        /**
         * Get node's width
         * @return {Integer} Returns offsetWidth of node
         * @example
         * Rise.$('div').offsetWidth();
         */
        offsetWidth: function() {
            return this.get(0).offsetWidth;
        },

        /**
         * Get node's height
         * @return {Integer} Returns offsetHeight of node
         * @example
         * Rise.$('div').offsetHeight();
         */
        offsetHeight: function() {
            return this.get(0).offsetHeight;
        },

        /**
         * Get left offset of node
         * @return {Integer} Returns offsetLeft of node
         * @example
         * Rise.$('div').offsetLeft();
         */
        offsetLeft: function() {
            return this.get(0).offsetLeft;
        },

        /**
         * Get top offset of node
         * @return {Integer} Returns offsetTop of node
         * @example
         * Rise.$('div').offsetTop();
         */
        offsetTop: function() {
            return this.get(0).offsetTop;
        },

        /**
         * Focus at node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         * @example
         * Rise.$('input').focus();
         */
        focus: function() {
            this.get(0).focus();
            return this;
        },

        /**
         * Unfocus from node
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         * @example
         * Rise.$('input').blur();
         */
        blur: function() {
            this.get(0).blur();
            return this;
        },

        /**
         * Iterate through nodes and filter them out
         * @param  {Function} cb Callback function accept 3 arguments cb(node, index, array) and must return bool
         * @return {Rise.RQuery} Returns Rise.RQuery instance with filtered nodes
         * @example
         * Rise.$('div').filter(function(node, index, array) {
         *     return Rise.$(node).hasClass('example');
         * });
         */
        filter: function(cb) {
            if (Rise.Util.isFunction(cb)) {
                return new Rise.RQuery(Array.prototype.filter.call(this.get(), cb));
            } else {
                Rise.Logger.warning('Rise.RQuery.filter() -> You must provide function');
            }
        },

        /**
         * Find nodes by selector, starting from current parent node
         * @param  {String} selector Selector for find other nodes
         * @return {Rise.RQuery} Returns new Rise.RQuery instance with finded nodes
         * @example
         * Rise.$('body').find('div').find('span');
         */
        find: function(selector) {
            return new Rise.RQuery(selector, this.get(0));
        },

        /**
         * Set or get attribute value to nodes
         * @param  {String|Object} attr String for getting attribute value and object for set
         * @return {Rise.RQuery|Mixed} Returns current Rise.RQuery instance or attribute value
         * @example
         * Rise.$('div').attr('id');
         * Rise.$('div').attr({
         *     id: 'test'
         * });
         */
        attr: function(attr) {
            if (Rise.Util.isString(attr)) {
                return this.get(0).getAttribute(attr);
            } else if (Rise.Util.isObject(attr)) {
                Rise.Logger.startGroup(true, 'Rise.RQuery.attr() -> Set attributes');
                this.each(function(element) {
                    Object.keys(attr).forEach(function(key) {
                        Rise.Logger.log('Set key-value "%s" -> "%s" to element %O', key, attr[key], element);
                        element.setAttribute(key, attr[key]);
                    });
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Set or get css-rules
         * @param  {String|Object} name String if you want get CSS-rule or Object for set
         * @param {String} pseudoElement You can provide pseudoElement selector
         * @return {Rise.RQuery|Mixed} Returns current Rise.RQuery instance or CSS value
         * @example
         * Rise.RQuery('div').css({
         *     width: 200
         * });
         * Rise.RQuery('div').css('width', ':after');
         * Rise.RQuery('div').css('width');
         */
        css: function(css, pseudoElement) {
            pseudoElement = pseudoElement || null;

            if (Rise.Util.isString(css)) {
                return window.getComputedStyle(this.get(0), pseudoElement).getPropertyValue(Rise.Util.getDashedString(css));
            } else if (Rise.Util.isObject(css)) {
                Rise.Logger.startGroup(true, 'Rise.RQuery.css() -> Set CSS');
                this.each(function(element) {
                    Object.keys(css).forEach(function(key) {
                        Rise.Logger.log('Set key-value "%s" -> "%s" to element %O', key, css[key], element);

                        if (css[key] === false) {
                            element.style.removeProperty(Rise.Util.getDashedString(key));
                        } else if (isNaN(css[key]) || Rise.RQuery.cssNumbersMap.indexOf(key) != -1) {
                            element.style[Rise.Util.getCamelizedString(key)] = css[key];
                        } else {
                            element.style[Rise.Util.getCamelizedString(key)] = css[key] + 'px';
                        }
                    });
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Wrap nodes with new node
         * @param  {Rise.RQuery} html Rise.RQuery instance with HTML which will be the wrapper
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').wrap(Rise.$.create('a')); // Wrap all div with a tag
         */
        wrap: function(html) {
            var wrapper;

            return this.each(function(element) {
                wrapper = html.clone();
                element.parentNode.insertBefore(wrapper.get(0), element);
                wrapper.append(element);
            });
        },

        /**
         * Unwrap nodes, remove parent node from nodes
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').unwrap();
         */
        unwrap: function() {
            return this.each(function(element) {
                element.parentNode.parentNode.replaceChild(element, element.parentNode);
            });
        },

        /**
         * Check if this node is matches to selector
         * @param  {String} selector Selector for checking
         * @return {Boolean} Returns true if all elements is match to selector and false otherwise
         * @example
         * Rise.$('div').is('div'); // true
         */
        is: function(selector) {
            var element;

            if (this.count() > 0) {
                element = this.get(0);

                return (
                    element.matches ||
                    element.matchesSelector ||
                    element.msMatchesSelector ||
                    element.mozMatchesSelector ||
                    element.webkitMatchesSelector ||
                    element.oMatchesSelector
                ).call(element, selector);
            }

            return false;
        },

        /**
         * Add class name to nodes
         * @param {String} names Class names splitted with spaces
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').addClass('foo bar');
         */
        addClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.add(name);
                });
            });
        },

        /**
         * Remove class name from nodes
         * @param  {String} names Class names that need to be removed from nodes
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').removeClass('foo bar');
         */
        removeClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.remove(name);
                });
            });
        },

        /**
         * Toggle class name for nodes
         * @param  {String} names Class names that need to be toggled
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').toggleClass('foo bar');
         */
        toggleClass: function(names) {
            names = names.split(/[ ]+/);

            return this.each(function(element) {
                names.forEach(function(name) {
                    element.classList.toggle(name);
                });
            });
        },

        /**
         * Check if nodes have class name
         * @param  {String}  className Class name that need check for exists in node
         * @return {Boolean} Returns true if ALL nodes have className and false otherwise
         * @example
         * Rise.$('div').hasClass('foo');
         */
        hasClass: function(name) {
            if (this.count() > 0) {
                return Array.prototype.every.call(this.get(), function(element) {
                    return element.classList.contains(name);
                });
            }

            return false;
        },

        /**
         * Bind event to nodes
         * @param  {String|Object} eventType Event type
         * @param  {Function} handler Your function which you want execute on event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').on('click', function(event) {
         *     console.log(this, event);
         * });
         * Rise.$('div').on({
         *     click: function(event) {
         *         console.log(this, event);
         *     }
         * });
         */
        on: function(eventType, handler) {
            if (Rise.Util.isObject(eventType)) {
                Object.keys(eventType).forEach(function(key) {
                    this.on(key, eventType[key]);
                });
            } else {
                Rise.Logger.startGroup(true, 'Rise.RQuery.on() -> Binding events');
                this.each(function(element) {
                    Rise.Logger.log('Bind event "%s" to %O', eventType, element);
                    element.addEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Unbind event from nodes
         * @param  {String} eventType Event type
         * @param  {Function} handler Your function which you want to unsubscribe from event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').off('click', yourFunction);
         * Rise.$('div').off({
         *     click: yourFunction
         * });
         */
        off: function(eventType, handler) {
            if (Rise.Util.isObject(eventType)) {
                Object.keys(eventType).forEach(function(key) {
                    this.off(key, eventType[key]);
                });
            } else {
                Rise.Logger.startGroup(true, 'Rise.RQuery.off() -> Unbinding events');
                this.each(function(element) {
                    Rise.Logger.log('Unbind event "%s" from element %O', eventType, element);
                    element.removeEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Trigger native event for node
         * @param  {String} eventName Name of event
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('button').trigger('click');
         */
        trigger: function(eventName) {
            var event = document.createEvent('HTMLEvents');

            event.initEvent(eventName, true, false);
            this.get(0).dispatch(event);

            return this;
        },

        /**
         * Remove nodes from DOM
         * @return {Rise.RQuery} Returns current Rise.RQuery instance
         * @example
         * Rise.$('div').remove();
         */
        remove: function() {
            return this.each(function(element) {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        },

        /**
         * Get or set HTML to nodes
         * @param  {String|Rise.RQuery} [html] HTML string or Rise.RQuery instance
         * @return {Rise.RQuery|String} Returns modified Rise.RQuery instance or HTML string
         * @example
         * Rise.$('div').html('test');
         * Rise.$('div').html(); // 'test'
         */
        html: function(html) {
            if (Rise.Util.isUndefined(html)) {
                return this.get(0).innerHTML;
            } else {
                return this.each(function(element) {
                    new Rise.RQuery(element).empty().append(html);
                });
            }
        },

        /**
         * Append HTML before node's end
         * @param  {String|Rise.RQuery|Element} html You can send String or exists node
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').append('test');
         * Rise.$('div').append(Rise.$.create('span'));
         * Rise.$('div').append(document.createElement('a'));
         */
        append: function(html) {
            if (Rise.Util.isString(html)) {
                this.each(function(element) {
                    element.insertAdjacentHTML('beforeend', html);
                });
            } else if (html instanceof Rise.RQuery) {
                this.each(function(element) {
                    element.appendChild(html.get(0));
                });
            } else if (html instanceof Element) {
                this.each(function(element) {
                    element.appendChild(html);
                });
            }

            return this;
        },

        /**
         * Prepend HTML after node began
         * @param  {String|Rise.RQuery|Element} html You can send String or existing Element
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').prepend('test');
         * Rise.$('div').prepend(Rise.$.create('span'));
         * Rise.$('div').prepend(document.createElement('a'));
         */
        prepend: function(html) {
            if (Rise.Util.isString(html)) {
                this.each(function(element) {
                    element.insertAdjacentHTML('afterbegin', html);
                });
            } else if (html instanceof Rise.RQuery) {
                this.each(function(element) {
                    element.insertBefore(html.get(0), element.firstChild);
                });
            } else if (html instanceof Element) {
                this.each(function(element) {
                    element.insertBefore(html, element.firstChild);
                });
            }

            return this;
        },

        /**
         * Set or get inner text
         * @param  {String} [text] Text which you want to set in elements
         * @return {Rise.RQuery|String} Returns current Rise.RQuery instance or string with text
         * @example
         * Rise.$('div').text('test');
         * Rise.$('div').text(); // 'test'
         */
        text: function(text) {
            if (Rise.Util.isUndefined(text)) {
                return this.get(0).textContent;
            } else {
                return this.each(function(element) {
                    element.textContent = text;
                });
            }
        },

        /**
         * Remove all child nodes from nodes
         * @return {Rise.RQuery} Returns modified Rise.RQuery instance
         * @example
         * Rise.$('div').empty();
         */
        empty: function() {
            return this.each(function(element) {
                element.innerHTML = '';
            });
        },

        /**
         * Clone node
         * @return {Rise.RQuery} Returns new Rise.RQuery instance with cloned nodes
         * @example
         * Rise.$('div').clone();
         */
        clone: function() {
            var clones = [];

            this.each(function(element) {
                clones.push(element.cloneNode(true));
            });

            return new Rise.RQuery(clones);
        }
    }, {
        /**
         * Map of CSS attributes which have only numbers at value
         * @static
         * @type {Array}
         */
        cssNumbersMap: [
            "columnCount",
            "fillOpacity",
            "flexGrow",
            "flexShrink",
            "fontWeight",
            "lineHeight",
            "opacity",
            "order",
            "orphans",
            "widows",
            "zIndex",
            "zoom"
        ]
    });
})(this);