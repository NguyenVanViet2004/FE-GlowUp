import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { DEFAULT_COORDINATES_OF_THE_SHOP } from '~/constants/Constants'

const MapDefault = (): JSX.Element => {
  return (
    <MapView style={styles.map}
      initialRegion={DEFAULT_COORDINATES_OF_THE_SHOP}>
      <Marker
        coordinate={{
          latitude: DEFAULT_COORDINATES_OF_THE_SHOP.latitude,
          longitude: DEFAULT_COORDINATES_OF_THE_SHOP.longitude
        }}
        title="Tiệm cắt tóc (Glow Up)"
        description="MD-21 _ Ứng dụng đặt lịch cắt tóc MD21"
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

export default MapDefault
