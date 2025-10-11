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

export default function WelcomePage () {
  const insets = useSafeAreaInsets()
  const [page, setPage] = useState<number>(0)
  const flatlistRef = useRef<FlatList>(null)

  const masofaniAniqlash = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current

  const sahifaniAniqlash = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setPage(viewableItems[0].index)
  }).current

  const back = () => {
    if (page > 0) {
      flatlistRef.current?.scrollToIndex({
        index: page - 1,
        animated: true
      })
    }
  }
  const next = () => {
    if (page < welcomeData.length - 1) {
      flatlistRef.current?.scrollToIndex({
        index: page + 1,
        animated: true
      })
    }
  }

  const renderItem = ({ item }: { item: Idata }) => {
    return (
      <View style={[styles.pages, { paddingTop: insets.top }]}>
        <Image source={item.img} style={styles.images} resizeMode='cover' />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.desc}</Text>
      </View>
    )
  }

  const backButtonWidth = useSharedValue(0)
  const backButtonOpacity = useSharedValue(0)
  const ScrollX = useSharedValue(0)
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  useEffect(() => {
    backButtonWidth.value = withTiming(page === 0 ? 0 : 55, { duration: 300 })
    backButtonOpacity.value = withTiming(page === 0 ? 0 : 1, { duration: 200 })
  }, [page])

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: backButtonWidth.value,
    opacity: backButtonWidth.value
  }))

  const scrollHandler = useAnimatedScrollHandler(e => {
    ScrollX.value = e.contentOffset.x
  })

  return (
    <View>
      <Animated.FlatList
        ref={flatlistRef}
        renderItem={renderItem}
        data={welcomeData}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        viewabilityConfig={masofaniAniqlash}
        onViewableItemsChanged={sahifaniAniqlash}
        onScroll={scrollHandler}
      />

      <View style={styles.buttonBox}>
        <Pressable onPress={next} style={styles.boshlashBtn}>
          <Text style={styles.boshlashBtnText}>Boshlash</Text>

          <AnimatedPressable
            style={[styles.backBtn, backButtonAnimatedStyle]}
            onPress={back}
          >
            <Text style={{ color: '#fff' }}>@</Text>
          </AnimatedPressable>
        </Pressable>
      </View>

      <View style={styles.doteBox}>
        {welcomeData?.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const a = [
              (index - 1) * Screens.width,
              index * Screens.width,
              (index + 1) * Screens.width
            ]

            const width = interpolate(
              ScrollX.value,
              a,
              [30, Screens.width * 0.6, 30],
              Extrapolate.CLAMP
            )

            const backgroundColor = interpolateColor(ScrollX.value, a, [
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
    width: Screens.width,
    height: Screens.height,
    alignItems: 'center'
  },

  images: {
    width: Screens.width * 0.9,
    height: Screens.height * 0.55,
    borderRadius: 20
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20
  },

  buttonBox: {
    width: Screens.width,
    height: Screens.height * 0.12,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },

  boshlashBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: Screens.height * 0.075,
    borderRadius: 25
  },

  boshlashBtnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 2
  },

  backBtn: {
    position: 'absolute',
    left: 5,
    width: 60,
    backgroundColor: '#222',
    height: Screens.height * 0.075 - 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
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
