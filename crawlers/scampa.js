const axios = require('axios')
const cheerio = require('cheerio')
const log = require('../logger')

async function scampa() {

    // TODO: migrate this to use the CSV API from sensor.community

    const yesterday = new Date(Date.now() - 864e5)
    const dateString = yesterday.toISOString().split('T')[0]

    log.info('[scampa] Loading page')
    const $ = cheerio.load((await axios.get(`http://scampa.herokuapp.com/${dateString}/smooth`)).data)

    log.info('[scampa] Loaded page')

    const rawScript = $('script')[3].children[0].data

    // find the line containing "          label: "Abingdon School","
    const lines = rawScript.split('\n')
    let baseIndex = lines.indexOf('          label: "Abingdon School",')

    const pm10at18 = lines[baseIndex + 41].trim().replace(',', '')
    const pm10at16 = lines[baseIndex + 37].trim().replace(',', '')

    // find the line containing "          label: "Abingdon School","
    baseIndex = lines.indexOf('          label: "Abingdon School",', baseIndex)
    const pm2p5at18 = lines[baseIndex + 41].trim().replace(',', '')
    const pm2p5at16 = lines[baseIndex + 37].trim().replace(',', '')

    log.info('[scampa] Complete')

    return {
        pm10at16,
        pm10at18,
        pm2p5at16,
        pm2p5at18
    }

}

module.exports = scampa()