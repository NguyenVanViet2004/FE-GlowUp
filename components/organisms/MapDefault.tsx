import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { View } from 'tamagui'

const MapDefault = (): JSX.Element => {
  const defaultRegion = {
    latitude: 21.03839498067568,
    latitudeDelta: 0.01,
    longitude: 105.74720822260387,
    longitudeDelta: 0.01
  }

  return (
    <View flex={1}>
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
      >
        <Marker
          coordinate={{
            latitude: defaultRegion.latitude,
            longitude: defaultRegion.longitude
          }}
          title="Tiệm cắt tóc (Glow Up)"
          description="MD-21 _ Ứng dụng đặt lịch cắt tóc MD21"
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

export default MapDefault
