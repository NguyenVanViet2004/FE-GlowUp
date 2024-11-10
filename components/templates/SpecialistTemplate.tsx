
import DateComponent from '../molecules/Date'
import Specialist from '../organisms/Specialist'
import NotesComponent from '../atoms/Note'
import LinearGradientBackground from '../molecules/LinearGradientBackground'
import { PositiveButton } from '../atoms/PositiveButton'
import { View } from 'tamagui'

const SpecialistTemplate: React.FC = (): JSX.Element => {
  return (
    <LinearGradientBackground>
      <Specialist/>
      <DateComponent/>
      <NotesComponent/>
      <View marginTop={'25%'} padding={25}>
          <PositiveButton
            title={"send"}
            onPress={() => {}}
          />
        </View>
    </LinearGradientBackground>
  )
}

export default SpecialistTemplate
