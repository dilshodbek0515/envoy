import AppText from '@/components/text'
import { Colors } from '@/shared/tokens'
import React, { useEffect, useState } from 'react'

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AppText
      variant='medium'
      style={{
        width: 20,
        color: Colors.primary,
        fontSize: 14,
        textAlign: 'left',
        flexWrap: 'nowrap'
      }}
    >
      {seconds}
    </AppText>
  )
}

export default CountdownTimer
