import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

import Loading from '~/components/atoms/Loading'

const WebviewTemplate = (): React.ReactElement => {
  const { url } = useLocalSearchParams<{ url: string }>()
  const router = useRouter()

  if (url === null) {
    return <Loading />
  }

  return (
    <WebView
      source={{ uri: url }}
      style={styles.container}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      originWhitelist={['*']}
      onHttpError={(syntheticEvent) => {
        console.log('HTTP error: ', syntheticEvent.nativeEvent)
      }}
      onLoadProgress={({ nativeEvent }) => {
        console.log('Load progress: ', nativeEvent.progress)
      }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent
        console.error(nativeEvent)
        Alert.alert(
          'Kết nối thất bại',
          'Không thể kết nối đến máy chủ. ' +
          'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.',
          [
            {
              onPress: () => {
                router.back()
              },
              text: 'Quay lại'
            },
            { style: 'cancel', text: 'Hủy' }
          ]
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WebviewTemplate
