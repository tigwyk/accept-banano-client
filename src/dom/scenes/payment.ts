import { el, setChildren } from 'redom'
import Big from 'big.js'
import QRCode from 'qrcode'
import { AcceptBananoPayment } from '../../types'
import { sharedStyles } from '../style'

const multBANANO = Big('1000000000000000000000000000000')

const createAccountElements = (account: AcceptBananoPayment['account']) => {
  const accountHeader = el(
    'h5',
    { style: sharedStyles.infoHeader },
    'Account Address',
  )

  const accountText = el('p', { style: sharedStyles.infoText }, account)

  return { accountHeader, accountText } as const
}

const createAmountElements = (amount: AcceptBananoPayment['amount']) => {
  const amountHeader = el('h5', { style: sharedStyles.infoHeader }, 'Amount')
  const amountText = el(
    'p',
    { style: sharedStyles.infoText },
    `${amount} BANANO`
    )
  return { amountHeader, amountText } as const
}

const createPaymentInfo = (payment: AcceptBananoPayment) => {
  const { accountHeader, accountText } = createAccountElements(payment.account)
  const { amountHeader, amountText } = createAmountElements(payment.amount)
  return el('div', [accountHeader, accountText, amountHeader, amountText])
}

const createQRCodeElements = (payment: AcceptBananoPayment) => {
  const amount_raw = Big(payment.amount)
    .times(multBANANO)
    .toFixed()
    .toString()

  const qrText = `ban:${payment.account}?amount=${amount_raw}`

  const qrCanvas = el('canvas', {
    style: `
      background: white!important;
      padding: 24px!important;
      border: 1px solid #e9e9e9!important;
      border-radius: 5px!important;
    `,
  })

  const qrContainer = el('a', {
    href: qrText,
    target: '_blank',
    rel: 'noopener',
    style: `
      display: inline-block!important;
      text-decoration: none!important;
    `,
  })

  return { qrText, qrCanvas, qrContainer } as const
}

export const createPaymentScene = (payment: AcceptBananoPayment) =>
  new Promise<HTMLDivElement>(resolve => {
    const paymentInfo = createPaymentInfo(payment)
    const { qrText, qrCanvas, qrContainer } = createQRCodeElements(payment)

    QRCode.toCanvas(qrCanvas, qrText, (error: unknown) => {
      if (error) {
        return resolve(paymentInfo)
      }

      setChildren(qrContainer, [qrCanvas])
      resolve(el('div', [qrContainer, paymentInfo]))
    })
  })
