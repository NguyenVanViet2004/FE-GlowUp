import { type Status } from '~/interfaces/enum/Status'

import { type GenderEnum } from './enum/Gender'
import type Stylist from './Stylist'

export default interface Appointment {
  id: string
  start_time: Date
  end_time: Date
  status: Status
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean
  customer: {
    id: string
    gender: GenderEnum
    role: string
    full_name: string
    phone_number: string
    avatar: string
    date_of_birth: string
    address: string
    profile: any
    createdAt: string
    updatedAt: string
  }
  stylist: Stylist
  combo: string
  total_time: number
  total_price: number
  payment_status: Status
}
