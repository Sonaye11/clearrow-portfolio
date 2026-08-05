import { useEffect, useState } from 'react'

export default function UtcClock() {
  const [time, setTime] = useState('UTC 00:00')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const hours = String(now.getUTCHours()).padStart(2, '0')
      const minutes = String(now.getUTCMinutes()).padStart(2, '0')
      setTime(`UTC ${hours}:${minutes}`)
    }

    update()
    const intervalId = window.setInterval(update, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return <span>{time}</span>
}
