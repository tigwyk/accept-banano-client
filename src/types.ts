type StringifiedNumber = string
type StringifiedObject = string

export type PaymentError =
  | { reason: 'NETWORK_ERROR'; details: unknown }
  | { reason: 'SESSION_EXPIRED' }
  | { reason: 'USER_TERMINATED' }

export type NanoAccount = string
export type AcceptBananoPaymentToken = string
export type AcceptBananoCurrency = 'BANANO' | 'USD'

export type CreateAcceptBananoPaymentParams = {
  amount: StringifiedNumber
  currency: AcceptBananoCurrency
  state?: StringifiedObject
}

export interface AcceptBananoPayment {
  token: AcceptBananoPaymentToken
  account: NanoAccount
  amount: StringifiedNumber
  amountInCurrency: StringifiedNumber
  currency: AcceptBananoCurrency
  balance: StringifiedNumber
  subPayments: Record<string, unknown>
  remainingSeconds: number
  state: StringifiedObject
  fulfilled: boolean
  merchantNotified: boolean
}

export const isAcceptBananoPayment = (
  input: unknown,
): input is AcceptBananoPayment => {
  if (typeof input !== 'object' || !input) {
    return false
  }

  const record = input as Record<string, unknown>
  return Boolean(record.token && record.account && record.currency)
}

export const isVerifiedAcceptBananoPayment = (input: unknown) =>
  isAcceptBananoPayment(input) && input.merchantNotified
