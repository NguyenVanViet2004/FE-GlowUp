import React from 'react'

import BookingList from '~/components/organisms/BookingList'
import { dataComboList } from '~/constants/ComboListData'

const BookingUpcoming = (): React.ReactElement => {
  return (
    <BookingList
      dataCombo={dataComboList}
      visibleTextCancel={false}
      visibleFormButton={true}
      visibleTransparentButton={true}/>
  )
}

export default BookingUpcoming
