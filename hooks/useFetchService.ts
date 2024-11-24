import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Service from '~/interfaces/Service'

const useFetchService = (): {
  services: Service[]
  isLoading: boolean
} => {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCombos = async (): Promise<void> => {
      try {
        const response = await request.get<Service[]>('service')
        if (
          !isNil(response?.success) &&
          response?.success &&
          !isNil(response.result)
        ) {
          setServices(response.result)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCombos().catch((err) => {
      console.error(err)
    })
  }, [])

  return { isLoading, services }
}

export default useFetchService
