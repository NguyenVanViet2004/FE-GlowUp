import React from 'react'

import BookingList from '~/components/organisms/BookingList'
import { dataComboList } from '~/constants/ComboListData'

const BookingCompleted = (): React.ReactElement => {
  return (
    <BookingList
      dataCombo={dataComboList}
      visibleTextCancel={false}
      visibleFormButton={true}
      visibleTransparentButton={false}/>
  )
}

export default BookingCompleted
