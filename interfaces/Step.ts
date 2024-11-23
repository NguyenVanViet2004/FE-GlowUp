export default interface Step {
  id: string
  name: string
  description: string
  total_time?: string | null
  picture: string
  price: string
  createdAt?: string
  updatedAt?: string
}
