const test = api => data =>
  api.requestKey(data)
    .then(api.displayKey)
    .then(console.log)

async () => {
  const api = require('./')
  await test(api)('All by default.')

  // -----BEGIN KEY-----
  // jI0k7WDJniTebo50MkiqalTr+7DSYfaZ
  // T9oEWnyiSM3svaCO7rENN4dlhkeF3Bu3
  // -----END KEY-----

  const hexApi = api.override({ display: { encoding: 'hex' } })
  await test(hexApi)('Tweaked encoding.')

  // -----BEGIN KEY-----
  // 7ccb199ec7467467c4689dc32556310c
  // 051261a7ea65f0d302025cfa52c86273
  // d60fc9a7c761f11aca6a6482c041b254
  // 6feea353d781e71ec66598cc5387c004
  // -----END KEY-----

  const hexTagApi = hexApi.override({
    display: {
      beginTag: '=====BEGIN KEY=====',
      endTag: '=====END KEY=====',
    },
  })

  await test(hexTagApi)('Look! Custom tag!')

  // =====BEGIN KEY=====
  // 045d14b02f5ac0445dee5d10ff1f453d
  // d642953763107cbfd6bfa09681ff966a
  // e5f446bb74d42abcf8af7bd06950c485
  // a2500a0d0181e8f02ab00ed08d028b3a
  // =====END KEY=====

  const noTagApi = api.override({
    display: {
      wrapWidth: 16,
      decorateKey: key => key,
    },
  })

  await test(noTagApi)('This key is not decorated, and wrapped to 16 characters.')

  // KLrI+AE8yw7YKOEy
  // 922em/gu1YhS/b0c
  // w6xu3zpTzuv4tSFR
  // Dvanrjj8gK0uybl4
  // vd6GEI4EI8LRwest
  // pfBGfPi/ZHesJzWf
  // dpVy4tm9/m7rM71n
  // lbXT91E0HiEBdVN+

  const staticKeyApi = hexApi.override({ crypto: { key: 'yo' } })
  await test(staticKeyApi)('This one is deterministic since the key is not random.')

  // -----BEGIN KEY-----
  // 5e330f0dc003148d54f3081102bf305a
  // 7e5cbc29f048d5431bb07f7e4b86f050
  // 0dc1e369d5dae9424de4c3e13d937d34
  // 21939ca981daf447e6d05cfec95a3ebc
  // aac858ee566c421ee64d2158eec68091
  // 43e8671d35b8f902b507a3fc3611f4ac
  // -----END KEY-----
}()
  .then(null, require('promise-done'))
