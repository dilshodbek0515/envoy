import { Screens } from '@/shared/tokens'
import { IThemeColors } from '@/theme/color'
import useThemeColor from '@/theme/useTheme'
import Login from '@/widget/auth/login/login'
import Register from '@/widget/auth/register/register'
import { useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const pages = [
  {
    id: 1,
    title: 'Login',
    component: <Login />
  },
  {
    id: 2,
    title: 'Register',
    component: <Register />
  }
]

export default function Auth () {
  const [activePage, setActivePage] = useState(0)
  const Colors = useThemeColor()
  const pageRef = useRef<FlatList>(null)
  const scrollX = useSharedValue(0)

  const viewablePage = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActivePage(viewableItems[0].index)
    }
  }).current

  const viewableConfig = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current

  const goToPage = (index: number) => {
    pageRef.current?.scrollToIndex({
      index,
      animated: true
    })
  }

  const handleScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x
  })

  const renderPage = ({ item }: any) => {
    return <View style={styles(Colors).page}>{item.component}</View>
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthTab goToPage={goToPage} scrollX={scrollX} />
      <Animated.FlatList
        ref={pageRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={page => page.id.toString()}
        horizontal
        pagingEnabled
        onViewableItemsChanged={viewablePage}
        viewabilityConfig={viewableConfig}
        onScroll={handleScroll}
      />
    </View>
  )
}

const AuthTab = ({ goToPage, scrollX }: any) => {
  const Colors = useThemeColor()
  const insetTop = useSafeAreaInsets().top
  const height = 70 + insetTop

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, Screens.width],
      [0, Screens.width / 2],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateX }]
    }
  })

  return (
    <View style={[styles(Colors).tabContainer, { height }]}>
      {pages.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = pages.map((_, i) => i * Screens.width)

          const color = interpolateColor(
            scrollX.value,
            inputRange,
            pages.map((_, i) =>
              i === index ? Colors.primary : Colors.textPrimary
            )
          )

          return {
            color
          }
        })
        return (
          <Pressable
            key={item.id}
            style={styles(Colors).tabBox}
            onPress={() => goToPage(index)}
          >
            <Animated.Text style={[styles(Colors).tabTitle, animatedStyle]}>
              {item.title}
            </Animated.Text>
          </Pressable>
        )
      })}

      <Animated.View
        style={[styles(Colors).indicator, indicatorAnimatedStyle]}
      />
    </View>
  )
}

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    page: {
      width: Screens.width
    },
    tabContainer: {
      height: 100,
      backgroundColor: Colors.Boxbackground,
      alignItems: 'flex-end',
      flexDirection: 'row'
    },
    tabBox: {
      flex: 1,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tabTitle: {
      fontSize: 18,
      color: Colors.textPrimary,
      fontWeight: '600'
    },
    indicator: {
      height: 3,
      backgroundColor: Colors.primary,
      bottom: 0,
      left: 0,
      width: Screens.width / 2,
      position: 'absolute',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    }
  })
