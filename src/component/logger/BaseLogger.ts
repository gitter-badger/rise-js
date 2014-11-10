module Rise.Logger {
    export class BaseLogger {
        private _level:Rise.Logger.LogLevel;

        constructor(level:Rise.Logger.LogLevel) {
            this.level = level;
        }

        get level() {
            return this._level;
        }

        set level(level:Rise.Logger.LogLevel) {
            this._level = level;
        }
    }
}