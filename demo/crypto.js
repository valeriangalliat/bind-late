const crypto = require('crypto')
const denodeify = require('es6-denodeify')(Promise)
const { pipec } = require('./util')

const mkCipher = create => (algo, key) =>
  async (data, encoding) => {
    const stream = create(algo, key)
    stream.end(data, encoding)
    return await pipec(stream)
  }

module.exports = {
  cipher: mkCipher(crypto.createCipher),
  decipher: mkCipher(crypto.createDecipher),
  rand: denodeify(crypto.randomBytes),
}
