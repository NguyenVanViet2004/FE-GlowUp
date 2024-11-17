import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Stack, Text, TextArea } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

interface NotesComponentProps {
  title?: string
  placeholder?: string
  initialValue?: string
  onSave?: (value: string) => void
  color?: string
}

export default function NotesComponent ({
  title = 'specialist.notes',
  placeholder = 'Type your notes here',
  initialValue = ''
}: NotesComponentProps): JSX.Element {
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const [notes, setNotes] = useState(initialValue)
  const colors = getColors(useColorScheme())

  return (
    <Stack
      borderRadius={5}
      width="93%"
      alignSelf="center"
      shadowOpacity={0.1}
      shadowRadius={5}
    >
      <Text marginBottom={8} fontFamily={fonts.JetBrainsMonoBold}>
        {t(title)}
      </Text>
      <TextArea
        value={notes}
        onChangeText={setNotes}
        placeholder={placeholder}
        width="100%"
        padding={20}
        backgroundColor={colors.lightGray}
        borderRadius={20}
        height={120}
        lineHeight={24}
      />
    </Stack>
  )
}
