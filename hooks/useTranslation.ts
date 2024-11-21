// import * as Localization from 'expo-localization'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { initReactI18next, useTranslation } from 'react-i18next'

import en from '~/locales/en.json'
import vi from '~/locales/vi.json'

const initializeI18n = async (): Promise<void> => {
  // const languageCode = Localization.getLocales()[0]?.languageCode ?? 'en'
  await i18next
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: 'vi',
      interpolation: {
        escapeValue: false
      },
      resources: {
        en: { translation: en },
        vi: { translation: vi }
      }
    })
}

interface InitializeI18n {
  isI18nInitialized: boolean
}

export const useInitializeI18n = (): InitializeI18n => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        await initializeI18n()
        setIsI18nInitialized(true)
      } catch (error) {
        console.error('Failed to initialize i18n:', error)
      }
    }

    void initialize()
  }, [])

  return { isI18nInitialized }
}

export const useCurrentLanguage = (): string => {
  const { i18n } = useTranslation()
  return i18n.language
}

export default useTranslation
