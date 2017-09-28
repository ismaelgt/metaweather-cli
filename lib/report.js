'use strict'
const chalk = require('chalk')
const fecha = require('fecha')
const ansiEscapes = require('ansi-escapes')
const ansiSymbols = require('./ansi-symbols')
const wrapAnsi = require('wrap-ansi')

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

const getDayWeatherReport = (weather, column) => {
  const xOffset = (32 * column) - column

  return (
    // Date
    ansiEscapes.cursorMove(xOffset + 11, 0) +
    getFormattedDate(weather.applicable_date) +
    ansiEscapes.cursorNextLine +
    // Weather symbol
    ansiEscapes.cursorMove(xOffset + 2, 1) +
    ansiSymbols.getWeatherIcon(weather.weather_state_abbr) +
    ansiEscapes.cursorNextLine +
    // State name
    ansiEscapes.cursorMove(xOffset + 16, -5) +
    chalk.yellow(weather.weather_state_name) +
    ansiEscapes.cursorNextLine +
    // Max temp
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    'Max: ' + getFormattedTemp(weather.max_temp) +
    ansiEscapes.cursorNextLine +
    // Min temp
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    'Min: ' + getFormattedTemp(weather.min_temp) +
    ansiEscapes.cursorNextLine +
    // Wind
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    getFormattedWind(weather.wind_direction_compass, weather.wind_speed) +
    ansiEscapes.cursorNextLine +
    // Humidity
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    'Humidity: ' + weather.humidity + '%' +
    ansiEscapes.cursorNextLine +
    (column !== 2 ? ansiEscapes.cursorUp(7) : ansiEscapes.cursorDown(1))
  )
}

const getSixDayWeatherReport = (weather) => {
  let report = ansiSymbols.reportFrame +
    ansiEscapes.cursorMove(0, -16)
  for (let i = 0; i < 6 && i < weather.length; ++i) {
    report += getDayWeatherReport(weather[i], i % 3)
  }
  return report
}

const getSourcesReport = (sources) => {
  const sourceTitles = sources.map(source => source.title).join(', ')
  const str = chalk.bold('Sources: ') + chalk.cyan(sourceTitles)
  return wrapAnsi(str, 94)
}

module.exports = {
  getSixDayWeatherReport,
  getSourcesReport
}
