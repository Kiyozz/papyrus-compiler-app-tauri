/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type PropsWithChildren } from 'react'

const TutorialContent = ({ children }: PropsWithChildren) => {
  return <section className="fixed inset-0 z-50 flex h-full w-full bg-gray-900">{children}</section>
}

export default TutorialContent
