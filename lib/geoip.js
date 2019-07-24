'use strict'
const got = require('got')
const config = require('./config')

const API_BASE = 'http://api.ipapi.com/api/check?access_key=f4c30f2ba40849e0e9c911e176377c90'

const getLocation = () => {
  return got(API_BASE, config.HTTP_REQUEST_OPTIONS)
    .then(response => response.body)
}

module.exports = {
  getLocation
}
