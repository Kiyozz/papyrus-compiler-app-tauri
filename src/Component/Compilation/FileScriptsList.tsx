/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { CompilationIcon } from 'App/Component/CompilationIcon'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import * as Button from 'App/Component/UI/Button'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { isBusy, isDone, isFileScriptCompilation, isRunning } from 'App/Lib/FileScriptCompilation'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import * as List from 'App/Component/UI/List'

function FileScriptsList<T extends FileScript>({
  scripts,
  onStart,
  onRemove,
  onClickOnError,
  disabled = false,
  className,
}: {
  scripts: T[]
  onRemove: (script: T) => void
  onStart?: (script: T) => Promise<void>
  onClickOnError?: (script: T) => void
  disabled?: boolean
  className?: string
}) {
  const { t } = useTranslation()
  const { refs } = useSettingsTutorial()

  return (
    <TutorialTooltip
      title={t('common.settingsTutorial.compilation.compile')}
      step="compilation-compile"
      ref={refs['compilation-compile']}
    >
      <List.Root className={className} key="list" asChild>
        <motion.ul key="list">
          {scripts.map((script) => {
            return (
              <List.Item asChild key={script.id}>
                <motion.li
                  key={script.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring' }}
                  className="flex items-center gap-x-3 px-4 py-2"
                >
                  {isFileScriptCompilation(script) ? (
                    <Button.Root
                      variant="ghost"
                      className="hover:text-primary-500"
                      disabled={disabled || isRunning(script) || isBusy(script)}
                      onClick={async () => await onStart?.(script)}
                    >
                      <Button.Icon size="lg">
                        <PlayCircleIcon />
                      </Button.Icon>
                    </Button.Root>
                  ) : null}
                  <p className="grow leading-6">{script.name}</p>
                  {isFileScriptCompilation(script) ? (
                    <Button.Root
                      color="error"
                      variant="ghost"
                      size="xs"
                      disabled={isRunning(script) || isDone(script) || isBusy(script)}
                      onClick={() => onClickOnError?.(script)}
                    >
                      <AnimatePresence>
                        <Button.Icon>
                          <CompilationIcon script={script} />
                        </Button.Icon>
                      </AnimatePresence>
                    </Button.Root>
                  ) : null}
                  <Button.Root
                    color="error"
                    variant="ghost"
                    disabled={isFileScriptCompilation(script) ? isRunning(script) || isBusy(script) : false}
                    onClick={() => {
                      onRemove(script)
                    }}
                  >
                    <span className="sr-only">{t('common.remove')}</span>
                    <Button.Icon>
                      <TrashIcon />
                    </Button.Icon>
                  </Button.Root>
                </motion.li>
              </List.Item>
            )
          })}
        </motion.ul>
      </List.Root>
    </TutorialTooltip>
  )
}

export default FileScriptsList
