import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Stylist from '~/interfaces/Stylist'

const useFetchCombo = (): any => {
  const [styList, setStyList] = useState<Stylist[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCombos = async (): Promise<void> => {
      try {
        const response = await request.get<Stylist[]>('stylist')
        if (response?.success && !isNil(response.data)) {
          setStyList(response.data)
        }
      } catch (err) {
        console.error('Error fetching combos:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCombos().catch((err) => { console.error(err) })
  }, [])

  return { isLoading, styList }
}

export default useFetchCombo
