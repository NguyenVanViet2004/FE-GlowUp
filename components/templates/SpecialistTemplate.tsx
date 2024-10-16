import { View } from 'tamagui'

import DateComponent from '../molecules/Date'
import Specialist from '../organisms/Specialist'

const SpecialistTemplate: React.FC = (): JSX.Element => {
  return (
    <View padding={20}>
      <Specialist/>
      <DateComponent/>
    </View>
  )
}

export default SpecialistTemplate
