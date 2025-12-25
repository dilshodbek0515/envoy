import StarIcon from '@/assets/icons/star'
import useThemeColor from '@/theme/useTheme'
import { View, StyleSheet } from 'react-native'

interface RatingStarsProps {
  rating: number
  max?: number
  size?: number
  activeColor?: string
  inactiveColor?: string
}

const getRatingColor = (rating: number) => {
  const Colors = useThemeColor()
  if (rating >= 4.0) return Colors.primary
  if (rating >= 3) return Colors.primary
  if (rating >= 1.5) return Colors.primary
  return Colors.primary
}

const RatingStars = ({
  rating,
  max = 5,
  size = 18,
  activeColor = getRatingColor(rating),
  inactiveColor = '#E0E0E0'
}: RatingStarsProps) => {
  const stars = []

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} size={size} color={activeColor} />)
    } else if (i == Math.floor(rating) + 1 && rating % 1 >= 0.5) {
      stars.push(
        <View key={i} style={{ width: size, height: size }}>
          <StarIcon size={size} color={inactiveColor} />
          <View
            style={{
              position: 'absolute',
              width: size / 2,
              overflow: 'hidden'
            }}
          >
            <StarIcon size={size} color={activeColor} />
          </View>
        </View>
      )
    } else {
      stars.push(<StarIcon key={i} size={size} color={inactiveColor} />)
    }
  }

  return <View style={styles.row}>{stars}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  }
})

export default RatingStars
