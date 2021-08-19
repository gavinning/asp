import color from 'colors'
import { prettyPrint } from '@base2/pretty-print-object'

const level = Number(process.env.Level || 5)

enum Level {
    error,
    warn,
    debug,
    info,
    log,
    gray,
}

enum Color {
    error = 'red',
    warn = 'yellow',
    debug = 'cyan',
    info = 'green',
    log = 'white',
    gray = 'gray',
}

enum Method {
    error = 'error',
    warn = 'warn',
    debug = 'debug',
    info = 'info',
    log = 'log',
    gray = 'log',
}

enum Logger {
    error = 'error',
    warn = 'warn',
    debug = 'debug',
    info = 'info',
    log = 'log',
    gray = 'gray',
}

interface Options {
    pretty: boolean
}

export class Asp {
    // Once pretty
    private $pretty: boolean = false
    private readonly option: Options

    constructor(options: Options = { pretty: false }) {
        this.option = options
    }

    pretty() {
        this.$pretty = true
        return this
    }

    gray() {
        this.print(Logger.gray, arguments)
    }

    log() {
        this.print(Logger.log, arguments)
    }

    info() {
        this.print(Logger.info, arguments)
    }

    debug() {
        this.print(Logger.debug, arguments)
    }

    warn() {
        this.print(Logger.warn, arguments)
    }

    error() {
        this.print(Logger.error, arguments)
    }

    private print(type: Logger, args: IArguments) {
        level < Level[type] ||
            console[Method[type]](
                this.prefix(),
                ...this.stringify(args).map(item => color[Color[type]](item))
            )
        this.$pretty = false
    }

    private prefix() {
        return color.gray(`[${this.timestamp()}]`)
    }

    private stringify(args: IArguments | any[]) {
        return Array.from(args).map(obj => this.pretter(obj))
    }

    private pretter(obj: any) {
        if (!this.option.pretty && !this.$pretty) {
            return obj
        }
        return ['string'].includes(typeof obj)
            ? obj
            : prettyPrint(obj, {
                  indent: '  ',
                  singleQuotes: true,
              })
    }

    private timestamp() {
        const date = new Date()
        return new Date(Date.now() - date.getTimezoneOffset() * 60000)
            .toJSON()
            .slice(0, 19)
            .replace('T', ' ')
    }
}

export const asp = new Asp()
export default asp
