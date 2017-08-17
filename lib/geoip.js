const got = require('got')
const { HTTP_REQUEST_OPTIONS } = require('./config')

const API_BASE = 'https://freegeoip.net/json/'

function getLocation () {
  return got(API_BASE, HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

module.exports = {
  getLocation
}
