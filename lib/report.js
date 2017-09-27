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

const getDayWeatherReport = (weather, row, col) => {
  const xOffset = (32 * col) - col
  const yOffset = row === 0 ? -8 : 0

  return (
    // Date
    ansiEscapes.cursorMove(xOffset + 11, yOffset - 8) +
    getFormattedDate(weather.applicable_date) +
    ansiEscapes.cursorRestorePosition +
    // Weather symbol
    ansiEscapes.cursorMove(xOffset + 2, yOffset - 6) +
    ansiSymbols.getWeatherIcon(weather.weather_state_abbr) +
    ansiEscapes.cursorRestorePosition +
    // State name
    ansiEscapes.cursorMove(xOffset + 16, yOffset - 6) +
    chalk.yellow(weather.weather_state_name) +
    ansiEscapes.cursorRestorePosition +
    // Max temp
    ansiEscapes.cursorMove(xOffset + 16, yOffset - 5) +
    'Max: ' + getFormattedTemp(weather.max_temp) +
    ansiEscapes.cursorRestorePosition +
    // Min temp
    ansiEscapes.cursorMove(xOffset + 16, yOffset - 4) +
    'Min: ' + getFormattedTemp(weather.min_temp) +
    ansiEscapes.cursorRestorePosition +
    // Wind
    ansiEscapes.cursorMove(xOffset + 16, yOffset - 3) +
    getFormattedWind(weather.wind_direction_compass, weather.wind_speed) +
    ansiEscapes.cursorRestorePosition +
    // Humidity
    ansiEscapes.cursorMove(xOffset + 16, yOffset - 2) +
    'Humidity: ' + weather.humidity + '%' +
    ansiEscapes.cursorRestorePosition
  )
}

const getSixDayWeatherReport = (weather) => {
  let report = ansiSymbols.reportFrame + ansiEscapes.cursorSavePosition
  for (let i = 0; i < 6 && i < weather.length; ++i) {
    const row = Math.floor(i / 3)
    const column = i % 3
    report += getDayWeatherReport(weather[i], row, column)
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
