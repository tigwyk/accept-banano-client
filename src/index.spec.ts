import * as acceptBanano from './index'

describe('acceptBanano', () => {
  it('exposes the snapshotted API', () => {
    expect(acceptBanano).toMatchInlineSnapshot(`
      Object {
        "createSession": [Function],
        "isAcceptBananoPayment": [Function],
        "isVerifiedAcceptBananoPayment": [Function],
      }
    `)
  })
})
