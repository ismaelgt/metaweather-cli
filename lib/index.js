'use strict'
const ora = require('ora')
const geoIp = require('./geoip')
const metaweather = require('./metaweather')
const extraOptions = require('./extraOptions')
// const report = require('./report')
const report = require('./report')

const init = () => {
  var args = process.argv.slice(2)
  const spinner = ora('Locating you...')

  // Check if there is an interactive flag
  if (args.indexOf('-i') < 0) {
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
      .then(response => {
        response.consolidated_weather.extraOptions = {
          tempSelection: 2,
          speedSelection: 2
        }
        spinner.stop()
        console.log(report.getSixDayWeatherReport(response.consolidated_weather))
        console.log(report.getSourcesReport(response.sources))
      })
      .catch(err => {
        spinner.fail(err)
      })
  // Interactive section
  } else {
    extraOptions.tempSelection()
      .then((tempSelection) => {
        tempSelection = tempSelection.option
        extraOptions.speedSelection()
          .then((speedSelection) => {
            speedSelection = speedSelection.option
            extraOptions.citySelection()
              .then((selection) => {
                selection = selection.option
                // console.log('Picked', selection)
                if (selection === 1) {
                  extraOptions.enterLocation()
                    .then(enteredLocation => {
                      enteredLocation = enteredLocation.option
                      // console.log('Entered', enteredLocation)
                      spinner.text = 'Searching for ' + enteredLocation + '...'
                      spinner.start()
                      return metaweather.findLocation(enteredLocation)
                    }).then(locations => {
                      spinner.stop()
                      if (locations.length === 0) {
                        // console.log('Could Not Find any location with that name')
                        spinner.fail('Could Not Find any location with that name')
                      } else if (locations.length === 1) {
                        // console.log('Found location', locations[0].title)
                        spinner.text = 'Getting the weather for ' + locations[0].title + '...'
                        spinner.start()
                        metaweather.getWeather(locations[0].woeid)
                          .then(response => {
                            spinner.stop()
                            response.consolidated_weather.extraOptions = {
                              tempSelection,
                              speedSelection
                            }
                            console.log(report.getSixDayWeatherReport(response.consolidated_weather))
                            console.log(report.getSourcesReport(response.sources))
                          })
                          .catch(err => {
                            spinner.fail(err)
                          })
                      } else {
                        // console.log('Found Multiple Locations', locations.map(location => location.title))
                        console.log('Found Multiple Locations', locations.map(location => location.title + ' WoeId:' + location.woeid))
                        metaweather.promptMultipleLocationSelection(locations)
                          .then(location => {
                            spinner.text = 'Getting the weather for ' + location.option.title + '...'
                            spinner.start()
                            return metaweather.getWeather(location.option.woeid)
                          })
                          .then(response => {
                            spinner.stop()
                            response.consolidated_weather.extraOptions = {
                              tempSelection,
                              speedSelection
                            }
                            console.log(report.getSixDayWeatherReport(response.consolidated_weather))
                            console.log(report.getSourcesReport(response.sources))
                          })
                          .catch(err => {
                            spinner.fail(err)
                          })
                      }
                    })
                } else {
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
                    .then(response => {
                      response.consolidated_weather.extraOptions = {
                        tempSelection,
                        speedSelection
                      }
                      spinner.stop()
                      console.log(report.getSixDayWeatherReport(response.consolidated_weather))
                      console.log(report.getSourcesReport(response.sources))
                    })
                    .catch(err => {
                      spinner.fail(err)
                    })
                }
              })
          })
      })
  }
}

module.exports = init
