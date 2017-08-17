#!/usr/bin/env node
'use strict'
const meow = require('meow')
const weather = require('./lib')

meow(`
  Usage
    $ weather
`)

weather()
