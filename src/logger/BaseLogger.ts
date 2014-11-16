module Rise.Logger {
    export class BaseLogger {
        private _level:Rise.Logger.Level;

        constructor(level:Rise.Logger.Level) {
            this.level = level;
        }

        get level() {
            return this._level;
        }

        set level(level:Rise.Logger.Level) {
            this._level = level;
        }

        public getLevel():Rise.Logger.Level {
            return this.level;
        }

        public setLevel(level:Rise.Logger.Level) {
            this.level = level;
        }

        public isAllowedLevel(level:Rise.Logger.Level):boolean {
            return level >= this.level;
        }
    }
}