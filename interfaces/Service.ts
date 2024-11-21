export default interface Service {
  id: string
  name: string
  price: string
  description: string
  picture: string | null
  total_time: number | null
  createdAt: string
  updatedAt: string | null
  deleted: boolean
}
