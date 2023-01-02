/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useState } from 'react'

export function useRecentFiles() {
  const moreDetails = useState(false)

  return {
    moreDetails,
    recentFiles: [],
  }
}
