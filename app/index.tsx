import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Loading from '~/components/atoms/Loading'
import OnboardingTemplate from '~/components/templates/OnboardingTemplate'
import { setUser } from '~/features/userSlice'
import useStorage from '~/hooks/useStorage'
import { RootState } from '~/redux/store'

export default function Home (): React.ReactElement {
  const { getItem, setItem } = useStorage()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [firstTime, setFirstTime] = useState<boolean>(false)
  const FIRST_TIME_USE_APP = 'FIRST-TIME-USE-APP'
  const router = useRouter()
  const { getObjectItem } = useStorage();
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const fetchUserLocal = async () => {
    const userData = await getObjectItem('userData')
    if (!isNil(userData)) {
      dispatch(setUser(userData))
    }
  }

  useEffect(() => {
    const checkFirstTime = async (): Promise<void> => {
      const user = await getItem(FIRST_TIME_USE_APP)
      if (isNil(user)) {
        setFirstTime(true)
        setItem(FIRST_TIME_USE_APP, 'false').catch(e => {
          console.error(e)
        })
      }
      setIsLoading(false)
    }

    checkFirstTime().catch(e => {
      console.error(e)
    })
  }, [])

  useLayoutEffect(() => {
    fetchUserLocal()
    if (!isLoading && !firstTime && !isNil(user) ) {
      router.replace('/(tabs)/home')
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }
  return (
    <OnboardingTemplate/>
  )
}
