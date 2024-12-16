import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type Combo from '~/interfaces/Combo'

const initialState: Combo[] = []

const comboSlice = createSlice({
  initialState,
  name: 'combos',
  reducers: {
    addCombo: (state, action: PayloadAction<Combo>) => {
      state.push(action.payload)
    },
    removeCombo: (state, action: PayloadAction<string>) => {
      return state.filter((c) => c.id !== action.payload)
    },
    setCombos: (_, action: PayloadAction<Combo[]>) => action.payload,
    updateCombo: (state, action: PayloadAction<Combo>) => {
      const index = state.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) state[index] = action.payload
    }
  }
})

export const { setCombos, addCombo, updateCombo, removeCombo } =
  comboSlice.actions
export default comboSlice.reducer
