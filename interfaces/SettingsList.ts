import { type ComponentType } from 'react'

interface SettingItem {
  title: string
  icon: ComponentType<{ size: number, color: string }>
  onPress: () => void
  isDisabled: boolean
}

export default interface SettingsList {
  key: string
  items: SettingItem[]
}
