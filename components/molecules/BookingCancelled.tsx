import React from 'react'

import BookingList from '~/components/organisms/BookingList'
import { dataComboList } from '~/constants/ComboListData'

const BookingCancelled = (): React.ReactElement => {
  return (
    <BookingList
      dataCombo={dataComboList}
      visibleTextCancel={true}
      visibleFormButton={false}
      visibleTransparentButton={false}/>
  )
}

export default BookingCancelled
