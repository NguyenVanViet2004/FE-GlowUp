import * as Icons from '@tamagui/lucide-icons'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

interface DynamicIconProps extends
  React.ComponentProps<typeof Icons.ChevronLeft> {
  name: keyof typeof Icons
  onPress?: () => void
}

const DynamicIcon: React.FC<DynamicIconProps> =
 ({ name, onPress, style, ...props }) => {
   const IconComponent = Icons[name]

   if (typeof IconComponent !== 'function') {
     return null
   }

   return (
     <Pressable onPress={onPress} style={[styles.shadow, style]}>
       <IconComponent {...props} />
     </Pressable>
   )
 }

const shadowColor = '#000'

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
})

export default DynamicIcon
