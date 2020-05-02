const color = require('colors')
const level = Number(process.env.level || 5)

const levels = {
    error: 0,
    warn: 1,
    debug: 2,
    info: 3,
    log: 4,
    gray: 5,
}

function timestamp() {
    const date = new Date()
    return new Date(Date.now() - date.getTimezoneOffset() * 60000).toJSON().slice(0, 19).replace('T', ' ')
}

function prefix(type) {
    return color.gray(
        type ? `[${timestamp()}][${type.slice(0,1).toUpperCase()}]` : `[${timestamp()}]`
    )
}

function print({ type, logType, colorType, method, args }) {
    level < levels[logType] || console[method](
        prefix(type ? logType : null), color[colorType](...args)
    )
}

class Asp {
    constructor(type) {
        this.type = type
    }

    gray() {
        print({
            type: this.type,
            logType: 'gray',
            colorType: 'gray',
            method: 'log',
            args: arguments
        })
    }

    log() {
        print({
            type: this.type,
            logType: 'log',
            colorType: 'white',
            method: 'log',
            args: arguments
        })
    }

    info() {
        print({
            type: this.type,
            logType: 'info',
            colorType: 'green',
            method: 'info',
            args: arguments
        })
    }

    debug() {
        print({
            type: this.type,
            logType: 'debug',
            colorType: 'cyan',
            method: 'debug',
            args: arguments
        })
    }

    warn() {
        print({
            type: this.type,
            logType: 'warn',
            colorType: 'yellow',
            method: 'warn',
            args: arguments
        })
    }

    error() {
        print({
            type: this.type,
            logType: 'error',
            colorType: 'red',
            method: 'error',
            args: arguments
        })
    }
}

const asp = new Asp()
asp.Asp = Asp

module.exports = asp
