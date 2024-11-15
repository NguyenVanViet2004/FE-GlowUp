import { TamaguiProvider, Stack, Text, TextArea } from "tamagui";

export default function NotesComponent() {
  return (
    <Stack
      borderRadius={5}
      width="90%" // Chiều rộng nhỏ hơn để tạo khoảng cách hai bên
      alignSelf="center" // Căn giữa Stack trong màn hình
    >
      <Text marginBottom={8}>Notes</Text>
      <TextArea
        placeholder="Type your notes here"
        width="100%"
        padding={20}
        backgroundColor="#f0f4f8"
        borderRadius={20}
        height={120}
        lineHeight={24}
      />
    </Stack>
  );
}
