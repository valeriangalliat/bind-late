const crypto = require('crypto')
const denodeify = require('es6-denodeify')(Promise)
const { pipec } = require('./util')

const mkCipher = create => (algo, key) =>
  async (data, encoding) => {
    const stream = create(algo, key)
    stream.end(data, encoding)
    return await pipec(stream)
  }

export const cipher = mkCipher(crypto.createCipher)
export const decipher = mkCipher(crypto.createDecipher)
export const rand = denodeify(crypto.randomBytes)
