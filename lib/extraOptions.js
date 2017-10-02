const inquirer = require('inquirer')

// Select Temp Format: F or C
const tempSelection = (location) => {
  return inquirer.prompt([{
    type: 'list',
    name: 'option',
    message: 'What format would you like the weather in:',
    choices: [{value: 1, name: 'Fahrenheit'}, {value: 2, name: 'Celcius'}]
  }])
}

// Select Speed format: MPH or KM/H
const speedSelection = (location) => {
  return inquirer.prompt([{
    type: 'list',
    name: 'option',
    message: 'What format would you like the wind speed to be in:',
    choices: [{value: 1, name: 'Mph'}, {value: 2, name: 'Km/h'}]
  }])
}

// Select whether to locate automatically or type a city
const citySelection = () => {
  return inquirer.prompt([{
    type: 'list',
    name: 'option',
    message: 'Would you like to enter a location or the app to locate you:',
    choices: [{value: 1, name: 'Enter'}, {value: 2, name: 'Locate'}]
  }])
}

// Input a location
const enterLocation = (location) => {
  return inquirer.prompt([{
    type: 'input',
    name: 'option',
    message: 'Enter location:'
  }])
}

module.exports = {
  tempSelection,
  speedSelection,
  citySelection,
  enterLocation
}
