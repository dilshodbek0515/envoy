import { FlatList, Image, ImageSourcePropType, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { welcomeStyle } from '../../../style'
import { RefObject, useRef } from 'react'
import { welcomeData } from '../data'
import { Spacing } from '../../../../shared/tokens'

interface Idata {
  id: number
  title: string
  desc: string
  img?: ImageSourcePropType
}

interface Iprops {
  flatListRef: RefObject<FlatList | null>
  setPage: (value: number) => void
  ScrollX: any
}

export default function WelcomePageList ({
  flatListRef,
  setPage,
  ScrollX
}: Iprops) {
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }: { item: Idata }) => {
    return (
      <View style={[welcomeStyle.pages, { paddingTop: insets.top }]}>
        <Image
          source={item.img}
          resizeMode='cover'
          style={welcomeStyle.image}
        />
        <View
          style={{
            paddingHorizontal: Spacing.horizontal + 5,
            marginTop: 30,
            gap: 10
          }}
        >
          <Text style={welcomeStyle.title}>{item.title}</Text>
          <Text style={welcomeStyle.desc}>{item.desc}</Text>
        </View>
      </View>
    )
  }

  const sahifaniAniqlash = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setPage(viewableItems[0].index)
  }).current

  const masofaniAniqlash = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current

  const scrollHandler = useAnimatedScrollHandler(e => {
    ScrollX.value = e.contentOffset.x
  })

  return (
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
  )
}
