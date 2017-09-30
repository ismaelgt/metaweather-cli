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

const getFormattedTemp = (temp, selection) => {
  let coloredTemp
  switch (selection) {
    case 1:
      temp = temp * 1.8 + 32
      coloredTemp = ansiSymbols.getColoredFahrenheitTemp(Math.round(temp))
      return `${coloredTemp} ºF`
    default:
      coloredTemp = ansiSymbols.getColoredTemp(Math.round(temp))
      return `${coloredTemp} ºC`
  }
}

const getFormattedWind = (direction, speed, selection) => {
  const arrow = ansiSymbols.getWindArrow(direction)
  const speedKmh = Math.round(speed * 1.60934)
  const coloredSpeed = (selection === 1 ? ansiSymbols.getColoredWindSpeed(speedKmh) : ansiSymbols.getColoredMilesWindSpeed(speedKmh))

  return `${arrow} ${coloredSpeed} ${(selection === 1 ? 'mph' : 'km/h')}`
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
    'Max: ' + getFormattedTemp(weather.max_temp, weather.extraOptions.tempSelection) +
    ansiEscapes.cursorNextLine +
    // Min temp
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    'Min: ' + getFormattedTemp(weather.min_temp, weather.extraOptions.tempSelection) +
    ansiEscapes.cursorNextLine +
    // Wind
    ansiEscapes.cursorMove(xOffset + 16, 0) +
    getFormattedWind(weather.wind_direction_compass, weather.wind_speed, weather.extraOptions.speedSelection) +
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
    weather[i].extraOptions = weather.extraOptions
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
