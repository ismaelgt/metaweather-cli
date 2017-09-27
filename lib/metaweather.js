'use strict'
const got = require('got')
const inquirer = require('inquirer')
const config = require('./config')

const API_BASE = 'http://www.metaweather.com/api/'

const getLocations = (lat, lng) => {
  return got(`${API_BASE}location/search/?lattlong=${lat},${lng}`, config.HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

const promptLocationSelection = (locations) => {
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
}

const getWeather = (woeid) => {
  return got(`${API_BASE}location/${woeid}/`, config.HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

module.exports = {
  getLocations,
  promptLocationSelection,
  getWeather
}
