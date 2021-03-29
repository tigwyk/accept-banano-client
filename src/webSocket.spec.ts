import { Server } from 'mock-socket'
import { createWebSocket, createWebSocketURL } from './webSocket'
import {
  mockAcceptBananoPayment,
  mockVerifiedAcceptBananoPayment,
} from './test-utils'

const socketConfig = {
  baseURL: 'wss://localhost:8080',
  paymentToken: mockAcceptBananoPayment.token,
}

describe('createWebSocket', () => {
  let mockServer: Server

  beforeEach(() => {
    mockServer && mockServer.close()
    mockServer = new Server(socketConfig.baseURL)
  })

  it('emits `open` event', done => {
    mockServer.on('connection', server => {
      server.send('hello')
      server.close()
    })

    const socket = createWebSocket(socketConfig.baseURL)
    socket.on('open', done)
  })

  it('emits `close` event', done => {
    mockServer.on('connection', server => {
      server.send('hello')
    })

    const socket = createWebSocket(socketConfig.baseURL)
    socket.on('close', done)
    socket.close()
  })

  it('emits `error` event', done => {
    const socket = createWebSocket(socketConfig.baseURL + 'oops')
    socket.on('error', () => {
      done()
    })
  })

  describe('after receiving a message', () => {
    it('emits `payment_updated` event for expected payloads', done => {
      mockServer.on('connection', server => {
        server.send(JSON.stringify(mockAcceptBananoPayment))
        server.close()
      })

      const socket = createWebSocket(socketConfig.baseURL)
      socket.on('payment_updated', payment => {
        expect(payment).toEqual(mockAcceptBananoPayment)
        done()
      })
    })

    it('emits `payment_verified` event for verified payments', done => {
      mockServer.on('connection', server => {
        server.send(JSON.stringify(mockVerifiedAcceptBananoPayment))
        server.close()
      })

      const socket = createWebSocket(socketConfig.baseURL)
      socket.on('payment_verified', payment => {
        expect(payment).toEqual(mockVerifiedAcceptBananoPayment)
        done()
      })
    })

    it('ignores weird payloads', done => {
      mockServer.on('connection', server => {
        server.send(JSON.stringify(`{ foo: bar }`))
        server.close()
      })

      const socket = createWebSocket(socketConfig.baseURL)

      socket.on('close', () => {
        done()
      })
    })

    it('emits `error` event for unparsable payloads', done => {
      mockServer.on('connection', server => {
        server.send(`hello`)
        server.close()
      })

      const socket = createWebSocket(socketConfig.baseURL)

      const onError = jest.fn()
      socket.on('error', onError)

      socket.on('close', () => {
        expect(onError).toBeCalledTimes(1)
        done()
      })
    })
  })
})

describe('createWebSocketURL', () => {
  it('works 🤡', () => {
    expect(createWebSocketURL(socketConfig)).toMatchInlineSnapshot(
      `"wss://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"`,
    )
  })
})
