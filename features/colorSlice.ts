import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ColorSchemeState {
  colorScheme: 'light' | 'dark'
}

const initialState: ColorSchemeState = {
  colorScheme: 'light' // default color scheme
}

const colorSchemeSlice = createSlice({
  initialState,
  name: 'colorScheme',
  reducers: {
    setColorScheme (state, action: PayloadAction<'light' | 'dark'>) {
      state.colorScheme = action.payload
    }
  }
})

export const { setColorScheme } = colorSchemeSlice.actions
export default colorSchemeSlice.reducer
