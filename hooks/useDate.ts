import { isNil } from 'lodash'

import useTranslation from '~/hooks/useTranslation'

const formatDate = (input: Date | string | null): string => {
  const { t } = useTranslation()
  if (isNil(input)) {
    return 'Invalid date' // Giá trị mặc định khi input là null hoặc undefined
  }

  let date: Date

  // Xử lý nếu input là chuỗi
  if (typeof input === 'string') {
    date = new Date(input)
  } else {
    date = input
  }

  // Kiểm tra tính hợp lệ của đối tượng Date
  if (isNaN(date.getTime())) {
    return 'Invalid date' // Giá trị mặc định khi input không hợp lệ
  }

  const options: Intl.DateTimeFormatOptions = {
    // Tháng viết tắt
    day: 'numeric',
    // Năm
    hour: 'numeric',

    // Phút
    hour12: true,

    // Giờ
    minute: 'numeric',

    month: 'short',

    // Ngày
    year: 'numeric' // Định dạng 12 giờ
  }

  return new Intl.DateTimeFormat(
    t('booking.timeLocation'),
    options
  ).format(date)
}

export default formatDate
