import { createLogger, format, transports } from "winston";

// custom log display format
const customFormat = format.printf(({timestamp, level, stack, message}) => {
    if (stack) {
        return `${timestamp} - [${level}] - ${message}${stack}`
    }

    return `${timestamp} - [${level}] - ${message}`
})

const options = {
    file: {
        filename: 'log/error.log',
        level: 'error'
    },
    console: {
        level: 'silly'
    }
}

// for development environment
const devLogger = {
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({stack: true}),
        format.splat(),
        format.simple(),
        customFormat
    ),
    transports: [new transports.Console(options.console)]   
}

// for production environment
const prodLogger = {
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({stack: true}),
        format.splat(),
        format.simple(),
        customFormat
    ),
    transports: [
        new transports.File({
            filename: 'log/combine.log',
            level: 'info'
        }),
        new transports.File({
            filename: 'log/error.log',
            level: 'error'
        })        
    ]
}

// export log instance based on the current environment
const instanceLogger = (process.env.NODE_ENV === 'production') ? prodLogger : devLogger

export const instance = createLogger(instanceLogger)