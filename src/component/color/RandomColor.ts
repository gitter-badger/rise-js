module Rise.Color {
    export function random():Rise.Color.RGBColor {
        return new Rise.Color.RGBColor({
            red: Math.random() * 255,
            green: Math.random() * 255,
            blue: Math.random() * 255
        });
    }
}