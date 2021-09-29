const { GoogleSpreadsheet } = require('google-spreadsheet')
const log = require('./logger')

async function sheet(data) {

    const doc = new GoogleSpreadsheet('10gxzHEYtfkr9U913lN4Tsoe2HetMBB_MQ10NaUF5-o0')

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication    
    const creds = require('./creds.json');
    await doc.useServiceAccountAuth(creds);

    log.info('[sheets] Authenticated')

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]

    await sheet.addRow([data.date, data.time, data.temperature, data.humidity, data.windDirection, data.windSpeed, '', data.stertStreet, data.highStreet, data.pm2p5at16, data.pm2p5at17, data.pm10at16, data.pm10at17, data.pm10at12])
    log.info('[sheets] Data added')

}

module.exports = sheet