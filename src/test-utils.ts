import { AcceptBananoPayment } from './types'

export const mockAPIHost = 'accept-nano-demo.put.io'

export const mockAcceptBananoPayment: AcceptBananoPayment = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  account: 'ban_3c9pkkgdy5n8qkkrzj96ncjnpcbuj6ux3177wawn1wu5ynoejquumbffdxny',
  amount: '0.000001',
  amountInCurrency: '0.000001',
  currency: 'BANANO',
  balance: '0',
  subPayments: {},
  remainingSeconds: 14399,
  state: '',
  fulfilled: false,
  merchantNotified: false,
}

export const mockVerifiedAcceptBananoPayment: AcceptBananoPayment = {
  ...mockAcceptBananoPayment,
  merchantNotified: true,
}

export const createMockAPIResponse = (payment = mockAcceptBananoPayment) => ({
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: payment,
})

export const clearDOM = () => {
  document.getElementsByTagName('body')[0].innerHTML = ''
}
