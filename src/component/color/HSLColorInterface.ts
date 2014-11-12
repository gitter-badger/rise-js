module Rise.Color {
    export interface HSLColorObjectInterface {
        hue:number;
        saturation:number;
        lightness:number;
        alpha:number;
    }

    export interface HSLColorInterface extends Rise.Color.HSLColorObjectInterface {
        toHslObject():Rise.Color.HSLColorObjectInterface;
        toHslString():string;
    }
}