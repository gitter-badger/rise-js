(function(global) {
    'use strict';

    /**
     * Factory method that returns new Rise.RQuery instance
     * @return {Rise.RQuery} Returns Rise.RQuery instance
     */
    global.Rise.$ = function() {
        return Rise.RQuery.apply(Object.create(Rise.RQuery.prototype), arguments);
    };

    global.Rise.RQuery = Rise.Class.extend({
        /**
         * Create new Rise.RQuery instance
         * @constructor
         * @param  {String|Rise.RQuery|Element|Array} selector Selector or exists Elements
         * @param  {Element|Document|Window} parent Parent from where selector will parse
         * @return {Rise.RQuery} Returns Rise.RQuery instance
         */
        init: function(selector, parent) {
            selector = selector || window;
            parent = parent || document;

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
         * @return {Array|Element} Returns Element with corresponding index
         */
        get: function(index) {
            return Rise.Util.isUndefined(index) ? this.elements : this.elements[index];
        },

        /**
         * Get elements count
         * @return {Integer} Returns count
         */
        count: function() {
            return (this.elements && this.elements.length) || 0;
        },

        /**
         * Iterate through all elements and call callback function
         * @param  {Function} cb Callback which called at each iteration cb(element, index, array)
         * @return {Rise.RQuery}
         */
        each: function(cb) {
            Array.prototype.forEach.call(this.get(), cb);
            return this;
        },

        /**
         * Get next sibling element
         * @return {Rise.RQuery} Returns next sibling element
         */
        next: function() {
            return new Rise.RQuery(this.get(0).nextElementSibling);
        },

        /**
         * Get previous sibling element
         * @return {Rise.RQuery} Returns previous sibling element from current element
         */
        prev: function() {
            return new Rise.RQuery(this.get(0).previousElementSibling);
        },

        /**
         * Get all siblings elements
         * @return {Rise.RQuery} Returns Rise.RQuery instance with all siblings elements
         */
        siblings: function() {
            var element = this.get(0);

            return new Rise.RQuery(Array.prototype.filter.call(element.parentNode.children, function(children) {
                return element !== children;
            }));
        },

        /**
         * Get Rise.RQuery object with parent node
         * @member Rise.RQuery
         * @return {Rise.RQuery} Returns parent node of element
         */
        parent: function() {
            return new Rise.RQuery(this.get(0).parentNode);
        },

        /**
         * Get all childrens of Element
         * @member Rise.RQuery
         * @return {Rise.RQuery} Return Rise.RQuery object with child nodes of this element
         */
        children: function() {
            return new Rise.RQuery(this.get(0).children);
        },

        /**
         * Check if element contains other element
         * @param {Rise.RQuery} child Child element which need check for existing in this element
         * @return {Boolean} True if contains
         */
        contains: function(child) {
            var element = this.get(0);
            return element !== child && element.contains(child);
        },

        /**
         * Get offset of element
         * @return {Object} Returns object with left, top properties
         */
        offset: function() {
            var boundingBox = this.getBoundingBox();

            return {
                left: boundingBox.left + document.body.scrollLeft,
                top: boundingBox.top + document.body.scrollTop
            };
        },

        /**
         * Get width of element including padding, border, content.
         * @member Rise.RQuery
         * @return {Integer} Returns offsetWidth of element
         */
        offsetWidth: function() {
            return this.get(0).offsetWidth;
        },

        /**
         * Get height of element including padding, border and content.
         * @member Rise.RQuery
         * @return {Integer} Returns offsetHeight of element
         */
        offsetHeight: function() {
            return this.get(0).offsetHeight;
        },

        /**
         * Get actual width of element including only padding
         * @member Rise.RQuery
         * @return {Integer} Returns clientWidth of element
         */
        clientWidth: function() {
            return this.get(0).clientWidth;
        },

        /**
         * Get actual height of element including only padding
         * @member Rise.RQuery
         * @return {Integer} Returns clientHeight of element
         */
        clientHeight: function() {
            return this.get(0).clientHeight;
        },

        /**
         * Get entire width of element with scrollbar content.
         * @member Rise.RQuery
         * @return {Integer} Returns scrollWidth of element
         */
        scrollWidth: function() {
            return this.get(0).scrollWidth;
        },

        /**
         * Get entire height of element with scrollbar content
         * @member Rise.RQuery
         * @return {Integer} Returns scrollHeight of element
         */
        scrollHeight: function() {
            return this.get(0).scrollHeight;
        },

        /**
         * Get offsetLeft of element
         * @member Rise.RQuery
         * @return {Integer} Returns offsetLeft of element
         */
        offsetLeft: function() {
            return this.get(0).offsetLeft;
        },

        /**
         * Get offsetTop of element
         * @member Rise.RQuery
         * @return {Integer} Returns offsetTop of element
         */
        offsetTop: function() {
            return this.get(0).offsetTop;
        },

        /**
         * Get position of element
         * @return {Object} Returns object with left, top properties
         */
        position: function() {
            return {
                left: this.offsetLeft(),
                top: this.offsetTop()
            };
        },

        /**
         * Focus at this element
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        focus: function() {
            this.get(0).focus();
            return this;
        },

        /**
         * Unfocus this element
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        blur: function() {
            this.get(0).blur();
            return this;
        },

        /**
         * Hide element
         * @return {Rise.RQuery}
         */
        hide: function() {
            return this.each(function(element) {
                element.style.display = 'none';
            });
        },

        /**
         * Show element
         * @return {Rise.RQuery}
         */
        show: function() {
            return this.each(function(element) {
                element.style.display = '';
            });
        },

        /**
         * Select only elements which checked with filter
         * @member Rise.RQuery
         * @param  {Function} cb If your function return true then element will be appended to resulting array
         * @return {Rise.RQuery} Returns Rise.RQuery objects with elements which only checked with filter.
         */
        filter: function(cb) {
            if (Rise.Util.getType(cb) == 'function') {
                return new Rise.RQuery(Array.prototype.filter.call(this.get(), cb));
            } else {
                Rise.Logger.warning('Rise.RQuery.filter() -> You must provide function');
            }
        },

        /**
         * Find elements by selector from this parent
         * @member Rise.RQuery
         * @param  {String} selector
         * @return {Rise.RQuery}
         */
        find: function(selector) {
            return new Rise.RQuery(selector, this.get(0));
        },

        /**
         * Set or get attribute value
         * @member Rise.RQuery
         * @param  {String|Object} options If string then get attribute value or Object if set attributes
         * @return {Rise.RQuery}
         */
        attr: function(options) {
            if (Rise.Util.getType(options) == 'string') {
                return this.get(0).getAttribute(options);
            } else if (Rise.Util.getType(options) == 'object') {
                Rise.Logger.startGroup('Rise.RQuery -> Setting attributes');
                this.each(function(element) {
                    for (var property in options) {
                        Rise.Logger.log('Set %s -> %s to %O element', property, options[property], element);
                        element.setAttribute(property, options[property]);
                    }
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Set or get css-rules
         * @member Rise.RQuery
         * @param  {String|Object} name String if you want get CSS-rule or Object for set CSS-rules
         * @param {String} pseudoElement If you want you can provide pseudoElement selector
         * @return {Rise.RQuery}
         * @example
         * Rise.RQuery('#someElement').css({
         *     width: 200
         * });
         * Rise.RQuery('#someElement').css('width', ':after');
         * Rise.RQuery('#someElement').css('width');
         */
        css: function(css, pseudoElement) {
            pseudoElement = pseudoElement || null;

            if (Rise.Util.getType(css) == 'string') {
                return window.getComputedStyle(this.get(0), pseudoElement).getPropertyValue(css);
            } else if (Rise.Util.getType(css) == 'object') {
                Rise.Logger.startGroup('Rise.RQuery -> Setting CSS');
                this.each(function(element) {
                    for (var property in css) {
                        Rise.Logger.log('Set %s -> %s to %O element', property, css[property], element);
                        if (css[property] === false) {
                            element.style.removeProperty(Rise.Util.getDashedString(property));
                        } else if (isNaN(css[property]) || cssNumbersMap.indexOf(property) != -1) {
                            element.style[Rise.Util.getCamelizedString(property)] = css[property];
                        } else {
                            element.style[Rise.Util.getCamelizedString(property)] = css[property] + 'px';
                        }
                    }
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Wrap matched elements with new Element
         * @param  {Rise.RQuery} html Rise.RQuery instance with HTML which will be a wrapper.
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         * @example
         * Rise.RQuery('div').wrap(Rise.RQuery.create('a')); // Wrap all div with a
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
         * Unwrap Element.
         * In other words remove parent node from Element.
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        unwrap: function() {
            return this.each(function(element) {
                element.parentNode.parentNode.replaceChild(element, element.parentNode);
            });
        },

        /**
         * Check if this element is matching selector.
         * @member Rise.RQuery
         * @param  {String} selector
         * @return {Boolean} Return true if all elements is match the selector and false otherwise
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
            } else {
                return false;
            }
        },

        /**
         * Add class name to elements
         * @member Rise.RQuery
         * @param {String} names Add class to elements
         * @return {Rise.RQuery}
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
         * Remove class name from elements
         * @member Rise.RQuery
         * @param  {String} names Remove class from elements
         * @return {Rise.RQuery}
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
         * Toggle class name for elements
         * @member Rise.RQuery
         * @param  {String} names Toggle class name for elements
         * @return {Rise.RQuery}
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
         * Check if elements have this class name
         * @member Rise.RQuery
         * @param  {String}  className Check if elements collection have this class name
         * @return {Boolean}
         */
        hasClass: function(name) {
            if (this.count() > 0) {
                return Array.prototype.every.call(this.get(), function(element) {
                    return element.classList.contains(name);
                });
            } else {
                return false;
            }
        },

        /**
         * Bind event to elements
         * @member Rise.RQuery
         * @param  {String|Object} eventType Event type. For example 'click' or 'dblclick'.
         * @param  {Function} handler Your function which you want execute on event.
         * @return {Rise.RQuery}
         */
        on: function(eventType, handler) {
            if (Rise.Util.getType(eventType) == 'object') {
                for (var property in eventType) {
                    this.on(property, eventType[property]);
                }
            } else {
                Rise.Logger.startGroup('Rise.RQuery -> Binding events');
                this.each(function(element) {
                    Rise.Logger.log('Binding event %s to %O', eventType, element);
                    element.addEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Unbind event to elements
         * @member Rise.RQuery
         * @param  {String} eventType Event type. For example 'click' or 'dblclick'.
         * @param  {Function} handler Your function which you want unsubscribe from event.
         * @return {Rise.RQuery}
         */
        off: function(eventType, handler) {
            if (Rise.Util.getType(eventType) == 'object') {
                for (var property in eventType) {
                    this.off(property, eventType[property]);
                }
            } else {
                Rise.Logger.startGroup('Rise.RQuery -> Unbinding events');
                this.each(function(element) {
                    Rise.Logger.log('Unbinding event %s from %O element', eventType, element);
                    element.removeEventListener(eventType, handler, false);
                });
                Rise.Logger.endGroup();
            }

            return this;
        },

        /**
         * Bind ready event
         * @param  {Function} cb
         * @return {Rise.RQuery}
         */
        ready: function(cb) {
            document.addEventListener('DOMContentLoaded', cb);
            return this;
        },

        /**
         * Trigger native event for element
         * @param  {String} eventName Name of event
         * @return {Rise.RQuery}
         */
        trigger: function(eventName) {
            var event = document.createEvent('HTMLEvents');

            event.initEvent(eventName, true, false);
            this.get(0).dispatch(event);

            return this;
        },

        /**
         * Bind live-event to this element
         * @member Rise.RQuery
         * @param  {String} eventType EventType name
         * @param  {Function} handler Handler for event
         * @return {Rise.RQuery}
         */
        live: function(eventType, handler) {
            var self = this,
                founded = false,
                target;

            document.addEventListener(eventType, function(event) {
                target = event.target;
                self.each(function(element) {
                    while (target && !(founded = element === target)) {
                        target = target.parentElement;
                    }

                    if (founded) {
                        handler.call(new Rise.RQuery(element), event);
                    }
                });
            });

            Rise.Logger.log('Binded live event %s to elements %O', eventType, this.get());

            return this;
        },

        /**
         * Remove elements from the DOM
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        remove: function() {
            return this.each(function(element) {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        },

        /**
         * Get or set HTML to Elements. If arguments not provided then returns exists HTML string.
         * @member Rise.RQuery
         * @param  {String|Rise.RQuery} [html] HTML-string
         * @return {Rise.RQuery|String}
         */
        html: function(html) {
            if (html) {
                return this.each(function(element) {
                    new Rise.RQuery(element).empty().append(html);
                });
            } else {
                return this.get(0).innerHTML;
            }
        },

        /**
         * Append HTML before element's end
         * @member Rise.RQuery
         * @param  {String|Rise.RQuery|Element} html You can send String or existing Element
         * @return {Rise.RQuery}
         */
        append: function(html) {
            if (Rise.Util.getType(html) == 'string') {
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
         * Prepend HTML after element's begin
         * @member Rise.RQuery
         * @param  {String|Rise.RQuery|Element} html You can send String or existing Element
         * @return {Rise.RQuery}
         */
        prepend: function(html) {
            if (Rise.Util.getType(html) == 'string') {
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
         * Set or get inner text. If text not provided then returns text.
         * @member Rise.RQuery
         * @param  {String} text Text which you want to set in elements
         * @return {Rise.RQuery|String}
         */
        text: function(text) {
            if (text) {
                return this.each(function(element) {
                    element.textContent = text;
                });
            } else {
                return this.get(0).textContent;
            }
        },

        /**
         * Remove all child nodes from elements
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        empty: function() {
            return this.each(function(element) {
                element.innerHTML = '';
            });
        },

        /**
         * Clone Element and return it
         * @member Rise.RQuery
         * @return {Rise.RQuery}
         */
        clone: function() {
            var clones = [];

            this.each(function(element) {
                clones.push(element.cloneNode(true));
            });

            return new Rise.RQuery(clones);
        },

        /**
         * Get bounding box of node
         * @member Rise.RQuery
         * @return {Object} Returns object with left, top, bottom, right, width, height properties
         */
        getBoundingBox: function() {
            var boundingBox = false,
                currentBoundingBox;

            this.each(function(node) {
                currentBoundingBox = node.getBoundingClientRect();
                boundingBox = boundingBox || Rise.Util.extend({}, currentBoundingBox);

                boundingBox.bottom = currentBoundingBox.bottom > (boundingBox.bottom || 0) ? currentBoundingBox.bottom : boundingBox.bottom;
                boundingBox.left = currentBoundingBox.left < (boundingBox.left || 0) ? currentBoundingBox.left : boundingBox.left;
                boundingBox.right = currentBoundingBox.right > (boundingBox.right || 0) ? currentBoundingBox.right : boundingBox.right;
                boundingBox.top = currentBoundingBox.top < (boundingBox.top || 0) ? currentBoundingBox.top : boundingBox.top;

                boundingBox.height = boundingBox.bottom - boundingBox.top;
                boundingBox.width = boundingBox.right - boundingBox.left;
            });

            return boundingBox;
        }
    }, {
        /**
         * Map of CSS attributes which have numbers at value
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
        ],

        create: function(tag) {
            Rise.Logger.log('Creating new Element "%s"', tag);
            return new Rise.RQuery(document.createElement(tag));
        }
    });
})(this);