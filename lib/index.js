'use strict'
const findMe = require('./defaultMode')
const interactiveMode = require('./interactiveMode')

const init = () => {
  var args = process.argv.slice(2)
  // Check if there is an interactive flag
  if (args.indexOf('-i') < 0) {
    findMe(2, 2)
  } else {
    interactiveMode()
  }
}

module.exports = init
