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
    card_info: null,
    createdAt: '',
    date_of_birth: null,
    full_name: '',
    gender: GenderEnum.MALE,
    id: '',
    notify_token: null,
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
    updateCardInfo: (state, action: PayloadAction<Partial<User['result']['card_info']>>) => {
      state.result.card_info = {
        bank: action?.payload?.bank ?? undefined,
        cardHolder: action?.payload?.cardHolder ?? '',
        cardNumber: action?.payload?.cardNumber ?? '',
        expiryDate: action?.payload?.expiryDate ?? ''
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { setUser, updateUser, resetUser, updateCardInfo } = userSlice.actions

export default userSlice.reducer
