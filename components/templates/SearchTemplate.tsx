import {
  Search,
  X
} from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import {
  Button,
  Image,
  Input,
  ScrollView,
  Text,
  XStack,
  YStack
} from 'tamagui'

import { BASE_URL } from '~/apis/HttpClient'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'

const SearchTempale: React.FC = (): JSX.Element => {
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', text: 'Hair service' },
    { id: '2', text: 'Nail' },
    { id: '3', text: 'Wax' },
    { id: '4', text: 'Plush' }
  ])
  const popularTags = [
    { id: '1', text: 'Hair' },
    { id: '2', text: 'Nails' },
    { id: '3', text: 'Plush' },
    { id: '4', text: 'Message' },
    { id: '5', text: 'Facials' }
  ]
  interface SearchResult {
    id: string
    name: string
    picture: string
    price: number
  }

  const [searchInput, setSearchInput] = useState('') // Trạng thái lưu giá trị input
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null) // Trạng thái lưu timeout ID
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]) // Mảng các đối tượng SearchResult
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()

  const searchByName = async (searchQuery: string): Promise<void> => {
    try {
      const normalizedQuery = searchQuery.toLowerCase()
      const response = await fetch(
        `${BASE_URL}/combo/search?search=${encodeURIComponent(
          normalizedQuery
        )}`,
        {
          headers: {
            Accept: '*/*'
          },
          method: 'GET'
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: SearchResult[] = await response.json()
      console.log(data)
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    // Clear previous timeouts on cleanup
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    if (searchInput && searchInput.trim() !== '') {
      // Set timeout to search after 500ms
      const searchTimeoutId = setTimeout(() => {
        void searchByName(searchInput) // Use void to suppress the promise warning
      }, 500)
      setTimeoutId(searchTimeoutId)

      // Add input to recentSearches after 5 seconds, if not already present
      const addToRecentSearchesTimeoutId = setTimeout(() => {
        if (
          !recentSearches.some(
            (item) => item.text.toLowerCase() === searchInput.toLowerCase()
          )
        ) {
          setRecentSearches((prevSearches) => [
            { id: String(prevSearches.length + 1), text: searchInput },
            ...prevSearches
          ])
        }
      }, 5000)

      // Cleanup on next effect or unmount
      return () => {
        clearTimeout(searchTimeoutId)
        clearTimeout(addToRecentSearchesTimeoutId)
      }
    } else {
      setSearchResults([])
    }
  }, [searchInput, recentSearches])

  // Set the search input when a recent search or popular tag is clicked
  const handleSearchItemClick = (text: string): void => {
    setSearchInput(text)
  }

  // Style objects
  const inputStyle = {
    bg: 'transparent'
  }

  const imageStyle = {
    borderRadius: 8,
    height: 50,
    margin: 10,
    width: 50
  }

  return (
    <GradientScrollContainer
      paddingHorizontal={0}
      edges={['left', 'right', 'bottom']}
      headerTitle="Search"
      isHeaderCenter
      paddingTop={20}
    >
      {/* Search Input */}
      <XStack
        ai="center"
        bg={colors.bgSearch}
        br="$4"
        padding={10}
        marginHorizontal={10}
        mb="$4"
        borderRadius={40}
      >
        <Search size={20} color="blue" marginLeft={10} />
        <Input
          f={1}
          placeholder="Search salon or service.."
          placeholderTextColor="$gray9"
          bg="transparent"
          borderWidth={0}
          focusStyle={inputStyle}
          pl="$2"
          padding={10}
          value={searchInput}
          onChangeText={(text) => { setSearchInput(text.toLowerCase()) }}
          color={colors.black}
        />
      </XStack>

      <ScrollView flex={1}>
        {/* Recent Searches */}
        <YStack px="$4" mb="$6">
          <Text fontSize={16}
            fontFamily={fonts.JetBrainsMonoBold}
            color={colors.text}>
            Recents
          </Text>
          {recentSearches.map((item) => (
            <XStack
              key={item.id}
              ai="center"
              jc="space-between"
              py="$3"
              borderBottomWidth={1}
              borderColor="$gray4"
            >
              <Button
                chromeless
                onPress={() => { handleSearchItemClick(item.text) }}
              >
                <Text color={colors.text}> {item.text}</Text>
              </Button>
              <Button
                icon={<X size={20} color="$gray9" />}
                chromeless
                onPress={() => {
                  setRecentSearches(
                    recentSearches.filter((r) => r.id !== item.id)
                  )
                }}
              />
            </XStack>
          ))}
        </YStack>

        {/* Popular Search */}
        <YStack px="$4" mb="$6">
          <Text
            fontFamily={fonts.JetBrainsMonoBold}
            fontSize={16} mb="$4"
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
                onPress={() => { handleSearchItemClick(tag.text) }}
              >
                <Text
                  fontSize={14}
                  color={colors.blueSapphire}>
                  {tag.text}
                </Text>
              </Button>
            ))}
          </XStack>
        </YStack>

        {/* Kết quả tìm kiếm */}
        {searchResults.length > 0 && (
          <YStack px="$4" mb="$6">
            <Text
              fontSize={16}
              fontFamily={fonts.JetBrainsMonoBold}
              color={colors.text}>
              Search Results
            </Text>
            {searchResults.map((item) => (
              <XStack
                key={item.id}
                ai="center"
                jc="space-between"
                py="$3"
                borderBottomWidth={1}
                borderColor="$gray4"
                backgroundColor={colors.lightGray}
                borderRadius={20}
              >
                <Image
                  source={{ uri: item.picture }}
                  style={imageStyle}
                />
                <YStack flex={1} px="$4">
                  <Text
                    fontFamily={fonts.JetBrainsMonoBold}>{item.name}</Text>
                  <Text>${item.price}</Text>
                </YStack>
              </XStack>
            ))}
          </YStack>
        )}
      </ScrollView>
    </GradientScrollContainer>
  )
}

export default SearchTempale
