import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { GenderEnum } from '~/interfaces/enum/Gender'
import { Role } from '~/interfaces/enum/Role'
import type User from '~/interfaces/User'

export const initialState: User = {
  access_token: '',
  refresh_token: '',
  result: {
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
  }
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
