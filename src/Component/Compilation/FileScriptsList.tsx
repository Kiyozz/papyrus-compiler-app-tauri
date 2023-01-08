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
import { IconFromStatus, isRunning } from 'App/Lib/FileScriptCompilation'
import { FileScriptCompilation } from 'App/Type/FileScriptCompilation'
import { useTranslation } from 'react-i18next'

function FileScriptsList({
  scripts,
  onStart,
  onRemove,
}: {
  scripts: FileScriptCompilation[]
  onRemove: (script: FileScriptCompilation) => void
  onStart: (script: FileScriptCompilation) => void
}) {
  const { t } = useTranslation()

  return (
    <List className="flex flex-col gap-0.5">
      {scripts.map((script) => (
        <ListItem
          key={script.id}
          component={Paper}
          secondaryAction={
            <IconButton
              aria-disabled={isRunning(script)}
              aria-label={t<string>('common.remove')}
              color="error"
              disabled={isRunning(script)}
              onClick={() => onRemove(script)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          }
          variant="outlined"
        >
          <ListItemIcon>
            <IconButton onClick={() => onStart(script)} className="text-primary-400" edge="end" size="small">
              <PlayCircleIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText aria-label={script.name} primary={script.name} />
          <ListItemIcon>
            <IconFromStatus script={script} />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  )
}

export default FileScriptsList
