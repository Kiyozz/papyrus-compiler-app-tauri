/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { useRecentScripts } from 'App/Hook/RecentScripts/UseRecentScripts'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScript, RecentScripts } from 'App/Lib/Conf/ConfDecoder'
import { pipe, A, O, flow, B } from 'App/Lib/FpTs'
import { isFileScriptInArray } from 'App/Lib/IsFileScriptInArray'
import cx from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function RecentScriptsDialog({
  onSubmit,
  currentScripts,
  onClickLoad,
  onClose,
  ...props
}: Omit<DialogProps, 'onClose' | 'onKeyDown'> & {
  onClose: () => void
  onSubmit: (recentScripts: RecentScripts) => void
  currentScripts: FileScript[]
  onClickLoad: (scripts: FileScript[]) => void
}) {
  const { t } = useTranslation()
  const recentScripts = useRecentScripts()
  const [isMoreDetails, setMoreDetails] = useState(false)
  const {
    scripts: scriptsToLoad,
    add: addScriptsToLoad,
    remove: removeScriptToLoad,
    clear: clearScriptsToLoad,
  } = useScriptsList({
    initialScripts: [] as FileScript[],
  })

  const handleOnClose = () => {
    onClose()
    clearScriptsToLoad()
  }

  const handleOnLoad = () => {
    onClickLoad(scriptsToLoad)
    clearScriptsToLoad()
  }

  return (
    <Dialog
      aria-describedby="recent-scripts-content"
      aria-labelledby="recent-scripts-title"
      fullScreen
      onClose={handleOnClose}
      {...props}
    >
      <Toolbar className="p-0">
        <DialogTitle className="grow" id="recent-scripts-title">
          {t('dialog.recentFiles.title')}
        </DialogTitle>
        <FormGroup id="recent-scripts-content">
          <FormControlLabel
            control={<Checkbox checked={isMoreDetails} onChange={() => setMoreDetails((v) => !v)} />}
            label={t('dialog.recentFiles.actions.moreDetails')}
          />
        </FormGroup>
      </Toolbar>
      <DialogContent className={cx(recentScripts.data?.length !== 0 && 'p-0')} dividers>
        {pipe(
          O.fromNullable(recentScripts.data),
          O.map(
            A.match(
              () => <DialogContentText>{t('dialog.recentFiles.noRecentFiles')}</DialogContentText>,
              flow((recentScripts) => (
                <List className="overflow-x-hidden">
                  {recentScripts.map((script) => {
                    const isAlreadyAddedInCurrentScripts = pipe(currentScripts, isFileScriptInArray(script))
                    const isAlreadyAddedInScriptsToLoad = scriptsToLoad.includes(script)

                    return (
                      <ListItem
                        disablePadding
                        key={script.id}
                        secondaryAction={
                          <IconButton
                            color="error"
                            onClick={() => {
                              console.log('remove this script in recent scripts file')
                            }}
                            tabIndex={2}
                          >
                            <DeleteOutlinedIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton
                          classes={{ root: 'py-0' }}
                          component="button"
                          disableRipple
                          disabled={isAlreadyAddedInCurrentScripts}
                          onClick={() => {
                            pipe(
                              isAlreadyAddedInScriptsToLoad,
                              B.fold(
                                () => addScriptsToLoad([script]),
                                () => removeScriptToLoad([script]),
                              ),
                            )
                          }}
                          role="checkbox"
                          tabIndex={1}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={isAlreadyAddedInScriptsToLoad}
                              disableRipple
                              edge="start"
                              inputProps={{
                                'aria-labelledby': script.name,
                              }}
                              tabIndex={-1}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={script.name}
                            primary={script.name}
                            secondary={isMoreDetails ? script.path : undefined}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              )),
            ),
          ),
          O.toNullable,
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} tabIndex={4} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button
          // disabled={selectedRecentFiles.size === 0}
          disabled={A.isEmpty(scriptsToLoad)}
          onClick={handleOnLoad}
          tabIndex={3}
          color="inherit"
        >
          {t('dialog.recentFiles.actions.load')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RecentScriptsDialog
