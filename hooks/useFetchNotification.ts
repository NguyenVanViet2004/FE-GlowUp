import { useEffect, useState } from 'react'

import { request } from '~/apis/HttpClient'

const useFetchNotifications = (): {
  notifications: any
  isLoading: boolean
} => {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotifications = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await request.get('/expo-noti/history')
        setNotifications(response)
      } catch (err) {
        console.error('Error fetching notifications:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications().catch((err) => {
      console.error('Error in useFetchNotifications:', err)
    })
  }, [])

  return { isLoading, notifications }
}

export default useFetchNotifications
