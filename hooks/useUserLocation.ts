import * as Location from 'expo-location'
import { isNil } from 'lodash'
import { useState } from 'react'
import Toast from 'react-native-toast-message'

import { usePermissions } from '~/hooks/usePermissions'

interface LocationData {
  latitude: number | null
  longitude: number | null
  altitude?: number | null
  accuracy?: number | null
}

interface AddressData {
  street: string | null
  city: string | null
  region: string | null
  country: string | null
  postalCode: string | null
}

interface UseUserLocationResult {
  location: LocationData | null
  address: AddressData | null
  errorMsg: string | null
  requestLocation: () => Promise<void>
}

/**
 * Custom hook to fetch the user's current location, convert it to an address, and handle any errors that may occur during the process.
 *
 * This hook utilizes the `usePermissions` hook to check and request permission for accessing the user's location.
 * If permission is granted, it fetches the current location using the `expo-location` API, then converts the location coordinates to an address.
 *
 * @returns An object containing:
 * - `location`: The user's current location data as an object with latitude, longitude, altitude (optional), and accuracy (optional). Returns `null` if no location data is available.
 * - `address`: The address corresponding to the user's current location as an object with street, city, region, country, and postal code fields. Returns `null` if no address data is available.
 * - `errorMsg`: A string containing an error message if an error occurs, or `null` if no error occurs.
 * - `requestLocation`: A function to request and fetch the user's current location, convert it to an address, and update the state accordingly.
 */
export const useUserLocation = (): UseUserLocationResult => {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [address, setAddress] = useState<AddressData | null>(null)

  const { requestPermission, errorMsg } = usePermissions()

  /**
   * Asynchronous function to request the user's location, convert it to an address, and update the location and address state accordingly.
   * It first checks if permission to access location is granted using the `requestPermission` function from `usePermissions`.
   * If permission is granted, it fetches the current position using the `Location.getCurrentPositionAsync` method.
   * It then converts the coordinates to an address using the `Location.reverseGeocodeAsync` method.
   * If permission is not granted, or if an error occurs during fetching, it sets the `errorMsg` state or logs the error to the console.
   *
   * @returns A Promise that resolves when the location and address are successfully fetched or an error occurs.
   */
  const requestLocation = async (): Promise<void> => {
    try {
      const permissionStatus = await requestPermission('location')
      if (!isNil(permissionStatus) && !permissionStatus.granted) {
        setLocation(null) // Ensures location state is reset if permission is denied
        setAddress(null) // Ensures address state is reset if permission is denied
        Toast.show({
          position: 'top',
          text1: 'Thất bại',
          text2: errorMsg ?? '',
          type: 'error'
        })
        return
      }

      const {
        coords: { latitude, longitude, altitude, accuracy }
      } = await Location.getCurrentPositionAsync({})

      setLocation({ accuracy, altitude, latitude, longitude })

      // Convert coordinates to address
      const reverseGeocodeResult =
        await Location.reverseGeocodeAsync({ latitude, longitude })

      if (reverseGeocodeResult.length > 0) {
        const {
          street, city,
          region, country, postalCode
        } = reverseGeocodeResult[0]
        setAddress({ city, country, postalCode, region, street })
      } else {
        Toast.show({
          position: 'top',
          text1: 'Thất bại',
          text2: 'Không tìm thấy địa chỉ cho tọa độ đã cho',
          type: 'error'
        })
        setAddress(null)
      }
    } catch (error) {
      console.error('Error fetching location or address:', error)
      Toast.show({
        position: 'top',
        text1: 'Thất bại',
        text2: errorMsg ?? '',
        type: 'error'
      })
    }
  }

  return { address, errorMsg, location, requestLocation }
}
