import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import { useAppFonts } from '~/hooks/useAppFonts'
import { type RootState } from '~/redux/store'

const HomeTemplate = (): React.ReactElement => {
  const { fonts } = useAppFonts()
  const user = useSelector((state: RootState) => state.user)

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center">
      <Text
        fontSize={20}
        fontFamily={fonts.JetBrainsMonoBold}>
        {user.result.full_name}
      </Text>
    </View>
  )
}

export default HomeTemplate
