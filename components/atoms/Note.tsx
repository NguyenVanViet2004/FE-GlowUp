import { TamaguiProvider, Stack, Text, TextArea } from "tamagui";

export default function NotesComponent() {
  return (
    <TamaguiProvider>
      <Stack padding={10} borderRadius={5}>
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
    </TamaguiProvider>
  );
}
