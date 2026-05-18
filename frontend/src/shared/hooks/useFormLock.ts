import { useState, useEffect, useCallback } from 'react'

const LOCK_DURATION = 24 * 60 * 60 * 1000
const STORAGE_KEY = 'lead_submitted_timestamp'

export const useFormLock = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false)

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(STORAGE_KEY)
    if (savedTimestamp) {
      const timePassed = Date.now() - parseInt(savedTimestamp, 10)
      if (timePassed < LOCK_DURATION) {
        setIsLocked(true)
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const lockForm = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setIsLocked(true)
  }, [])

  return { isLocked, lockForm }
}
