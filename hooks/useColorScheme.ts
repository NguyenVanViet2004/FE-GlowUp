import { isNil } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setColorScheme } from '~/features/colorSlice'
import useStorage from '~/hooks/useStorage'
import { type RootState } from '~/redux/store'

interface props {
  colorScheme: 'light' | 'dark'
  setTheme: (scheme: 'light' | 'dark') => Promise<void>
}

export const useColorScheme = (): props => {
  const { getItem, setItem } = useStorage()
  const dispatch = useDispatch()
  const colorScheme = useSelector(
    (state: RootState) => state.colorScheme.colorScheme
  )

  const setTheme = async (scheme: 'light' | 'dark'): Promise<void> => {
    await setItem('colorScheme', scheme)
      .then(() => dispatch(setColorScheme(scheme)))
      .catch((err) => {
        console.error(err)
      }).catch(e => { console.error(e) })
  }

  React.useLayoutEffect(() => {
    ;(async () => {
      const savedColorScheme = await getItem('colorScheme')
      if (
        !isNil(savedColorScheme) &&
        (savedColorScheme === 'light' || savedColorScheme === 'dark')
      ) {
        dispatch(setColorScheme(savedColorScheme))
      }
    })().catch(e => { console.error(e) }),
    []
  })
  return {
    colorScheme,
    setTheme
  }
}
