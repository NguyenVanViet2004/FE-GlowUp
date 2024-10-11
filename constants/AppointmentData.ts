import Appointment from '~/interfaces/Appointment';
import { Status } from '~/interfaces/enum/Status';

export const dataAppointments: Appointment[] = [
  {
    _id: "appointment1",
    userId: "user1",
    comboId: "combo1",
    stylistId: "stylist1",
    status: Status.COMPLETED,
    appointmentDate: new Date("2024-10-10"),
    appointmentTime: new Date("2024-10-10T14:00:00"),
    paymentId: "payment1",
    createdAt: new Date(),
    note: "Không có yêu cầu đặc biệt."
  },
  {
    _id: "appointment2",
    userId: "user2",
    comboId: "combo2",
    stylistId: "stylist2",
    status: Status.PENDING,
    appointmentDate: new Date("2024-10-15"),
    appointmentTime: new Date("2024-10-15T10:00:00"),
    paymentId: "payment2",
    createdAt: new Date(),
    note: "Chỉ cần gội đầu."
  }
];
