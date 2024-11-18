import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import { useAppFonts } from '~/hooks/useAppFonts'
import { RootState } from '~/redux/store'

const HomeTemplate = (): React.ReactElement => {
  const { fonts } = useAppFonts()

//   useEffect(() => {
//     const getData = async (): Promise<void> => {
//       try {
//         const res = await request.get('/vouchers')
//         console.log(res)
//       } catch (e: any) {
//         console.error(e)
//       }
//     }
//     void getData()
//   }, [])

const user = useSelector((state: RootState) => state.user)

// console.log(JSON.stringify(user,null,2));


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
