import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Combo from '~/interfaces/Combo'

const useFetchCombo = (): {
  combos: Combo[]
  isLoading: boolean
} => {
  const [combos, setCombos] = useState<Combo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCombos = async (): Promise<void> => {
      try {
        const response = await request.get<Combo[]>('combo')
        if (
          !isNil(response?.success) &&
          response?.success &&
          !isNil(response.result)
        ) {
          setCombos(response.result)
        }
      } catch (err) {
        console.error('Error fetching combos:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCombos().catch((err) => {
      console.error(err)
    })
  }, [])

  return { combos, isLoading }
}

export default useFetchCombo
