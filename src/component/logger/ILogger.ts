module Rise.Logger {
    export interface ILogger {
        level:Rise.Logger.Level;
        verbose(message:string):void;
        error(message:string):void;
        warning(message:string):void;
        info(message:string):void;
        log(message:string):void;
    }
}