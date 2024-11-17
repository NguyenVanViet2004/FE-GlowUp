import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { GenderEnum } from '~/interfaces/enum/Gender'
// import { Rank } from '~/interfaces/enum/Rank'
import { Role } from '~/interfaces/enum/Role'
// import type Membership from '~/interfaces/Membership'
import type User from '~/interfaces/User'

// const initialMembership: Membership = {
//   name: Rank.BRONZE,
//   point: 0
// }

const initialState: User = {
  access_token: '',
  data: {
    address: null,
    avatar: null,
    createdAt: '',
    date_of_birth: null,
    full_name: '',
    gender: GenderEnum.MALE,
    id: '',
    phone_number: '',
    profile: null,
    role: Role.USER,
    updatedAt: ''
  },
  refresh_token: ''

}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    resetUser: () => initialState,
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { setUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
