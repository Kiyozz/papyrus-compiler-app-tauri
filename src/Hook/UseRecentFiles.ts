import { useState } from 'react'

export function useRecentFiles() {
  const moreDetails = useState(false)

  return {
    moreDetails,
    recentFiles: [],
  }
}
