import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import WelcomeBackgroundImage from '../widget/welcome/welcomeBackgroundImage'
import { router } from 'expo-router'
import { Screens } from '../shared/tokens'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { BlurView } from 'expo-blur'
import { TextInput } from 'react-native-gesture-handler'
import WelcomePageList from '@/widget/welcome/page-list'
import WelcomeDoteBox from '@/widget/welcome/dote'
import WelcomeButton from '@/widget/welcome/button'
import { welcomeData } from '@/widget/welcome/data'

const LANGS = [
  { key: 'uz', label: "O'zbekcha (uz)" },
  { key: 'ru', label: 'Русский (ru)' },
  { key: 'kk', label: 'Қазақша (kk)' },
  { key: 'ky', label: 'Кыргызча (ky)' },
  { key: 'tg', label: 'Тоҷикӣ (tg)' },
  { key: 'tk', label: 'Türkmençe (tk)' },
  { key: 'tr', label: 'Türkçe (tr)' },
  { key: 'zh', label: '中文 (zh)' },
  { key: 'en', label: 'English (en)' }
]

export default function WelcomePage () {
  const flatListRef = useRef<FlatList>(null)
  const [page, setPage] = useState<number>(0)
  const ScrollX = useSharedValue(0)
  const sheetRef = useRef<BottomSheetModalMethods | null>(null)

  const [selectedLang, setSelectedLang] = useState('uz')
  const [query, setQuery] = useState('')
  const snapPoints = useMemo(() => ['40%', '70%'], [])

  const openSheet = useCallback(() => sheetRef.current?.present(), [])
  const closeSheet = useCallback(() => sheetRef.current?.dismiss(), [])

  const filterLangs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return LANGS
    return LANGS.filter(
      l => l.label.toLowerCase().includes(q) || l.key.toLowerCase().includes(q)
    )
  }, [query])

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
    } else {
      router.push('auth')
    }
  }

  const onSelectLang = (langKey: string) => {
    setSelectedLang(langKey)
    closeSheet()
  }

  return (
    <View>
      <WelcomePageList
        flatListRef={flatListRef}
        setPage={setPage}
        ScrollX={ScrollX}
      />
      <WelcomeDoteBox ScrollX={ScrollX} />
      <WelcomeButton page={page} next={next} back={back} />
      <WelcomeBackgroundImage activePage={page} welcomeScrollX={ScrollX} />

      <Pressable style={styles.langButton} onPress={openSheet}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
          {selectedLang.toUpperCase()}
        </Text>
      </Pressable>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: Platform.OS === 'ios' ? '#000' : 'rgba(34,34,34,0.9)'
        }}
      >
        {Platform.OS === 'ios' ? (
          <BlurView intensity={50} tint='dark' style={styles.blurContainer}>
            <SheetContent
              query={query}
              setQuery={setQuery}
              filterLangs={filterLangs}
              selectedLang={selectedLang}
              onSelectLang={onSelectLang}
            />
          </BlurView>
        ) : (
          <View>
            <SheetContent
              query={query}
              setQuery={setQuery}
              filterLangs={filterLangs}
              selectedLang={selectedLang}
              onSelectLang={onSelectLang}
            />
          </View>
        )}
      </BottomSheetModal>
    </View>
  )
}

function SheetContent ({
  query,
  setQuery,
  filterLangs,
  selectedLang,
  onSelectLang
}: any) {
  return (
    <BottomSheetView style={styles.sheetInner}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Tilni qidirish...'
        placeholderTextColor='#999'
        style={styles.searchInput}
      />

      <FlatList
        data={filterLangs}
        keyExtractor={item => item.key}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => {
          const isActive = item.key === selectedLang
          return (
            <Pressable
              style={[styles.langRow, isActive && styles.langRowActive]}
              onPress={() => onSelectLang(item.key)}
            >
              <Text style={[styles.langText && styles.langTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          )
        }}
      />
    </BottomSheetView>
  )
}

const styles = StyleSheet.create({
  langButton: {
    position: 'absolute',
    top: Screens.height * 0.07,
    left: Screens.width * 0.07,
    backgroundColor: '#33333387',
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  blurContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(34,34,34,0.3)'
  },

  androidContainer: {
    flex: 1,
    backgroundColor: 'rgba(34,34,34,0.9)',
    borderRadius: 20,
    overflow: 'hidden'
  },

  sheetInner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10
  },

  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16
  },

  list: {
    marginTop: 10
  },

  langRow: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#222',
    marginBottom: 6
  },

  langRowActive: {
    backgroundColor: '#444'
  },

  langText: {
    color: '#ccc',
    fontSize: 16
  },

  langTextActive: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
