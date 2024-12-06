import { isNil } from 'lodash'

/**
 * Định dạng chuỗi ngày ISO thành 'Tháng M, ngày DD năm YYYY'.
 *
 * @param isoDate - Chuỗi ngày ISO (ví dụ: '2021-03-10T00:00:00Z').
 * @returns Chuỗi định dạng tiếng Việt 'Tháng M, ngày DD năm YYYY'.
 */
export function formatDateToLongForm (isoDate: string): string {
  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    throw new Error('Chuỗi ngày không hợp lệ')
  }

  const month = date.getMonth() + 1 // Lấy tháng (0-11 nên +1)
  const day = date.getDate() // Lấy ngày
  const year = date.getFullYear() // Lấy năm

  return `${day}/${month}/${year}`
}
/**
 * Trích xuất thời gian (HH:mm SA/CH) từ một chuỗi ngày giờ ISO.
 *
 * @param isoDate - Chuỗi ngày giờ ISO (ví dụ: '2021-03-10T15:45:00Z').
 * @returns Chuỗi thời gian định dạng 'HH:mm SA/CH'.
 */
export function extractTimeWithPeriod (isoDate: string): string {
  if (isNil(isoDate) || isoDate === '') {
    throw new Error('Chuỗi ngày giờ không được cung cấp')
  }

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    throw new Error('Chuỗi ngày giờ không hợp lệ')
  }

  let hours = date.getHours() // Lấy giờ (0-23)
  const minutes = String(date.getMinutes()).padStart(2, '0') // Lấy phút (0-59)
  const period = hours < 12 ? 'SA' : 'CH' // Xác định SA (Sáng) hoặc CH (Chiều)

  // Chuyển sang định dạng 12 giờ
  hours = (hours % 12 === 0 ? 12 : hours % 12)

  return `${String(hours).padStart(2, '0')}:${minutes} ${period}`
}
