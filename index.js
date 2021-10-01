const log = require('./logger')

function getDateString() {

    const yesterday = new Date(Date.now() - 864e5)

    return `${yesterday.getDate()}/${yesterday.getMonth() + 1}/${yesterday.getYear().toString()
        .slice(1)}`

}

async function main() {

    log.info('-------- Begin New Cycle --------')
    log.info(`[main] Starting crawl for ${new Date(Date.now() - 864e5).toISOString()
        .split('T')[0]}`)

    // initialise data object
    let data = {
        date: getDateString(),
        time: '18:00'
    }

    // gather data from https://wow.metoffice.gov.uk/
    data = { ...data, ...await require('./crawlers/met') }

    // gather data from https://uk-air.defra.gov.uk/data/
    data = { ...data, ...await require('./crawlers/defra') }

    // gather data from http://scampa.herokuapp.com/
    data = { ...data, ...await require('./crawlers/scampa') }

    log.info('[main] Crawl complete')
    log.info(JSON.stringify(data))

    // insert data into https://docs.google.com/spreadsheets/d/10gxzHEYtfkr9U913lN4Tsoe2HetMBB_MQ10NaUF5-o0/
    await require('./sheets')(data)

    log.info('[main] All completed')

}

main()