const winston = require('winston')

const log = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `[${level}]\t[${timestamp}]\t${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
})

winston.add(log)

module.exports = log