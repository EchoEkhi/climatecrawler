const winston = require('winston')
require('winston-daily-rotate-file')

const log = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `[${level}]\t[${timestamp}]\t${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: __dirname + '/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: __dirname + '/logs/warn.log', level: 'warn' }),
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.DailyRotateFile({
            filename: __dirname + '/logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '7d'
        })
    ]
})

winston.add(log)

module.exports = log