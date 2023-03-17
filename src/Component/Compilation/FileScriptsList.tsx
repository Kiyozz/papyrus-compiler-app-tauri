/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { CompilationIcon } from 'App/Component/CompilationIcon'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { isBusy, isDone, isFileScriptCompilation, isRunning } from 'App/Lib/FileScriptCompilation'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const MotionPaper = motion(Paper)

function FileScriptsList<T extends FileScript>({
  scripts,
  onStart,
  onRemove,
  onClickOnError,
  disabled = false,
  className,
  animate = false,
}: {
  scripts: T[]
  onRemove: (script: T) => void
  onStart?: (script: T) => Promise<void>
  onClickOnError?: (script: T) => void
  disabled?: boolean
  className?: string
  animate?: boolean
}) {
  const { t } = useTranslation()
  const { refs } = useSettingsTutorial()

  return (
    <TutorialTooltip
      title={t('common.settingsTutorial.compilation.compile')}
      step="compilation-compile"
      ref={refs['compilation-compile']}
    >
      <List
        className={cx('', className)}
        component={motion.div}
        variants={{
          enter: {
            transition: {
              ease: 'easeInOut',
            },
            opacity: 1,
            y: 0,
          },
        }}
        animate={animate ? 'enter' : undefined}
      >
        {scripts.map((script) => {
          return (
            <ListItem
              key={script.id}
              component={MotionPaper}
              className="mt-0.5 [&:first-child]:mt-0"
              variants={{
                enter: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial={{
                opacity: 0,
                y: -10,
              }}
              secondaryAction={
                <IconButton
                  aria-disabled={isFileScriptCompilation(script) ? isRunning(script) || isBusy(script) : false}
                  aria-label={t('common.remove')}
                  color="error"
                  disabled={isFileScriptCompilation(script) ? isRunning(script) || isBusy(script) : false}
                  onClick={() => {
                    onRemove(script)
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              }
              variant="outlined"
            >
              {isFileScriptCompilation(script) ? (
                <ListItemIcon>
                  <IconButton
                    disabled={disabled || isRunning(script) || isBusy(script)}
                    onClick={async () => await onStart?.(script)}
                    className="text-primary-400"
                    edge="end"
                    size="small"
                  >
                    <PlayCircleIcon />
                  </IconButton>
                </ListItemIcon>
              ) : null}
              <ListItemText aria-label={script.name} primary={script.name} />
              {isFileScriptCompilation(script) ? (
                <ListItemIcon>
                  <IconButton
                    onClick={() => onClickOnError?.(script)}
                    size="small"
                    disabled={isRunning(script) || isDone(script) || isBusy(script)}
                  >
                    <CompilationIcon script={script} />
                  </IconButton>
                </ListItemIcon>
              ) : null}
            </ListItem>
          )
        })}
      </List>
    </TutorialTooltip>
  )
}

export default FileScriptsList
