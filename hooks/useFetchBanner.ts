import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Banner from '~/interfaces/Banner'

interface UseFetchComboReturn {
  banner: Banner[]
  isLoading: boolean
}

const useFetchBanner = (): UseFetchComboReturn => {
  const [banner, setBanner] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCombos = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await request.get<Banner[]>('banner')
        if (
          !isNil(response.success) &&
          response?.success &&
          !isNil(response.result)
        ) {
          setBanner(response.result)
        }
      } catch (err: any) {
        console.error('Error fetching combos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCombos().catch((err) => {
      console.error('Unexpected error:', err)
    })
  }, [])

  return { banner, isLoading }
}

export default useFetchBanner
