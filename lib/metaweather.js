'use strict'
const got = require('got')
const inquirer = require('inquirer')
const config = require('./config')

const API_BASE = 'http://www.metaweather.com/api/'

const getLocations = (lat, lng) => {
  return got(`${API_BASE}location/search/?lattlong=${lat},${lng}`, config.HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

const findLocation = (location) => {
  return got(`${API_BASE}location/search/?query=${location}`, config.HTTP_REQUEST_OPTIONS)
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

// When there are multiple selections for an entered city
const promptMultipleLocationSelection = (locations) => {
  const choices = locations.map(location => ({
    value: location,
    name: location.title + ' Woeid:' + location.woeid
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
  findLocation,
  promptLocationSelection,
  promptMultipleLocationSelection,
  getWeather
}
