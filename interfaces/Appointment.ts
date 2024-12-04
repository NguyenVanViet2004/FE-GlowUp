import { type Status } from '~/interfaces/enum/Status'

export default interface Appointment {
  id: string
  start_time: Date
  end_time: Date
  status: Status
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean
  customer: string
  stylist: string
  combo: string
  total_time: number
  total_price: number
}
