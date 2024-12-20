import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  visible: boolean
  title?: string
  subtitle?: string
  type?: 'SUCCESS' | 'ERROR' | 'INFO'
}

const initialState: ModalState = {
  visible: false,
  title: undefined,
  subtitle: undefined,
  type: 'INFO'
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<Pick<ModalState, 'title' | 'subtitle' | 'type'>>) => {
      state.visible = true
      state.title = action.payload.title
      state.subtitle = action.payload.subtitle
      state.type = action.payload.type || 'INFO'
    },
    hideModal: (state) => {
      state.visible = false
      state.title = undefined
      state.subtitle = undefined
      state.type = 'INFO'
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
