import React from 'react'
import { Spinner } from 'tamagui'

const Loading = (): React.ReactElement => {
  return (
    <Spinner flex={1} justifyContent="center" size="large" testID="loading"/>
  )
}

export default Loading
