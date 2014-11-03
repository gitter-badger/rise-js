//TODO: make normal
module Rise {
    var cssNumbersMap:Array<String> = [
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
    ];

    export class RQuery {
        private _elements:Array<Element>;

        constructor(selector:RQuery) {
            return selector;
        }

        constructor(selector:Array<Element>);
        constructor(selector:HTMLCollection);
        constructor(selector:NodeList) {
            Array.prototype.forEach.call(selector, (element) => {
                this._elements.push(element);
            });
        }

        constructor(selector:Element) {
            this._elements[0] = selector;
        }

        constructor(selector = window, parent = document) {
            Array.prototype.forEach.call(parent.querySelectorAll(selector), (element) => {
                this._elements.push(element);
            });
        }

        get(index?:number) {
            if (index) {
                return this._elements[index];
            } else {
                return this._elements;
            }
        }

        count() {
            return (this._elements && this._elements.length) || 0;
        }

        each(cb:Function) {
            Array.prototype.forEach.call(this.get(), cb);
            return this;
        }

        parent() {
            return new Rise.RQuery(this.get(0).parentNode);
        }

        children() {
            return new Rise.RQuery(this.get(0).children);
        }

        contains(child:RQuery) {
            child = child.get(0);

            var element = this.get(0);

            return element !== child && element.contains(child);
        }

        offsetWidth() {
            return this.get(0).offsetWidth;
        }

        offsetHeight() {
            return this.get(0).offsetHeight;
        }

        offsetLeft() {
            return this.get(0).offsetLeft;
        }

        offsetTop() {
            return this.get(0).offsetTop;
        }

        focus() {
            this.get(0).focus();
            return this;
        }

        blur() {
            this.get(0).blur();
            return this;
        }

        filter(cb:Function) {
            return new Rise.RQuery(Array.prototype.filter.call(this.get(), cb));
        }

        find(selector:String) {
            return new Rise.RQuery(selector, this.get(0));
        }

        attr(attr:String) {
            return this.get(0).getAttribute(attr);
        }

        attr(attr:Object) {
            this.each((element) => {
                Object.keys(attr).forEach(function (key) {
                    if (attr[key] === false) {
                        element.removeAttribute(key);
                    } else {
                        element.setAttribute(key, attr[key]);
                    }
                });
            });
        }

        css(css:String, pseudoElement:String = null) {
            return window.getComputedStyle(this.get(0), pseudoElement).getPropertyValue(Rise.Util.toDashedString(css));
        }

        css(css:Object) {
            this.each((element) => {
                Object.keys(css).forEach(function (key) {
                    if (css[key] === false) {
                        element.style.removeProperty(Rise.Util.toDashedString(key));
                    } else if (isNaN(css[key]) || cssNumbersMap.indexOf(key) !== -1) {
                        element.style[Rise.Util.toCamelizedString(key)] = css[key];
                    } else {
                        element.style[Rise.Util.toCamelizedString(key)] = css[key] + 'px';
                    }
                });
            });
        }

        wrap(html:RQuery) {
            var wrapper;

            return this.each((element) => {
                wrapper = html.clone();
                element.parentNode.insertBefore(wrapper.get(0), element);
                wrapper.append(element);
            });
        }

        unwrap() {
            return this.each((element) => {
                element.parentNode.parentNode.replaceChild(element, element.parentNode);
            });
        }

        is(selector:String) {
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
        }

        addClass(classNames:String) {
            var names:Array = classNames.split(/[ ]+/);

            return this.each((element) => {
                names.forEach((className) => {
                    element.classList.add(className);
                });
            });
        }

        removeClass(classNames:String) {
            var names:Array = classNames.split(/[ ]+/);

            return this.each((element) => {
                names.forEach(function (className) {
                    element.classList.remove(className);
                });
            });
        }

        toggleClass(classNames:String) {
            var names:Array = classNames.split(/[ ]+/);

            return this.each((element) => {
                names.forEach(function (className) {
                    element.classList.toggle(className);
                });
            });
        }

        hasClass(className:String) {
            if (this.count() > 0) {
                return Array.prototype.every.call(this.get(), (element) => {
                    return element.classList.contains(name);
                });
            }

            return false;
        }

        on(handlers:Object) {
            Object.keys(handlers).forEach((key) => {
                this.on(key, handlers[key]);
            });
        }

        on(eventType:String, handler:Function) {
            this.each((element) => {
                element.addEventListener(eventType, handler, false);
            });
        }

        off(handlers:Object) {
            Object.keys(handlers).forEach(function (key) {
                this.off(key, handlers[key]);
            });
        }

        off(eventType:String, handler:Function) {
            this.each((element) => {
                element.removeEventListener(eventType, handler, false);
            });
        }

        triggerMouseEvent(eventName:String) {
            var event = document.createEvent('MouseEvents'),
                element = this.get(0);

            event.initMouseEvent(eventName, true, false, window, null, null, null, null, null, false, false, false, false, null, null);
            element.dispatchEvent(event);

            return this;
        }

        remove() {
            return this.each((element) => {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        }

        html() {
            return this.get(0).innerHTML;
        }

        html(html:String) {
            return this.each((element) => {
                new Rise.RQuery(element).empty().append(html);
            });
        }

        append(html:String) {
            this.each((element) => {
                element.insertAdjacentHTML('beforeend', html);
            });
        }

        append(html:RQuery) {
            this.each((element) => {
                element.appendChild(html.get(0));
            });
        }

        prepend(html:String) {
            this.each((element) => {
                element.insertAdjacentHTML('afterbegin', html);
            });
        }

        prepend(html:RQuery) {
            this.each((element) => {
                element.insertBefore(html.get(0), element.firstChild);
            });
        }

        text() {
            return this.get(0).textContent;
        }

        text(text:String) {
            return this.each((element) => {
                element.textContent = text;
            });
        }

        empty() {
            return this.each((element) => {
                element.innerHTML = '';
            });
        }

        clone() {
            var clones = [];

            this.each((element) => {
                clones.push(element.cloneNode(true));
            });

            return new Rise.RQuery(clones);
        }
    }
}