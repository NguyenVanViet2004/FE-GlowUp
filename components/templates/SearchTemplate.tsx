import { Search, X } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { debounce, isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { Button, Image, Input, ScrollView, Text, XStack, YStack } from 'tamagui'

import { BASE_URL } from '~/apis/HttpClient'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import type Combo from '~/interfaces/Combo'

const SearchTempale: React.FC = (): JSX.Element => {
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()
  const router = useRouter()

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', text: 'Hair service' },
    { id: '2', text: 'Nail' },
    { id: '3', text: 'Wax' },
    { id: '4', text: 'Plush' }
  ])

  const popularTags = useMemo(
    () => [
      { id: '1', text: 'Hair' },
      { id: '2', text: 'Nails' },
      { id: '3', text: 'Plush' },
      { id: '4', text: 'Message' },
      { id: '5', text: 'Facials' }
    ],
    []
  )

  interface SearchResult {
    id: string
    name: string
    picture: string
    price: number
  }

  // Animation
  const animationValue = useSharedValue(0)

  useEffect(() => {
    if (searchResults.length > 0) {
      animationValue.value = withSpring(1, { damping: 15, stiffness: 100 })
    } else {
      animationValue.value = withSpring(0)
    }
  }, [searchResults])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animationValue.value,
    transform: [{ scale: animationValue.value }]
  }))

  const searchByName = debounce(async (searchQuery: string): Promise<void> => {
    if (isEmpty(searchQuery.trim())) {
      setSearchResults([])
      return
    }

    try {
      const response = await fetch(
        `${BASE_URL}/combo/search?search=${encodeURIComponent(searchQuery)}`,
        { headers: { Accept: '*/*' }, method: 'GET' }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: SearchResult[] = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, 500)

  useEffect(() => {
    searchByName(searchInput)?.catch(e => { console.error(e) })
    if (
      searchInput.trim() !== '' &&
      !recentSearches.some(
        (item) => item.text.toLowerCase() === searchInput.toLowerCase()
      )
    ) {
      setRecentSearches((prevSearches) => [
        { id: String(prevSearches.length + 1), text: searchInput },
        ...prevSearches
      ])
    }
  }, [searchInput])

  const handleSearchItemClick = (text: string): void => {
    setSearchInput(text)
  }

  const redirectToComboDetail = (combo: Combo): void => {
    router.push({
      params: { item: JSON.stringify(combo) },
      pathname: '/combo/ComboDetails'
    })
  }

  const styles = StyleSheet.create({
    animated: { paddingHorizontal: 16 },
    scrollContentContainer: { paddingBottom: 16 },
    scrollView: { maxHeight: 200 }
  })

  return (
    <GradientScrollContainer
      paddingHorizontal={0}
      edges={['left', 'right', 'bottom']}
      headerTitle="Tìm kiếm"
      isHeaderCenter>
      <XStack
        ai="center"
        bg={colors.bgSearch}
        br="$4"
        padding={10}
        marginHorizontal={10}
        mb="$4"
        borderRadius={RADIUS_BUTTON}>
        <Search size={20} color={colors.blueSapphire} />
        <Input
          f={1}
          placeholder="Tìm kiếm ở đây nhé baby ..."
          placeholderTextColor="$gray9"
          bg="transparent"
          borderWidth={0}
          pl="$2"
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text)
          }}
          color={colors.black}
        />
      </XStack>

      <YStack px="$4" mb="$6">
        <Text
          fontSize={16}
          fontFamily={fonts.JetBrainsMonoBold}
          color={colors.text}>
          Tìm kiếm gần đây
        </Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}>
          {recentSearches.map((item) => (
            <XStack
              key={item.id}
              ai="center"
              jc="space-between"
              py="$3"
              borderBottomWidth={1}
              borderColor="$gray4">
              <Text
                color={colors.text}
                onPress={() => {
                  handleSearchItemClick(item.text)
                }}>
                {item.text}
              </Text>
              <X
                size={20}
                color="$gray9"
                onPress={() => {
                  setRecentSearches(
                    recentSearches.filter((r) => r.id !== item.id)
                  )
                }}
              />
            </XStack>
          ))}
        </ScrollView>
      </YStack>

      {/* Popular Search */}
      <YStack px="$4" mb="$6">
        <Text
          fontFamily={fonts.JetBrainsMonoBold}
          fontSize={16}
          mb="$4"
          color={colors.text}>
          Popular Search
        </Text>
        <XStack flexWrap="wrap" gap="$2">
          {popularTags.map((tag) => (
            <Button
              key={tag.id}
              bg={colors.bgInput}
              px="$4"
              py="$2"
              br="$3"
              chromeless
              borderRadius={50}
              onPress={() => {
                handleSearchItemClick(tag.text)
              }}>
              <Text fontSize={14} color={colors.blueSapphire}>
                {tag.text}
              </Text>
            </Button>
          ))}
        </XStack>
      </YStack>

      {searchResults.length > 0 && (
        <Animated.View style={[animatedStyle, styles.animated]}>
          <YStack mb="$6">
            <Text
              fontSize={16}
              fontFamily={fonts.JetBrainsMonoBold}
              mb="$4"
              color={colors.text}>
              Kết quả tìm kiếm
            </Text>
            {searchResults.map((item) => (
              <XStack
                key={item.id}
                ai="center"
                jc="space-between"
                py="$3"
                borderWidth={0.2}
                borderColor={colors.gray}
                borderRadius={10}
                backgroundColor={colors.mistWhite}
                onPress={() => {
                  redirectToComboDetail(item as Combo)
                }}>
                <Image
                  source={
                    !isEmpty(item.picture)
                      ? { uri: item.picture }
                      : require('../../assets/images/backGroundDetail.png')
                  }
                  marginHorizontal={10}
                  height={60}
                  width={60}
                  borderRadius={10}
                />
                <YStack flex={1} px="$4">
                  <Text fontFamily={fonts.JetBrainsMonoBold}>{item.name}</Text>
                  <Text>${item.price}</Text>
                </YStack>
              </XStack>
            ))}
          </YStack>
        </Animated.View>
      )}
    </GradientScrollContainer>
  )
}

export default SearchTempale
