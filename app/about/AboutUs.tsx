import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'

const AboutUs = (): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const { fonts } = useAppFonts()
  const router = useRouter()

  // Icons for navigation
  const leftIcon = (
    <ChevronLeft
      size={25}
      color={colors.text}
      onPress={() => { router.back() }}
      hitSlop={{
        bottom: 100,
        left: 100,
        right: 100,
        top: 100
      }}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />

  return (
    <GradientScrollContainer
      headerTitle="Thông tin thêm"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isHeaderCenter={true}>
      {/* Introduction Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Giới thiệu ứng dụng
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          Ứng dụng đặt lịch cắt tóc của chúng tôi giúp bạn dễ dàng quản lý và
          đặt lịch cắt tóc. Với giao diện đơn giản, thân thiện và nhiều tính
          năng tiện ích, chúng tôi cam kết mang lại trải nghiệm tốt nhất cho
          bạn.
        </Text>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Dịch vụ
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          - Đặt lịch cắt tóc theo thời gian phù hợp.{'\n'}- Lựa chọn các dịch
          vụ: cắt tóc, gội đầu, tạo kiểu, nhuộm tóc.{'\n'}- Tìm kiếm và đánh giá
          dịch vụ.
          {'\n'}- Ưu đãi đặc biệt đối với khách hàng thân thiết.
        </Text>
      </View>

      {/* Terms of Service Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Điều khoản và sử dụng
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          Khi sử dụng ứng dụng, bạn đồng ý tuân thủ các điều khoản sau:
          {'\n'}1. Không sử dụng ứng dụng vào mục đích gian lận hoặc không hợp
          pháp.{'\n'}2. Đảm bảo thông tin cá nhân và lịch hẹn là chính xác.
          {'\n'}3. Chúng tôi có quyền thay đổi hoặc ngừng cung cấp dịch vụ mà
          không cần thông báo trước.
        </Text>
      </View>

      {/* Privacy Policy Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Chính sách riêng tư
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          - Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.{'\n'}- Thông
          tin chỉ được sử dụng cho mục đích cung cấp dịch vụ.{'\n'}- Không chia
          sẻ thông tin cá nhân của bạn với bên thứ ba khi chưa có sự đồng ý.
        </Text>
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Liên hệ
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với
          chúng tôi qua:
          {'\n'}- Email: support@glowUp.com{'\n'}- Hotline: +84 123 456 789
          {'\n'}- Website: www.glowUp.com
        </Text>
      </View>

      {/* Frequently Asked Questions Section */}
      <View style={styles.section}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: fonts.JetBrainsMonoBold }
          ]}>
          Câu hỏi thường gặp (FAQ)
        </Text>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: fonts.JetBrains }
          ]}>
          <Text
            style={[
              styles.faqQuestion,
              { color: colors.text, fontFamily: fonts.JetBrains }
            ]}>
            1. Làm sao để đặt lịch?
          </Text>
          {'\n'}
          Để đặt lịch, chỉ cần chọn dịch vụ và thời gian phù hợp từ trong ứng
          dụng.
          {'\n'}
          {'\n'}
          <Text
            style={[
              styles.faqQuestion,
              { color: colors.text, fontFamily: fonts.JetBrains }
            ]}>
            2. Tôi có thể thay đổi lịch hẹn không?
          </Text>
          {'\n'}
          Không, bạn không thể thay đổi lịch hẹn sau khi chúng tôi đã lên lịch,
          tuy nhiên bạn có thể huỷ buổi hẹn đó trước 2 ngày và đặt lại lịch hẹn
          mới.
        </Text>
      </View>
    </GradientScrollContainer>
  )
}
/* eslint-disable */
const styles = StyleSheet.create({
  content: {
    color: '#333',
    fontSize: 14,
    lineHeight: 22
  },
  faqQuestion: {
    color: '#333',
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
})
/* eslint-enable */
export default AboutUs
