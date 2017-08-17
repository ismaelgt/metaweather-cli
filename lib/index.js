'use strict'
const chalk = require('chalk')
const ora = require('ora')
const geoIp = require('./geoip')
const metaweather = require('./metaweather')
const symbols = require('./symbols')
const log = console.log

function init () {
  const spinner = ora('Locating you...').start()
  let locationName

  geoIp.getLocation()
    .then(location => {
      return metaweather.getLocation(location.latitude, location.longitude)
    })
    .then(location => {
      locationName = location.title
      spinner.text = 'Getting the weather for ' + locationName + '...'
      return metaweather.getWeather(location.woeid)
    })
    .then(weather => {
      const today = weather[0]
      spinner.stop()
      log(chalk.yellow('MetaWeather report: ' + locationName))
      log(today.weather_state_name)
      log(symbols.getSymbol(today.weather_state_abbr))
    })
    .catch(err => {
      spinner.fail(err)
    })
}

module.exports = init
