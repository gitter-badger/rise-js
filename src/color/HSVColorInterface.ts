module Rise.Color {
    export interface HSVColorObjectInterface {
        hue:number;
        saturation:number;
        value:number;
        alpha:number;
    }

    export interface HSVColorInterface extends Rise.Color.HSVColorObjectInterface {
        toHsvObject():Rise.Color.HSVColorObjectInterface;
        toHsvString():string;
    }
}