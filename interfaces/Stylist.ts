import { type GenderEnum } from '~/interfaces/enum/Gender'
import { type Role } from '~/interfaces/enum/Role'

export default interface Stylist {
  id: string
  full_name: string
  role: Role
  phone_number: number
  phoneNumber: string
  avatar: string | null
  date_of_birth: string | null
  address: string | null
  profile: {
    stylist?: {
      isWorking: boolean;
    };
  } | null
  gender: GenderEnum
  createdAt: string
  updatedAt: string
}
