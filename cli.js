#!/usr/bin/env node
'use strict'
const meow = require('meow')
const weather = require('.')

meow(`
  Usage
    $ weather
`)

weather()
