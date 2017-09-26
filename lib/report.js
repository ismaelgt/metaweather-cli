'use strict'
const chalk = require('chalk')
const fecha = require('fecha')
const ansiEscapes = require('ansi-escapes')
const ansiSymbols = require('./ansi-symbols')
const log = console.log

const getFormattedDate = (date) => {
  const parsedDate = fecha.parse(date, 'YYYY-MM-DD')
  return fecha.format(parsedDate, 'ddd DD MMM')
}

const getFormattedTemp = (temp) => {
  const coloredTemp = ansiSymbols.getColoredTemp(Math.round(temp))
  return `${coloredTemp} ºC`
}

const getFormattedWind = (direction, speed) => {
  const arrow = ansiSymbols.getWindArrow(direction)
  const speedKmh = Math.round(speed * 1.60934)
  const coloredSpeed = ansiSymbols.getColoredWindSpeed(speedKmh)

  return `${arrow} ${coloredSpeed} km/h`
}

const printDayReport = (weather) => {
  const report =
    ansiSymbols.reportFrame +
    ansiEscapes.cursorSavePosition +
    // Date
    ansiEscapes.cursorMove(11, -8) +
    getFormattedDate(weather.applicable_date) +
    ansiEscapes.cursorRestorePosition +
    // Weather symbol
    ansiEscapes.cursorMove(2, -6) +
    ansiSymbols.getWeatherIcon(weather.weather_state_abbr) +
    ansiEscapes.cursorRestorePosition +
    // State name
    ansiEscapes.cursorMove(16, -6) +
    chalk.yellow(weather.weather_state_name) +
    ansiEscapes.cursorRestorePosition +
    // Max temp
    ansiEscapes.cursorMove(16, -5) +
    'Max: ' + getFormattedTemp(weather.max_temp) +
    ansiEscapes.cursorRestorePosition +
    // Min temp
    ansiEscapes.cursorMove(16, -4) +
    'Min: ' + getFormattedTemp(weather.min_temp) +
    ansiEscapes.cursorRestorePosition +
    // Wind
    ansiEscapes.cursorMove(16, -3) +
    getFormattedWind(weather.wind_direction_compass, weather.wind_speed) +
    ansiEscapes.cursorRestorePosition +
    // Humidity
    ansiEscapes.cursorMove(16, -2) +
    'Humidity: ' + weather.humidity + '%' +
    ansiEscapes.cursorRestorePosition
  log(report)
}

module.exports = {
  printDayReport
}
