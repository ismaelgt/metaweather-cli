'use strict'
const ora = require('ora')
const metaweather = require('./metaweather')
const extraOptions = require('./extraOptions')
const findMe = require('./findMe')
const report = require('./report')

const interactiveMode = () => {
  const spinner = ora('Locating you...')
  let tempSelection
  let speedSelection
  let citySelection

  extraOptions.tempSelection()
    .then((temp) => {
      tempSelection = temp.option
      return extraOptions.speedSelection()
    })
    .then((speed) => {
      speedSelection = speed.option
      return extraOptions.citySelection()
    })
    .then((cityInput) => {
      citySelection = cityInput.option
      if (citySelection === 1) {
        extraOptions.enterLocation()
          .then(enteredLocation => {
            enteredLocation = enteredLocation.option
            spinner.text = 'Searching for ' + enteredLocation + '...'
            spinner.start()
            return metaweather.findLocation(enteredLocation)
          }).then(locations => {
            spinner.stop()
            switch (locations.length) {
              case 0:
                spinner.fail('Could Not Find any location with that name')
                break
              case 1:
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
                break
              default:
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
                break
            }
          })
      } else {
        findMe(tempSelection, speedSelection)
      }
    })
}

module.exports = interactiveMode
