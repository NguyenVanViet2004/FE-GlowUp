import type Bank from '~/interfaces/Bank'
import { type GenderEnum } from '~/interfaces/enum/Gender'
import { type Role } from '~/interfaces/enum/Role'

export default interface User {
  access_token: string
  refresh_token: string
  result: {
    profile: string | null
    id: string
    gender: GenderEnum
    role: Role
    full_name: string
    phone_number: string
    avatar: string | null
    date_of_birth: Date | null
    address: string | null
    createdAt: string
    updatedAt: string
    notify_token: string | null
    card_info: cardInfo | null
  }
}

export interface cardInfo {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  bank?: Bank
}
