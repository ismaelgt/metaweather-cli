/*
Weather symbols from:
https://github.com/schachmat/wego/blob/master/frontends/ascii-art-table.go

Copyright (c) 2014-2017, teichm@in.tum.de

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/
'use strict'
const ansiEscapes = require('ansi-escapes')

const weatherIcons = {
  // Clear
  'c': [
    '\x1B[38;5;226m    \\   /    \x1B[0m',
    '\x1B[38;5;226m     .-.     \x1B[0m',
    '\x1B[38;5;226m  ‒ (   ) ‒  \x1B[0m',
    '\x1B[38;5;226m     `-᾿     \x1B[0m',
    '\x1B[38;5;226m    /   \\    \x1B[0m'
  ],
  // Light cloud
  'lc': [
    '\x1B[38;5;226m   \\  /\x1B[0m      ',
    '\x1B[38;5;226m _ /\'\'\x1B[38;5;250m.-.    \x1B[0m',
    '\x1B[38;5;226m   \\_\x1B[38;5;250m(   ).  \x1B[0m',
    '\x1B[38;5;226m   /\x1B[38;5;250m(___(__) \x1B[0m',
    '             '
  ],
  // Heavy cloud
  'hc': [
    '             ',
    '\x1B[38;5;250m     .--.    \x1B[0m',
    '\x1B[38;5;250m  .-(    ).  \x1B[0m',
    '\x1B[38;5;250m (___.__)__) \x1B[0m',
    '             '
  ],
  // Showers
  's': [
    '\x1B[38;5;226m _`/\'\'\x1B[38;5;250m.-.    \x1B[0m',
    '\x1B[38;5;226m  ,\\_\x1B[38;5;250m(   ).  \x1B[0m',
    '\x1B[38;5;226m   /\x1B[38;5;250m(___(__) \x1B[0m',
    '\x1B[38;5;111m     ʻ ʻ ʻ ʻ \x1B[0m',
    '\x1B[38;5;111m    ʻ ʻ ʻ ʻ  \x1B[0m'
  ],
  // Light rain
  'lr': [
    '\x1B[38;5;250m     .-.     \x1B[0m',
    '\x1B[38;5;250m    (   ).   \x1B[0m',
    '\x1B[38;5;250m   (___(__)  \x1B[0m',
    '\x1B[38;5;111m    ʻ ʻ ʻ ʻ  \x1B[0m',
    '\x1B[38;5;111m   ʻ ʻ ʻ ʻ   \x1B[0m'
  ],
  // Heavy rain
  'hr': [
    '\x1B[38;5;240;1m     .-.     \x1B[0m',
    '\x1B[38;5;240;1m    (   ).   \x1B[0m',
    '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ‚ʻ‚ʻ   \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ‚ʻ‚ʻ   \x1B[0m'
  ],
  // Thunderstorm
  't': [
    '\x1B[38;5;240;1m     .-.     \x1B[0m',
    '\x1B[38;5;240;1m    (   ).   \x1B[0m',
    '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ\x1B[38;5;228;5m⚡\x1B[38;5;21;25mʻ‚\x1B[38;5;228;5m⚡\x1B[38;5;21;25m‚ʻ   \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ\x1B[38;5;228;5m⚡\x1B[38;5;21;25mʻ‚ʻ   \x1B[0m'
  ],
  // Hail
  'h': [
    '\x1B[38;5;250m     .-.     \x1B[0m',
    '\x1B[38;5;250m    (   ).   \x1B[0m',
    '\x1B[38;5;250m   (___(__)  \x1B[0m',
    '\x1B[38;5;111m    ʻ \x1B[38;5;255m*\x1B[38;5;111m ʻ \x1B[38;5;255m*  \x1B[0m',
    '\x1B[38;5;255m   *\x1B[38;5;111m ʻ \x1B[38;5;255m*\x1B[38;5;111m ʻ   \x1B[0m'
  ],
  // Sleet
  'sl': [
    '\x1B[38;5;250m     .-.     \x1B[0m',
    '\x1B[38;5;250m    (   ).   \x1B[0m',
    '\x1B[38;5;250m   (___(__)  \x1B[0m',
    '\x1B[38;5;255m    *  *  *  \x1B[0m',
    '\x1B[38;5;255m   *  *  *   \x1B[0m'
  ],
  // (You know nothing, Jon) Snow
  'sn': [
    '\x1B[38;5;240;1m     .-.     \x1B[0m',
    '\x1B[38;5;240;1m    (   ).   \x1B[0m',
    '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
    '\x1B[38;5;255;1m   * * * *   \x1B[0m',
    '\x1B[38;5;255;1m  * * * *    \x1B[0m'
  ]
}

const reportFrame = `
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│                              │                              │                              │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│                              │                              │                              │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
│                              │                              │                              │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
`

const tempColors = [
  [-15, 21],
  [-12, 27],
  [-9, 33],
  [-6, 39],
  [-3, 45],
  [0, 51],
  [2, 50],
  [4, 49],
  [6, 48],
  [8, 47],
  [10, 46],
  [13, 82],
  [16, 118],
  [19, 154],
  [22, 190],
  [25, 226],
  [28, 220],
  [31, 214],
  [34, 208],
  [37, 202]
]

const speedColors = [
  [0, 46],
  [4, 82],
  [7, 118],
  [10, 154],
  [13, 190],
  [16, 226],
  [20, 220],
  [24, 214],
  [28, 208],
  [32, 202]
]

const windArrowSymbols = {
  'N': '↓',
  'NNE': '↓',
  'NE': '↙',
  'ENE': '←',
  'E': '←',
  'ESE': '←',
  'SE': '↖',
  'SSE': '↑',
  'S': '↑',
  'SSW': '↑',
  'SW': '↗',
  'WSW': '→',
  'W': '→',
  'WNW': '→',
  'NW': '↘',
  'NNW': '↓'
}

const getBoundaryColor = (value, options) => {
  for (let i = 0; i < options.length; ++i) {
    if (options[i][0] >= value) {
      return options[i][1]
    }
  }
  return 196
}

const getWeatherIcon =
  (icon) => weatherIcons[icon].join(ansiEscapes.cursorMove(-13, 1))

const getColoredTemp = (temp) => {
  const color = getBoundaryColor(temp, tempColors)
  return `\x1B[38;5;${color}m${temp}\x1B[0m`
}

const getColoredFahrenheitTemp = (temp) => {
  const fahTemp = (temp - 32) / 1.8
  const color = getBoundaryColor(fahTemp, tempColors)
  return `\x1B[38;5;${color}m${temp}\x1B[0m`
}

const getWindArrow = (direction) => windArrowSymbols[direction]

const getColoredWindSpeed = (speed) => {
  const color = getBoundaryColor(speed, speedColors)
  return `\x1B[38;5;${color}m${speed}\x1B[0m`
}

const getColoredMilesWindSpeed = (speed) => {
  const mph = Math.round(speed / 1.609344)
  const color = getBoundaryColor(speed, speedColors)
  return `\x1B[38;5;${color}m${mph}\x1B[0m`
}

module.exports = {
  reportFrame,
  getWeatherIcon,
  getColoredTemp,
  getColoredFahrenheitTemp,
  getWindArrow,
  getColoredWindSpeed,
  getColoredMilesWindSpeed
}
