import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isEmpty, isNil } from 'lodash'
import React, { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { Image, Text, View, XStack } from 'tamagui'

import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { updateCardInfo } from '~/features/userSlice'
import { useAppDispatch } from '~/hooks/useAppDispatch'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchBank from '~/hooks/useFetchBank'
import useStorage from '~/hooks/useStorage'
import type Bank from '~/interfaces/Bank'
import { type RootState } from '~/redux/store'

const formatCardInfo = (info: string): string => {
  return info.length > 3 ? '*'.repeat(info.length - 3) + info.slice(-3) : info
}

const CardInfo = (): React.JSX.Element => {
  const colors = getColors(useColorScheme().colorScheme)
  const { setObjectItem } = useStorage<string | object>()
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [bankInput, setBankInput] = useState('')
  const dispatch = useAppDispatch()
  const { bank = [] } = useFetchBank()
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const router = useRouter()
  const leftIcon = (
    <ChevronLeft
      color={colors.text}
      size={25}
      onPress={() => {
        router.back()
      }}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />

  const user = useSelector((state: RootState) => state.user)
  const [suggestions, setSuggestions] = useState<Bank[]>([])

  React.useEffect(() => {
    if (
      !isNil(user.result.card_info) &&
      !isEmpty(user.result.card_info.cardHolder) &&
      !isEmpty(user.result.card_info.cardNumber) &&
      !isEmpty(user.result.card_info.expiryDate)
    ) {
      setCardNumber(formatCardInfo(user.result.card_info.cardNumber))
      setCardHolder(user.result.card_info.cardHolder)
      setExpiryDate(user.result.card_info.expiryDate)
      setBankInput(user.result.card_info.bank?.bank_name ?? '')
    }
  }, [user])

  const handleBankInputChange = (value: string): void => {
    setBankInput(value)

    if (value.trim() === '') {
      setSuggestions([])
      return
    }

    const filteredBanks = bank
      .filter((b) => b.bank_name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 2)
    setSuggestions(filteredBanks)
  }

  const handleBankSelect = (bank: Bank): void => {
    setSelectedBank(bank)
    setBankInput(bank.bank_name)
    setSuggestions([])
  }

  const handleSaveCardInfo = async (): Promise<void> => {
    if (
      isEmpty(cardNumber) ||
      isEmpty(cardHolder) ||
      isEmpty(expiryDate) ||
      isEmpty(bankInput)
    ) {
      Toast.show({
        position: 'top',
        text1: 'Thông báo!',
        text2: 'Vui lòng điền đầy đủ thông tin thẻ!',
        type: 'error'
      })
      return
    }

    const cardInfo = {
      bank: selectedBank ?? undefined,
      cardHolder,
      cardNumber,
      expiryDate
    }

    dispatch(updateCardInfo(cardInfo))
    setObjectItem('card_info', cardInfo)
      .then(() => {
        Toast.show({
          position: 'top',
          text1: 'Thông báo!',
          text2: 'Thông tin thẻ đã được lưu!',
          type: 'success'
        })
      })
      .catch((e) => {
        console.error(e)
        Toast.show({
          position: 'top',
          text1: 'Thông báo!',
          text2: 'Lưu thông tin thẻ thất bại!',
          type: 'error'
        })
      })

    router.back()
  }

  return (
    <GradientScrollContainer
      paddingHorizontal={0}
      edges={['left', 'right', 'bottom']}
      headerTitle={'Quay lại'}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      paddingTop={20}>
      <View
        padding={20}
        gap={20}
        borderTopLeftRadius={RADIUS_BUTTON}
        borderTopRightRadius={RADIUS_BUTTON}>
        <Text color={colors.text} fontSize={18} marginBottom={10}>
          Nhập thông tin thẻ của bạn
        </Text>

        {/* <Input
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder='Số thẻ'
          keyboardType='numeric'
          marginBottom={15}
          backgroundColor={colors.inputBackground}
          color={colors.text}
          borderColor={colors.gray}
          placeholderTextColor={colors.gray}
          defaultValue={cardNumber}
        /> */}

        <InputWithIcons
          label="Số thẻ"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Số thẻ"
          keyboardType="numeric"
          defaultValue={cardNumber}
        />

        {/* <Input
          value={cardHolder}
          onChangeText={setCardHolder}
          placeholder='Tên chủ thẻ'
          marginBottom={15}
          backgroundColor={colors.inputBackground}
          color={colors.text}
          borderColor={colors.gray}
          placeholderTextColor={colors.gray}
          defaultValue={cardHolder}
        /> */}

        <InputWithIcons
          label="Tên chủ thẻ"
          value={cardHolder}
          onChangeText={setCardHolder}
          placeholder="Tên chủ thẻ"
          defaultValue={cardHolder}
        />

        {/* <Input
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder='Ngày hết hạn (MM/YY)'
          marginBottom={15}
          backgroundColor={colors.inputBackground}
          color={colors.text}
          borderColor={colors.gray}
          placeholderTextColor={colors.gray}
          defaultValue={expiryDate}
          flex={1}
        /> */}

        <InputWithIcons
          label="Ngày hết hạn"
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="Ngày hết hạn (MM/YY)"
          defaultValue={expiryDate}
        />

        <InputWithIcons
          label="Ngân hàng"
          value={bankInput}
          onChangeText={handleBankInputChange}
          placeholder="Vui lòng chọn ngân hàng của bạn!"
          defaultValue={bankInput}
        />

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            scrollEnabled={false}
            keyExtractor={(item) => item.bank_code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleBankSelect(item)
                }}>
                <XStack justifyContent="center" alignItems="center" mb={10}>
                  <Text
                    flex={1}
                    color={colors.text}
                    fontSize={16}
                    marginLeft={10}>
                    {item.bank_name}
                  </Text>
                  <Image
                    height={30}
                    width={150}
                    source={{ uri: item.logo_link }}
                    objectFit="fill"
                  />
                </XStack>
              </TouchableOpacity>
            )}
          />
        )}

        <PositiveButton
          onPress={() =>
            void handleSaveCardInfo().catch((e) => {
              console.error(e)
            })
          }
          backgroundColor="blueSapphire"
          title="Lưu thông tin thẻ"
        />
      </View>
    </GradientScrollContainer>
  )
}

export default CardInfo
