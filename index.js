'use strict'
const got = require('got')
const chalk = require('chalk')

const METAWEATHER_URL = 'http://www.metaweather.com/api/'
const GEOIP_URL = 'https://freegeoip.net/json/'
const HTTP_REQUEST_OPTIONS = {
  json: true
}

function init () {
  let city

  got(GEOIP_URL, HTTP_REQUEST_OPTIONS)
    .then(response => {
      const latLng = `${response.body.latitude},${response.body.longitude}`
      return got(`${METAWEATHER_URL}location/search/?lattlong=${latLng}`,
        HTTP_REQUEST_OPTIONS)
    })
    .then(response => {
      const woeid = response.body[0].woeid
      city = response.body[0].title
      return got(`${METAWEATHER_URL}location/${woeid}/`,
        HTTP_REQUEST_OPTIONS)
    })
    .then(response => {
      console.log(chalk.yellow('Weather report: ' + city))
      console.log(response.body.consolidated_weather[0])
    })
    .catch(err => console.log('Something bad happened.'))
}

module.exports = init
