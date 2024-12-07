import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

import Loading from '~/components/atoms/Loading'

const WebviewTemplate = (): React.ReactElement => {
  const { url } = useLocalSearchParams<{ url: string }>()

  if (url === null) {
    return (
      <Loading/>
    )
  }

  return <WebView source={{ uri: url }} style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WebviewTemplate
