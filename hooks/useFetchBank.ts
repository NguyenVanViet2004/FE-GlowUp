import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'
import type Bank from '~/interfaces/Bank'

interface UseFetchComboReturn {
  bank: Bank[]
  isLoading: boolean
}

const useFetchBank = (): UseFetchComboReturn => {
  const [bank, setBank] = useState<Bank[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchBank = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response =
        await request.get<Bank[]>('payment/bank-list')
        if (response !== null) {
          setBank(response as Bank[])
        }
      } catch (err: any) {
        console.error('Error fetching banks:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBank().catch((err) => { console.error('Unexpected error:', err) })
  }, [])

  return { bank, isLoading }
}

export default useFetchBank
