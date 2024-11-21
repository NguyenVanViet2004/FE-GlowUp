import React from 'react'

import type Stylist from '~/interfaces/Stylist'

export const useFetchStylist = (): { stylist: Stylist[] } => {
  const [stylist, setStylist] = React.useState<Stylist[]>([]) // eslint-disable-line

  return {
    stylist
  }
}
