import { Stack, Text, TextArea } from 'tamagui'

export default function NotesComponent (): JSX.Element {
  return (
    <Stack padding={10} borderRadius={5} testID="note">
      <Text marginBottom={8}>Notes</Text>
      <TextArea
        placeholder="Type your notes here"
        width="100%"
        padding={10}
        backgroundColor="#f0f4f8"
        borderRadius={10}
        height={120}
        lineHeight={24}
      />
    </Stack>
  )
}
