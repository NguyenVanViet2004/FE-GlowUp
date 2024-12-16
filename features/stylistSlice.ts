import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type Stylist from '~/interfaces/Stylist'

const initialState: Stylist[] = []

const stylistSlice = createSlice({
  initialState,
  name: 'stylists',
  reducers: {
    addStylist: (state, action: PayloadAction<Stylist>) => {
      state.push(action.payload)
    },
    removeStylist: (state, action: PayloadAction<string>) => {
      return state.filter((s) => s.id !== action.payload)
    },
    setStylists: (state, action: PayloadAction<Stylist[]>) => action.payload,
    updateStylist: (state, action: PayloadAction<Stylist>) => {
      const index = state.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) state[index] = action.payload
    }
  }
})

export const { setStylists, addStylist, updateStylist, removeStylist } =
  stylistSlice.actions
export default stylistSlice.reducer
