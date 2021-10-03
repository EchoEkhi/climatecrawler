const axios = require('axios')
const cheerio = require('cheerio')
const log = require('../logger')

async function defra() {

    const yesterday = new Date(Date.now() - 864e5)
    const queryID = 10800 // what the fuck?
    const month = yesterday.toISOString().split('-')[1]

    log.info('[defra] Setting up session for Stert Street')

    // step 1
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_region_reference_id=5&f_parameter_id%5B%5D=9999&f_preset_date=2&f_date_started=${yesterday.getDate()}%2F${month}%2F${yesterday.getFullYear()}&f_date_ended=${yesterday.getDate()}%2F${month}%2F${yesterday.getFullYear()}&f_group_id=&f_query_id=${queryID}&action=da_3&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46&go=Step+2`)
    // step 2
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_sub_region_id%5B%5D=290&f_query_id=${queryID}&f_group_id=&action=da_5&go=Step+3+&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)
    // step 3
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_query_id=${queryID}&f_site_id%5B%5D=AB001&f_output=screen&go=Step+4+&action=da_6&f_group_id=&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)
    // final step
    let $ = cheerio.load((await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_query_id=${queryID}&action=da_7&f_group_id=&go=Get+Data&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)).data)

    log.info('[defra] Loaded final page data')

    const stertStreet = $('tr')[19].childNodes[5].firstChild.data

    log.info('[defra] Setting up session for High Street')

    // step 1
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_region_reference_id=5&f_parameter_id%5B%5D=9999&f_preset_date=2&f_date_started=${yesterday.getDate()}%2F${month}%2F${yesterday.getFullYear()}&f_date_ended=${yesterday.getDate()}%2F${month}%2F${yesterday.getFullYear()}&f_group_id=&f_query_id=${queryID}&action=da_3&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46&go=Step+2`)
    // step 2
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_sub_region_id%5B%5D=193&f_query_id=${queryID}&f_group_id=&action=da_5&go=Step+3+&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)
    // step 3
    await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_query_id=${queryID}&f_site_id%5B%5D=OX6&f_output=screen&go=Step+4+&action=da_6&f_group_id=&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)
    // final step
    $ = cheerio.load((await axios.post('https://uk-air.defra.gov.uk/data/datawarehouse', `f_query_id=${queryID}&action=da_7&f_group_id=&go=Get+Data&uksid=e880e788c4b7903722af846fb29d0868dbfd6a46`)).data)
    log.info('[defra] Loaded final page data')

    const highStreet = $('tr')[19].childNodes[5].firstChild.data
    const pm10at18 = $('tr')[19].childNodes[9].firstChild.data

    log.info('[defra] Complete')

    return {
        stertStreet,
        highStreet,
        pm10at18
    }

}

module.exports = defra()