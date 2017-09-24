'use strict'
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const geoIp = require('./geoip')
const metaweather = require('./metaweather')
const symbols = require('./symbols')
const log = console.log

const init = () => {
  const spinner = ora('Locating you...').start()

  geoIp.getLocation()
    .then(location => {
      return metaweather.getLocations(location.latitude, location.longitude)
    })
    .then(locations => {
      spinner.stop()
      const choices = locations.map(location => ({
        value: location,
        name: location.title
      }))

      return inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Select location:',
        choices
      }])
    })
    .then(location => {
      spinner.text = 'Getting the weather for ' + location.option.title + '...'
      spinner.start()
      return metaweather.getWeather(location.option.woeid)
    })
    .then(weather => {
      const today = weather[0]
      spinner.stop()
      log(chalk.yellow('MetaWeather report: '))
      log(today.weather_state_name)
      log(symbols.getSymbol(today.weather_state_abbr))
    })
    .catch(err => {
      spinner.fail(err)
    })
}

module.exports = init
