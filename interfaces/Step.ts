export default interface Step {
  _id: string
  name: string
  description: string
  duration: string | null
  imageUrl: string
  price: number
}
