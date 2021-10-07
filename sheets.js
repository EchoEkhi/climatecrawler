const { GoogleSpreadsheet } = require('google-spreadsheet')
const log = require('./logger')

async function sheets(data) {

    const doc = new GoogleSpreadsheet('10gxzHEYtfkr9U913lN4Tsoe2HetMBB_MQ10NaUF5-o0')

    // initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    const creds = require('./creds.json')

    log.info('[sheets] Authenticating')

    await doc.useServiceAccountAuth(creds)

    log.info('[sheets] Authenticated')

    await doc.loadInfo() // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]

    await sheet.addRow([data.date, data.time, data.temperature, data.humidity, data.windDirection, data.windSpeed, '', data.stertStreet, data.highStreet, data.pm2p5at16, data.pm2p5at18, data.pm10at16, data.pm10at18, data.defrapm10at18])
    log.info('[sheets] Data added')

}

module.exports = sheets