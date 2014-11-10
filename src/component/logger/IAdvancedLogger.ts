module Rise.Logger {
    export interface IAdvancedLogger extends Rise.Logger.IBaseLogger {
        level:Rise.Logger.LogLevel;
        verbose(message:string):void;
        error(message:string):void;
        warning(message:string):void;
        info(message:string):void;
    }
}