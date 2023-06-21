/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlusIcon } from '@heroicons/react/24/solid'
import { Slottable } from '@radix-ui/react-slot'
import is from '@sindresorhus/is'
import * as Button from 'App/Component/UI/Button'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { fileScriptsCompilationToFileScripts } from 'App/Lib/FileScriptsCompilationToFileScripts'
import { forwardRef, type PropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CreateGroupFromScriptsButton = forwardRef<
  Button.ButtonElement,
  PropsWithoutRef<Button.ButtonProps> & {
    scripts: FileScriptCompilation[]
  }
>(({ scripts, className, ...props }, ref) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()

  return (
    <Button.Root
      {...props}
      ref={ref}
      className={className}
      disabled={is.emptyArray(scripts)}
      onClick={() => {
        trackEvent({
          category: 'Compilation',
          action: 'Create group from scripts',
          value: scripts.length,
        })

        navigate('/groups', {
          state: {
            scripts: fileScriptsCompilationToFileScripts(scripts),
          },
        })
      }}
      variant="secondary"
      color="inherit"
    >
      <Button.Icon edge="start">
        <PlusIcon />
      </Button.Icon>
      <Slottable>{t('common.createGroup')}</Slottable>
    </Button.Root>
  )
})

CreateGroupFromScriptsButton.displayName = 'CreateGroupFromScriptsButton'

export default CreateGroupFromScriptsButton
