# accept-banano-client

[![Build Status](https://travis-ci.com/tigwyk/accept-banano-client.svg?branch=master)](https://travis-ci.com/tigwyk/accept-banano-client)
[![Coverage Status](https://coveralls.io/repos/github/tigwyk/accept-banano-client/badge.svg?branch=master)](https://coveralls.io/github/tigwyk/accept-banano-client?branch=master)
![npm (scoped)](https://img.shields.io/npm/v/@accept-banano/client)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@accept-banano/client)
![GitHub](https://img.shields.io/github/license/tigwyk/accept-banano-client)

Payment gateway for [BANANO](https://banano.cc)

_accept-banano-client_ is a JavaScript package that helps you to communicate with [_accept-banano_](https://github.com/tigwyk/accept-banano) for receiving BANANO payments easily in your client-side applications.

## Installation

### via NPM

```bash
npm install @accept-banano/client

yarn add @accept-banano/client
```

#### ES Modules / TypeScript

```ts
import * as acceptBanano from '@accept-banano/client'
```

#### CommonJS

```ts
const acceptBanano = require('@accept-banano/client')
```

### Directly in Browser, as a UMD module

After the _accept-banano-client_ script is loaded there will be a global variable called _acceptBanano_, which you can access via `window.acceptBanano`

```HTML
<html>
  <head>
    ...
    <script src="https://unpkg.com/@accept-banano/client@2"></script>
  </head>
  ...
</html>
```

## Usage

### Creating a Payment Session

To be able to initiate the payment process, you **must create a new payment session.**

```ts
// 1- create a new payment session
type CreateSessionParams = {
  apiHost: string // host of your Accept BANANO server, without protocol
  pollInterval?: number // time interval (ms) to re-check for verification of a payment (default: 3s)
  debug?: boolean // enables debug mode and prints some useful stuff to console
}

const session = acceptBanano.createSession({
  apiHost: 'accept-nano-demo.put.io',
})

// 2- register event listeners to shape-up your logic based on session events.
type PaymentSessionEvents = {
  start: () => void
  end: (error: PaymentError | null, payment: AcceptBananoPayment | null) => void
}

session.on('start', () => {
  myApp.paymentStarted()
})

session.on('end', (error, payment) => {
  if (error) {
    return myApp.paymentFailed({ reason: error.reason })
  }

  return myApp.paymentSucceeded({
    amount: payment.amount,
    state: payment.state,
  })
})
```

### Presenting the Payment Overlay

After creating your session and attaching the event listeners, you can follow one of those options to proceed with the payment flow.

#### Option 1: Create a Payment Through Client

If you want to create and verify an _accept-banano_ payment in your client application, you can use this option.

After the payment is created, _accept-banano-client_ will automatically proceed to the verification step.

```ts
type CreatePaymentParams = {
  amount: string // stringified number
  currency: 'BANANO' | 'USD'
  state?: string // payload to share between your client and server, will be embedded into the payment object
}

session.createPayment({
  amount: '1',
  currency: 'USD',
  state: '{userId:7}',
})
```

#### Option 2: Verify a Payment Through Client

If you create an _accept-banano_ payment in another context (such as your application's backend), you can use this option to perform the verification in your client application.

```ts
type VerifyPaymentParams = {
  token: string // the Accept BANANO payment token created in your backend application
}

session.verifyPayment({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
```

## Contributing

- Please [open an issue](https://github.com/tigwyk/accept-banano-client/issues/new) if you have a question or suggestion.
- Don't create a PR before discussing it first.

## Who is using _accept-nano-client_ in production?

- Me

Please send a PR to list your site if _accept-banano_ is helping you to receive NANO payments.
