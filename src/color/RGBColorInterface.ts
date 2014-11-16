module Rise.Color {
    export interface RGBColorObjectInterface {
        red:number;
        green:number;
        blue:number;
        alpha:number;
    }

    export interface RGBColorInterface extends Rise.Color.RGBColorObjectInterface {
        toRgbObject():Rise.Color.RGBColorObjectInterface;
        toRgbString():string;
    }
}