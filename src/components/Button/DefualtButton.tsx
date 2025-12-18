import { Pressable, PressableProps, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { useAndroidRipple } from '@/shared/tokens'

interface Props extends PressableProps {
  children: ReactNode
}

const DefualtButton = ({ children, ...props }: Props) => {
  const ripple = useAndroidRipple()
  return (
    <Pressable android_ripple={ripple} {...props}>
      {children}
    </Pressable>
  )
}

export default DefualtButton

const styles = StyleSheet.create({})
