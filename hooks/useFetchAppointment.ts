import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Appointment from '~/interfaces/Appointment'

const useFetchAppointment = (): {
  appointments: Appointment[]
  isLoading: boolean
} => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAppointments = async (): Promise<void> => {
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
    }

    fetchAppointments().catch(err => { console.log(err) })
  }, [])

  return { appointments, isLoading }
}

export default useFetchAppointment
