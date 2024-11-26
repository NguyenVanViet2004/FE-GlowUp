import { isNil } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Appointment from '~/interfaces/Appointment'

const useFetchAppointment = (): {
  appointments: Appointment[]
  isLoading: boolean
  refetch: () => Promise<void>
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

  useEffect(() => {
    fetchAppointments().catch((err) => { console.log(err) })
  }, [fetchAppointments])

  return { appointments, isLoading, refetch: fetchAppointments }
}

export default useFetchAppointment
