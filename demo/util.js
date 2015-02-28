const concat = require('concat-stream')
const pipe = require('promisepipe')

// Pipe, concat and return a promise.
export const pipec = (...args) =>
  pipe(...args, concat())
    .then(streams => streams.pop().getBody())

// Wrap lines.
export const wrap = size => data =>
  data.replace(RegExp(`(.{1,${size}})`, 'g'), '$1\n')
