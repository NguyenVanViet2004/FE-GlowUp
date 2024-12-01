import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NotesComponent from '~/components/atoms/Note'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import DateComponent from '~/components/molecules/Date'
import Specialist from '~/components/organisms/Specialist'
import useTranslation from '~/hooks/useTranslation'

import TimePicker from '../molecules/Time'
const SpecialistTemplate: React.FC = (): JSX.Element => {
  const router = useExpoRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => router.goBack()} />
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  // const stylist = {
  //   avatar: null,
  //   email: 'jane.doe@example.com',
  //   experience: '5 years',
  //   full_name: 'Jane Doe',
  //   gender: GenderEnum.FEMALE,
  //   id: 'stylist1',
  //   isActive: true,
  //   phoneNumber: '123456789',
  //   position: 'Hair Stylist',
  //   rating: 4.5,
  //   workSchedule: '07:30-22:30'
  // }

  // const handleTimeSelected = (stylistId: string, selectedTime: string) => {
  //   console.log(`Stylist ${stylistId} selected time: ${selectedTime}`)
  // Gửi dữ liệu tới API
  // fetch('/api/book-time', {
  //   method: 'POST',
  //   body: JSON.stringify({ stylistId, selectedTime })
  // })
  // }
  return (
    <>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={t('specialist.title')}
        isHeaderCenter={true}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        paddingTop={10}
      >
        <Specialist />
        <DateComponent />
        <TimePicker/>
        {/* <NotesComponent
          title={t('specialist.notes')}
          placeholder="Write your thoughts here..."
          onSave={(value) => {
            console.log('Saved Notes:', value)
            // Thực hiện lưu trữ hoặc gọi API
          }}

        /> */}
      </GradientScrollContainer>

      <PositiveButton
        title={t('specialist.send')}
        onPress={() => {}}
        marginHorizontal={20}
        position="absolute"
        left={0}
        right={0}
        bottom={insets.bottom === 0 ? 20 : insets.bottom}

      />
    </>
  )
}

export default SpecialistTemplate
