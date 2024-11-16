import type Appointment from '~/interfaces/Appointment'
import { Status } from '~/interfaces/enum/Status'

export const dataAppointments: Appointment[] = [
  {
    _id: 'appointment1',
    appointmentDate: new Date('2024-10-10'),
    appointmentTime: new Date('2024-10-10T14:00:00'),
    comboId: 'combo1',
    createdAt: new Date(),
    note: 'Không có yêu cầu đặc biệt.',
    paymentId: 'payment1',
    status: Status.COMPLETED,
    stylistId: 'stylist1',
    userId: 'user1'
  },
  {
    _id: 'appointment2',
    appointmentDate: new Date('2024-10-15'),
    appointmentTime: new Date('2024-10-15T10:00:00'),
    comboId: 'combo2',
    createdAt: new Date(),
    note: 'Chỉ cần gội đầu.',
    paymentId: 'payment2',
    status: Status.PENDING,
    stylistId: 'stylist2',
    userId: 'user2'
  }
]
