'use strict'
const got = require('got')
const config = require('./config')

const API_BASE = 'https://freegeoip.net/json/'

const getLocation = () => {
  return got(API_BASE, config.HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

module.exports = {
  getLocation
}
