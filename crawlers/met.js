const axios = require('axios')
const log = require('../logger')

async function met() {

    // get current date in YYYY-MM-DD form
    const yesterday = new Date(Date.now() - 864e5);
    const dateString = yesterday.toISOString().split('T')[0]

    log.info('[met] Requesting data from MET Office')
    // request data from the MET Office
    let raw = await axios.get(`https://wow.metoffice.gov.uk/observations/details/tableviewdata/ece3a811-b829-eb11-8441-0003ff59786b/details/${dateString}?startAt=0&hours=23:59:59&firstDate=${dateString}&lastDate=${dateString}&fields=WindDirection,WindSpeed_Knot,DryBulbTemperature_Celsius,RelativeHumidity&impacts=&hazards=&timezone=Europe/London`)
    // find the 18:00:00 data we need
    const observations = raw.data.Observations
    log.info(`[met] Received ${observations.length} weather entries`)
    // get list of time differences
    let timeDifferences = []

    // get the value of time difference between 18:00:00 that day and the time of record
    for (observation of observations) timeDifferences.push(Math.abs(new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 18, 0, 0) - new Date(observation.ReportStartDateTime)))

    // find the minimum value and let data be that record
    let data = observations[timeDifferences.indexOf(Math.min.apply(Math, timeDifferences))]

    log.info('[met] Complete')

    return {
        temperature: data.dryBulbTemperature_Celsius,
        humidity: data.relativeHumidity,
        windDirection: data.windDirection, // in bearing
        windSpeed: data.windSpeed_MetrePerSecond * 1.94 // in knots
    }

}

module.exports = met()