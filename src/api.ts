import axios from 'axios'
import {
  AcceptBananoPayment,
  AcceptBananoPaymentToken,
  CreateAcceptBananoPaymentParams,
} from './types'

export const createAPI = ({ baseURL }: { baseURL: string }) => {
  const instance = axios.create({
    baseURL,
    timeout: 3000,
  })

  return {
    createPayment: ({
      amount,
      currency,
      state,
    }: CreateAcceptBananoPaymentParams) => {
      const form = new FormData()

      form.append('amount', amount)
      form.append('currency', currency)
      form.append('state', state || '')

      return instance.post<AcceptBananoPayment>('/pay', form)
    },

    fetchPayment: ({ token }: { token: AcceptBananoPaymentToken }) => {
      return instance.get<AcceptBananoPayment>('/verify', {
        params: {
          token,
        },
      })
    },
  }
}

export type AcceptBananoAPI = ReturnType<typeof createAPI>
