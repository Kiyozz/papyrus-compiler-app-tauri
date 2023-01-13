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
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { IconFromStatus, isRunning, isFileScriptCompilation } from 'App/Lib/FileScriptCompilation'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

function FileScriptsList<T extends FileScript>({
  scripts,
  onStart,
  onRemove,
  className,
}: {
  scripts: T[]
  onRemove: (script: T) => void
  onStart?: (script: T) => void
  className?: string
}) {
  const { t } = useTranslation()

  return (
    <List className={cx('flex flex-col gap-0.5', className)}>
      {scripts.map((script) => {
        return (
          <ListItem
            key={script.id}
            component={Paper}
            secondaryAction={
              isFileScriptCompilation(script) ? (
                <IconButton
                  aria-disabled={isRunning(script)}
                  aria-label={t<string>('common.remove')}
                  color="error"
                  disabled={isRunning(script)}
                  onClick={() => onRemove(script)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              ) : undefined
            }
            variant="outlined"
          >
            {onStart ? (
              <ListItemIcon>
                <IconButton onClick={() => onStart(script)} className="text-primary-400" edge="end" size="small">
                  <PlayCircleIcon />
                </IconButton>
              </ListItemIcon>
            ) : null}
            <ListItemText aria-label={script.name} primary={script.name} />
            {isFileScriptCompilation(script) ? (
              <ListItemIcon>
                <IconFromStatus script={script} />
              </ListItemIcon>
            ) : null}
          </ListItem>
        )
      })}
    </List>
  )
}

export default FileScriptsList
