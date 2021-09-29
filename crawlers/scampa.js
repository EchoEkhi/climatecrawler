const axios = require('axios')
const cheerio = require('cheerio')
const log = require('../logger')

async function scampa() {

    const yesterday = new Date(Date.now() - 864e5);
    const dateString = yesterday.toISOString().split('T')[0]

    log.info('[scampa] Loading page')
    $ = cheerio.load((await axios.get(`http://scampa.herokuapp.com/${dateString}/smooth`)).data)
    log.info('[scampa] Loaded page')

    const rawScript = $('script')[3].children[0].data

    // find the line containing "          label: "Abingdon School","
    const lines = rawScript.split('\n')
    let baseIndex = lines.indexOf('          label: "Abingdon School",')

    const pm10at17 = lines[baseIndex + 39].trim().replace(',', '')
    const pm10at16 = lines[baseIndex + 37].trim().replace(',', '')

    // find the line containing "          label: "Sensor 48673","
    baseIndex = lines.indexOf('          label: "Sensor 48673",')

    const pm10at12 = lines[baseIndex + 37].trim().replace(',', '')

    // find the line containing "          label: "Abingdon School","
    baseIndex = lines.indexOf('          label: "Abingdon School",', baseIndex)
    const pm2p5at17 = lines[baseIndex + 39].trim().replace(',', '')
    const pm2p5at16 = lines[baseIndex + 37].trim().replace(',', '')

    log.info('[scampa] Complete')

    return {
        pm10at12,
        pm10at16,
        pm10at17,
        pm2p5at16,
        pm2p5at17
    }

}

module.exports = scampa()