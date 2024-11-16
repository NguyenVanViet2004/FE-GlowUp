import { type Status } from '~/interfaces/enum/Status'

export default interface Appointment {
  _id: string
  userId: string
  comboId: string
  stylistId: string
  status: Status
  appointmentDate: Date
  appointmentTime: Date
  paymentId: string
  createdAt: Date
  note: string
}
