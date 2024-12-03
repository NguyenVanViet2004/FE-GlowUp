import { render as tlrnRender } from '@testing-library/react-native'
import React from 'react'
import { TamaguiProvider } from 'tamagui'

import config from '~/tamagui.config'

interface Children {
  children: React.ReactNode
}

export const Provider = ({ children }: Children): React.ReactElement => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
)

export function render (
  component: React.ReactElement
): ReturnType<typeof tlrnRender> {
  return tlrnRender(<Provider>{component}</Provider>)
}
