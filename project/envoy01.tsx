import { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors, Screens } from '../src/shared/tookens'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

interface Idata {
  id: number
  title: string
  desc: string
  img?: ImageSourcePropType
}

const welcomeData = [
  {
    id: 1,
    title: 'Envoy — Yuk tashish oson!',
    desc: 'Yukingizni xavfsiz va tez yetkazamiz. Envoy yordamida yuk topshiring yoki haydovchi toping.',
    img: require('../../src/assets/images/welcome-first.jpg')
  },
  {
    id: 2,
    title: 'Real vaqtda kuzatuv',
    desc: 'Yukingiz qayerda ekanini xarita orqali kuzating.',
    img: require('../../src/assets/images/welcome-second.jpg')
  },
  {
    id: 3,
    title: 'Pul ishlash imkoniyati',
    desc: 'Haydovchi sifatida ro‘yxatdan o‘ting va yuk tashib daromad oling.',
    img: require('../../src/assets/images/welcome-third.webp')
  }
]

const { width, height } = Dimensions.get('screen')

export default function WlcomePage () {
  const insets = useSafeAreaInsets()
  const [page, setPage] = useState<number>(0)
  const flatLiastRef = useRef<FlatList>(null)

  const masofaAniqligi = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current

  const sahifaAniqligi = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setPage(viewableItems[0].index)
  }).current

  const back = () => {
    if (page > 0) {
      flatLiastRef.current?.scrollToIndex({
        index: page - 1,
        animated: true
      })
    }
  }
  const next = () => {
    if (page < welcomeData.length - 1) {
      flatLiastRef.current?.scrollToIndex({
        index: page + 1,
        animated: true
      })
    }
  }

  const renderItem = ({ item }: { item: Idata }) => {
    return (
      <View style={[styles.pages, { paddingTop: insets.top }]}>
        <Image source={item.img} style={styles.images} resizeMode='cover' />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.desc}</Text>
      </View>
    )
  }

  const backButtonWidth = useSharedValue(0)
  const backButtonOpacity = useSharedValue(0)
  const scrollX = useSharedValue(0)

  useEffect(() => {
    backButtonWidth.value = withTiming(page === 0 ? 0 : 55, { duration: 300 })
    backButtonOpacity.value = withTiming(page === 0 ? 0 : 1, { duration: 200 })
  }, [page])

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: backButtonWidth.value,
    opacity: backButtonOpacity.value
  }))

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x
  })

  return (
    <View>
      <Animated.FlatList
        ref={flatLiastRef}
        data={welcomeData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        viewabilityConfig={masofaAniqligi}
        onViewableItemsChanged={sahifaAniqligi}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      />
      <View style={styles.btnBox}>
        <Pressable style={styles.boshlashBtn} onPress={next}>
          <Text style={styles.boshlashText}>Boshlash</Text>

          <AnimatedPressable
            style={[styles.backButton, backButtonAnimatedStyle]}
            onPress={back}
          >
            <Text style={{ color: '#fff' }}>#</Text>
          </AnimatedPressable>
        </Pressable>
      </View>

      <View style={styles.doteBox}>
        {welcomeData.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const a = [
              (index - 1) * Screens.width,
              index * Screens.width,
              (index + 1) * Screens.width
            ]

            const width = interpolate(
              scrollX.value,
              a,
              [30, Screens.width * 0.6, 30],
              Extrapolate.CLAMP
            )

            const backgroundColor = interpolateColor(scrollX.value, a, [
              '#333',
              Colors.primary,
              '#333'
            ])
            return { width, backgroundColor }
          })

          return (
            <Animated.View key={index} style={[styles.dote, animatedStyle]} />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111'
  },

  pages: {
    width,
    height,
    alignItems: 'center'
  },

  images: {
    width: width * 0.9,
    height: height * 0.55,
    borderRadius: 20
  },

  text: {
    fontSize: 20,
    color: '#666',
    marginTop: 10,
    fontWeight: 'bold'
  },

  btnBox: {
    height: Screens.height * 0.12,
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 0,
    width: Screens.width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10
  },

  boshlashBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    height: Screens.height * 0.075,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  boshlashText: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 2.5,
    color: '#fff'
  },

  backButton: {
    position: 'absolute',
    left: 5,
    height: Screens.height * 0.075 - 10,
    backgroundColor: '#1d1d1d',
    width: 60,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
  },

  doteBox: {
    position: 'absolute',
    top: Screens.height * 0.8,
    height: 30,
    zIndex: 10,
    width: Screens.width,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10
  },

  dote: {
    height: 5,
    borderRadius: 30
  }
})
