import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import { useSelector } from 'react-redux'

import Loading from '~/components/atoms/Loading'
import { type RootState } from '~/redux/store'

const WebviewTemplate = (): React.ReactElement => {
  const { url } = useLocalSearchParams<{ url: string }>()
  console.log(JSON.stringify(url, null, 2))
  const router = useRouter()

  const webViewRef = useRef<WebView>(null)
  const user = useSelector((state: RootState) => state.user)

  const cardInfo = {
    cardHolder: 'Nguyen Van A',
    cardNumber: '9704198526191432198',
    expiryDate: '07/15'
  }

  const injectCardInfo = () => {
    const script = `
      document.querySelector('input[name="cardNumber"]').value = "${user.result.card_info?.cardNumber}";
      document.querySelector('input[name="cardHolder"]').value = "${user.result.card_info?.cardHolder}";
      document.querySelector('input[name="cardDate"]').value = "${user.result.card_info?.expiryDate}";
    `
    return script
  }

  if (url === null) {
    return <Loading />
  }

  return (
    <WebView
      ref={webViewRef}
      onMessage={(event: WebViewMessageEvent) => {
        console.log(event)
      }}
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
                router.replace('/(tabs)/booking')
              },
              text: 'Quay lại'
            },
            { style: 'cancel', text: 'Hủy' }
          ]
        )
      }}
      injectedJavaScript={injectCardInfo()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WebviewTemplate
