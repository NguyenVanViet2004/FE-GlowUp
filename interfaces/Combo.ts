import type Step from '~/interfaces/Step'
import type Voucher from '~/interfaces/voucher'

export default interface Combo {
  _id: string
  imageUrl: string
  price: number
  name: string
  description: string
  steps: Step[]
  voucher?: Voucher
}
