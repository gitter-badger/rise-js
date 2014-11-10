module Rise.Element {
    export class BaseElement {
        private _name:string = 'Basic';
        private _node:any;

        constructor() {
            //this.setNode(Rise.$.create('span').text('Basic Element'));
        }

        get name() {
            return this._name;
        }

        set name(name:string) {
            this._name = name;
        }

        get node() {
            return this._node;
        }

        set node(node:any) {
            this._node = node;
        }

        remove() {
            this._node.remove();
        }
    }
}
