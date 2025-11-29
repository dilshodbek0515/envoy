import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import useThemeColor from '@/theme/useTheme'
import { useFetchUserData } from '@/service/user/fetch-profile/controller'
// import { useAtomValue } from 'jotai'

const CustomerProfileLayout = () => {
  const Colors = useThemeColor()
  // const userData = useAtomValue(userDataAtom)
  // const userDataState = useAtomValue(UserDataStateAtom)
  const fetch = useFetchUserData()

  // console.log(userData)
  // console.log(userDataState)

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.pageBackground }
      }}
    />
  )
}

export default CustomerProfileLayout
