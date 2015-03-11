const bindLate = require('../index.es6.js')
const { cipher, randomBytes } = require('crypto-promise')

const getCipher = (cipher, algo, getKey) =>
  async () => await cipher(algo, await getKey())

export default bindLate({
  core: {
    wrap: size => data =>
      data.replace(RegExp(`(.{1,${size}})`, 'g'), '$1\n'),

    encode: encoding => x => x.toString(encoding),
    decode: encoding => x => new Buffer(x, encoding),

    decorateKey: (beginTag, endTag) =>
      key => `${beginTag}\n${key}${endTag}\n`,

    requestKey: ({ serialize, getCipher }) =>
      async data =>
        await (await getCipher())(serialize({ data, time: Date.now() })),

    displayKey: ({ encode, wrap, decorateKey }) =>
      key => decorateKey(wrap(encode(key))),
  },

  crypto: {
    algo: 'aes256',
    keySize: 256,

    getKey: _ => _.crypto.key
      ? () => _.crypto.key
      : () => randomBytes(_.crypto.keySize),

    getCipher: _ => getCipher(cipher, _.crypto.algo, _.crypto.getKey),
    getDecipher: _ => getCipher(decipher, _.crypto.algo, _.crypto.getKey),
  },

  display: {
    beginTag: '-----BEGIN KEY-----',
    endTag: '-----END KEY-----',
    wrapWidth: 32,
    encoding: 'base64',

    encode: _ => _.core.encode(_.display.encoding),
    decode: _ => _.core.decode(_.display.encoding),

    wrap: _ => _.core.wrap(_.display.wrapWidth),
    decorateKey: _ => _.core.decorateKey(_.display.beginTag, _.display.endTag),
  },

  serialize: JSON.stringify,
  unserialize: JSON.parse,

  requestKey: _ => _.core.requestKey({
    serialize: _.serialize,
    getCipher: _.crypto.getCipher
  }),

  displayKey: _ => _.core.displayKey({
    encode: _.display.encode,
    wrap: _.display.wrap,
    decorateKey: _.display.decorateKey,
  }),
})
