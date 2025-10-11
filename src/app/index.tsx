import {
  Button,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Colors, Screens } from '../shared/tookens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useRef, useState } from 'react'
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
  const flatListRef = useRef<FlatList>(null)

  const masofaniAniqlash = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current

  const sahifaniAniqlash = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setPage(viewableItems[0].index)
  }).current

  const back = () => {
    if (page > 0) {
      flatListRef.current?.scrollToIndex({
        index: page - 1,
        animated: true
      })
    }
  }

  const next = () => {
    if (page < welcomeData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: page + 1,
        animated: true
      })
    }
  }

  const renderItem = ({ item }: { item: Idata }) => {
    return (
      <View style={[styles.pages, { paddingTop: insets.top }]}>
        <Image source={item.img} resizeMode='cover' style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.desc}</Text>
      </View>
    )
  }
  const backButtonWidth = useSharedValue(0)
  const backButtonOpacity = useSharedValue(0)
  const ScrollX = useSharedValue(0)

  useEffect(() => {
    backButtonWidth.value = withTiming(page === 0 ? 0 : 55, { duration: 300 })
    backButtonOpacity.value = withTiming(page === 0 ? 0 : 1, { duration: 200 })
  }, [page])

  const backButtonAnimatedStyle = useAnimatedStyle(() => ({
    width: backButtonWidth.value,
    opacity: backButtonOpacity.value
  }))

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const scrollHandler = useAnimatedScrollHandler(e => {
    ScrollX.value = e.contentOffset.x
  })

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={welcomeData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        viewabilityConfig={masofaniAniqlash}
        onViewableItemsChanged={sahifaniAniqlash}
        onScroll={scrollHandler}
      />

      <View style={styles.boxButton}>
        <Pressable onPress={next} style={styles.boshlashBtn}>
          <Text style={styles.boshlashBtnText}>Boshlash</Text>

          <AnimatedPressable
            onPress={back}
            style={[styles.backBtn, backButtonAnimatedStyle]}
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
  pages: {
    width: Screens.width,
    height: Screens.height,
    alignItems: 'center'
  },

  image: {
    width: Screens.width * 0.9,
    height: Screens.height * 0.55,
    borderRadius: 20
  },

  text: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
    marginTop: 10
  },

  boxButton: {
    width: Screens.width,
    height: Screens.height * 0.12,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1d1d1d',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boshlashBtn: {
    width: Screens.width,
    height: Screens.height * 0.075,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boshlashBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 2
  },

  backBtn: {
    position: 'absolute',
    left: 5,
    backgroundColor: 'red',
    width: 60,
    height: Screens.height * 0.08 - 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },

  doteBox: {
    width: Screens.width,
    height: 30,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: Screens.height * 0.8,
    zIndex: 10,
    gap: 10
  },

  dote: {
    height: 5,
    borderRadius: 30
  }
})
