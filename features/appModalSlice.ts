import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  visible: boolean
  title?: string
  subtitle?: string
  type?: 'SUCCESS' | 'ERROR' | 'INFO'
}

const initialState: ModalState = {
  subtitle: undefined,
  title: undefined,
  type: 'INFO',
  visible: false
}

const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    hideModal: (state) => {
      state.visible = false
      state.title = undefined
      state.subtitle = undefined
      state.type = 'INFO'
    },
    showModal: (state, action: PayloadAction<Pick<ModalState, 'title' | 'subtitle' | 'type'>>) => {
      state.visible = true
      state.title = action.payload.title
      state.subtitle = action.payload.subtitle
      state.type = action.payload.type || 'INFO'
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
