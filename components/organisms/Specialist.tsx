import Feather from '@expo/vector-icons/Feather'
import { isNil } from 'lodash'
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState
} from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Avatar, Text, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import type Stylist from '~/interfaces/Stylist'

interface ISpecialist {
  toSetSelectedUser?: Dispatch<SetStateAction<Stylist | null>>
}

const Specialist: React.FC<ISpecialist> = (props: ISpecialist) => {
  const colorScheme = useColorScheme()
  const colors = getColors(colorScheme.colorScheme)
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  )
  const [users, setUsers] = useState<Stylist[]>([])

  /* eslint-disable */
  useEffect(() => {
    const fetchStylists = async (): Promise<void> => {
      try {
        const response = await request.get<Stylist[]>("/stylist/")
        if (
          response?.success &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          // Gán dữ liệu vào state
          const formattedData = response.data.map((user) => ({
            ...user,
            profile: {
              ...(user.profile ?? {}),
              stylist: user.profile?.stylist ?? { isWorking: false }, // Đảm bảo stylist luôn tồn tại
            },
          }))
          setUsers(formattedData)
        } else {
          console.error(
            "Failed to fetch stylist data:",
            response?.message || "Invalid response structure"
          )
        }
      } catch (error) {
        console.error("Error fetching stylist data:", error)
      }
    }

    void fetchStylists()
  }, [])

  const handleAvatarPress = (index: number): void => {
    const idx = index === selectedUserIndex ? null : index
    if (!isNil(props.toSetSelectedUser)) {
      !isNil(idx)
        ? props.toSetSelectedUser(users[idx])
        : props.toSetSelectedUser(null)
    }
    setSelectedUserIndex(idx)
  }

  const renderUser = ({
    item,
    index,
  }: {
    item: Stylist
    index: number
  }): JSX.Element => {
    const isSelectable = item.profile?.stylist?.isWorking === true // Kiểm tra isWorking

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelectable) {
            handleAvatarPress(index)
          }
        }}
        style={[
          styles.avatarContainer,
          !isSelectable && styles.avatarDisabled, // Style cho Avatar không thể chọn
        ]}
        disabled={!isSelectable} // Vô hiệu hóa nút nhấn nếu không thể chọn
      >
        <Avatar
          circular
          size={80}
          borderWidth={index === selectedUserIndex ? 3 : 0}
          borderColor={isSelectable ? colors.labelButton : colors.gray}
          style={
            index === selectedUserIndex ? styles.avatarSelected : undefined
          }>
          <Avatar.Image
            source={{
              uri: item.avatar?.trim() ?? "https://via.placeholder.com/80",
            }}
          />
          {index === selectedUserIndex && isSelectable && (
            <Feather
              name='check'
              size={24}
              color={colors.labelButton}
              style={styles.checkIcon}
            />
          )}
        </Avatar>
        <Text color={colors.text}>{item.full_name || t("specialist.unknown")}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View padding={14}>
      <Text color={colors.text} fontFamily={fonts.JetBrainsMonoBold}>
        {t("specialist.speciaList")}
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Xử lý khi id null
        renderItem={renderUser}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    padding: 10,
  },
  avatarDisabled: {
    opacity: 0.3,
  },
  avatarSelected: {
    opacity: 0.5,
  },
  checkIcon: {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  listContainer: {
    marginTop: 14,
    paddingHorizontal: 10,
  },
})

export default Specialist
