'use strict'
const chalk = require('chalk')
const symbols = require('./symbols')
const log = console.log

const printDayReport = (weather) => {
  log(chalk.yellow('MetaWeather report: '))
  log(weather.weather_state_name)
  log(symbols.getSymbol(weather.weather_state_abbr))
}

module.exports = {
  printDayReport
}
