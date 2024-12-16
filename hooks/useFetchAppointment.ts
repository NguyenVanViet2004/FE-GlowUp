import { isEqual, isNil } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Appointment from '~/interfaces/Appointment'

const useFetchAppointment = (): {
  appointments: Appointment[]
  isLoading: boolean
  refetch: () => void
  removeLocalAppointment: (id: string) => void
} => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchAppointments = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await request.get<Appointment[]>('booking')
      if (response?.success === true && !isNil(response.result)) {
        setAppointments(response.result)
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeLocalAppointment = (id: string): void => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    )
  }

  const refreshData = (): void => {
    console.log('Refreshing data...')
    request.get<Appointment[]>('booking').then(booking => {
      if (isEqual(booking, appointments)) {
        return
      }

      if (booking?.success === true && !isNil(booking.result)) {
        setAppointments(booking.result)
      }
      console.log('Data refreshed successfully')
    }).catch(e => { console.error(e) })
  }

  useEffect(() => {
    fetchAppointments().catch((err) => { console.log(err) })
  }, [fetchAppointments])

  return {
    appointments,
    isLoading,
    refetch: refreshData,
    removeLocalAppointment
  }
}

export default useFetchAppointment
