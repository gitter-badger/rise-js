module Rise.Logger {
    export class ConsoleLogger extends Rise.Logger.BaseLogger implements Rise.Logger.IAdvancedLogger {
        verbose(message:string):void {
        }

        error(message:string):void {
        }

        warning(message:string):void {
        }

        info(message:string):void {
        }

        log(message:string):void {
        }
    }
}

// TODO: make normal message printing
//(function printWelcomeMessage() {
//    if (navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
//        console.log.apply(console, [
//            '%c %c %c Rise v' + Rise.getVersion() + ' %c %c %c',
//            'background: #0E173E; font-size: 8pt;',
//            'background: #020C25; font-size: 9pt;',
//            'color: #FFFFFF; background: #0D0B0E; font-size: 10pt',
//            'background: #020C25; font-size: 9pt;',
//            'background: #0E173E; font-size: 8pt;',
//            'background: #0E173E; font-size: 8pt;'
//        ]);
//    } else {
//        console.log('Rise v' + Rise.getVersion());
//    }
//})();