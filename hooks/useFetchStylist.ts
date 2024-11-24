import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Stylist from '~/interfaces/Stylist'

const useFetchStylist = (): {
  stylist: Stylist[]
  isLoading: boolean
} => {
  const [stylist, setStylist] = useState<Stylist[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStylist = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await request.get<Stylist[]>('stylist')
        if (
          !isNil(response?.success) &&
          response?.success &&
          !isNil(response.data)
        ) {
          setStylist(response.data)
        }
      } catch (err) {
        console.error('Error fetching stylist:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStylist().catch((err) => {
      console.log(err)
    })
  }, [])

  return { isLoading, stylist }
}

export default useFetchStylist
