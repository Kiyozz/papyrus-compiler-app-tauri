/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { open as openExternal } from '@tauri-apps/api/shell'
import { ComponentProps, forwardRef, PropsWithChildren } from 'react'

const AnchorExternal = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<Omit<JSX.IntrinsicElements['a'], 'href'> & { href: string }>
>(({ href, ...props }, ref) => {
  return (
    <a
      ref={ref}
      onClick={() => {
        void openExternal(href)
      }}
      {...props}
    />
  )
})

AnchorExternal.displayName = 'AnchorExternal'

export type AnchorExternalProps = ComponentProps<typeof AnchorExternal>

export default AnchorExternal
