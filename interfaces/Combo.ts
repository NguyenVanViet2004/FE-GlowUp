interface comboStep {
  _id: string
  stepId: string[]
  duration: string | null
}

export default interface Combo {
  _id: string
  imageUrl: string
  price: number
  name: string
  description: string
  comboStepId: comboStep
  deal: number
  rate: number
}
