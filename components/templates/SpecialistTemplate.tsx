import DateComponent from '../molecules/Date'
import Specialist from '../organisms/Specialist'
import NotesComponent from '../atoms/Note'
import LinearGradientBackground from '../molecules/LinearGradientBackground'
import { PositiveButton } from '../atoms/PositiveButton'
import { View } from 'tamagui'
import GradientScrollContainer from '../molecules/container/GradientScrollContainer'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
import { useColorScheme } from 'react-native'
const SpecialistTemplate: React.FC = (): JSX.Element => {
  const fonts = useAppFonts()
  const colors = getColors(useColorScheme())
  const router = useExpoRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => router.goBack()}/>
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()

  return (
    <LinearGradientBackground>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={t('đặt lịch ')}
        isHeaderCenter={true}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        paddingTop={20}
        padding={10}>
        <Specialist/>
      <DateComponent/>
      <NotesComponent/>
      <View marginTop={'25%'} padding={25}>
          <PositiveButton
            title={"send"}
            onPress={() => {}}
          />
        </View>
      </GradientScrollContainer>
      
    </LinearGradientBackground>
  )
}

export default SpecialistTemplate
