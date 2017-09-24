'use strict'
const ora = require('ora')
const geoIp = require('./geoip')
const metaweather = require('./metaweather')
const report = require('./report')

const init = () => {
  const spinner = ora('Locating you...')

  geoIp.getLocation()
    .then(location => {
      spinner.start()
      return metaweather.getLocations(location.latitude, location.longitude)
    })
    .then(locations => {
      spinner.stop()
      return metaweather.promptLocationSelection(locations)
    })
    .then(location => {
      spinner.text = 'Getting the weather for ' + location.option.title + '...'
      spinner.start()
      return metaweather.getWeather(location.option.woeid)
    })
    .then(weather => {
      spinner.stop()
      report.printDayReport(weather[0])
    })
    .catch(err => {
      spinner.fail(err)
    })
}

module.exports = init
