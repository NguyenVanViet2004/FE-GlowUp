import { type Status } from '~/interfaces/enum/Status'

import type Stylist from './Stylist'

export default interface Appointment {
  id: string
  start_time: Date
  end_time: Date
  status: Status
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean
  customer: string
  stylist: Stylist
  combo: string
  total_time: number
  total_price: number
}
