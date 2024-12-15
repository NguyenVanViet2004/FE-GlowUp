import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import { useSelector } from 'react-redux'

import Loading from '~/components/atoms/Loading'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import { type RootState } from '~/redux/store'

import AppHeader from '../molecules/common/AppHeader'
import AppModal from '../molecules/common/AppModal'

const WebviewTemplate = (): React.ReactElement => {
  const { url } = useLocalSearchParams<{ url: string }>()
  console.log(JSON.stringify(url, null, 2))
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const router = useRouter()

  const webViewRef = useRef<WebView>(null)
  const user = useSelector((state: RootState) => state.user)

  const colors = getColors(useColorScheme().colorScheme)
  const insets = useSafeAreaInsets()
/* eslint-disable */
  const cardInfo = {
    cardHolder: 'Nguyen Van A',
    cardNumber: '9704198526191432198',
    expiryDate: '07/15'
  }

  const injectCardInfo = (): string => {
    const script = `
      document.querySelector('input[name="cardNumber"]').value = "${user.result.card_info?.cardNumber}";
      document.querySelector('input[name="cardHolder"]').value = "${user.result.card_info?.cardHolder}";
      document.querySelector('input[name="cardDate"]').value = "${user.result.card_info?.expiryDate}";
    `
    return script
  }
  /* eslint-enable */

  if (url === null) {
    return <Loading />
  }

  const back = (): void => {
    router.replace('/(tabs)/booking')
  }

  return (
    <>
      <AppHeader
        onPress={() => {
          router.replace('/(tabs)/booking')
        }}
        headerTitle={'Quay lại'}
        isHeaderCenter={false}
        leftIcon={<ChevronLeft color={colors.blue} size={25} />}
        marginTop={insets.top}
        backgroundColor={colors.white}
        paddingLeft={10}
        titleColor={colors.blue}
      />

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
          setIsModalVisible(true)
        }}
        injectedJavaScript={injectCardInfo()}
      />
      <AppModal
        visible={isModalVisible}
        title="Kết nối thất bại"
        type="INFO"
        ontClose={() => {
          setIsModalVisible(false)
        }}
        subtitle="Không thể kết nối đến máy chủ.
        Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau."
        cancelText="Hủy"
        onCancel={() => {
          setIsModalVisible(false)
        }}
        confirmText="Quay lại"
        onConfirm={back}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WebviewTemplate
