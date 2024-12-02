import React from "react"
import { isNil } from "lodash"

import useStorage from "~/hooks/useStorage"

interface props {
  colorScheme: "light" | "dark"
  setTheme: (scheme: "light" | "dark") => Promise<void>
}

export const useColorScheme = (): props => {
  const { getItem, setItem } = useStorage()
  const [colorScheme, setColorScheme] = React.useState<"light" | "dark">(
    "light"
  )

  const setTheme = async (scheme: "light" | "dark"): Promise<void> => {
    await setItem("colorScheme", scheme)
      .then(() => setColorScheme(scheme))
      .catch((err) => console.error(err))
  }

  React.useEffect(() => {
    ;(async () => {
      const savedColorScheme = await getItem("colorScheme")
      if (
        !isNil(savedColorScheme) &&
        (savedColorScheme === "light" || savedColorScheme === "dark")
      ) {
        setColorScheme(savedColorScheme)
      }
    })(),
      []
  })
  return {
    colorScheme,
    setTheme,
  }
}
