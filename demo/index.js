const bindLate = require('bind-late')
const { cipher, decipher, rand } = require('./crypto')
const { wrap } = require('./util')

const getCipher = (cipher, algo, getKey) =>
  async () => await cipher(algo, await getKey())

const encode = encoding => x => x.toString(encoding)
const decode = encoding => x => new Buffer(x, encoding)

const decorateKey = (beginTag, endTag) =>
  key => `${beginTag}\n${key}${endTag}\n`

const requestKey = ({ serialize, getCipher }) =>
  async data =>
    await (await getCipher())(serialize({ data, time: Date.now() }))

const displayKey = ({ encode, wrap, decorateKey }) =>
  key => decorateKey(wrap(encode(key)))

module.exports = bindLate({
  crypto: {
    algo: 'AES256',
    keySize: 256,

    getKey: _ => _.crypto.key
      ? () => _.crypto.key
      : () => rand(_.crypto.keySize),

    getCipher: _ => getCipher(cipher, _.crypto.algo, _.crypto.getKey),
    getDecipher: _ => getCipher(decipher, _.crypto.algo, _.crypto.getKey),
  },

  display: {
    beginTag: '-----BEGIN KEY-----',
    endTag: '-----END KEY-----',
    wrapWidth: 32,
    encoding: 'base64',

    encode: _ => encode(_.display.encoding),
    decode: _ => decode(_.display.encoding),

    wrap: _ => wrap(_.display.wrapWidth),
    decorateKey: _ => decorateKey(_.display.beginTag, _.display.endTag),
  },

  serialize: JSON.stringify,
  unserialize: JSON.parse,

  requestKey: _ => requestKey({
    serialize: _.serialize,
    getCipher: _.crypto.getCipher
  }),

  displayKey: _ => displayKey({
    encode: _.display.encode,
    wrap: _.display.wrap,
    decorateKey: _.display.decorateKey,
  }),
})
