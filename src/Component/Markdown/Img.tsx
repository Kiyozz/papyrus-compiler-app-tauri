/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ImgHTMLAttributes } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

const Img = ({ src, alt, node, ...props }: ReactMarkdownProps & ImgHTMLAttributes<HTMLImageElement>) => (
  <img alt={alt} className="mt-2 block max-w-full rounded-lg" src={src} {...props} />
)

export default Img
