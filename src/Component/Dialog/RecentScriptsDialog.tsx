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
import RecentScriptsDialogContextMenu from 'App/Component/Dialog/RecentScriptsDialog/RecentScriptsDialogContextMenu'
import { useRecentScripts } from 'App/Hook/RecentScripts/UseRecentScripts'
import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useContextMenu } from 'App/Hook/UseContextMenu'
import { useKey } from 'App/Hook/UseKey'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { pipe, A, O, flow, B, isSome } from 'App/Lib/FpTs'
import { isFileScriptInArray } from 'App/Lib/IsFileScriptInArray'
import cx from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function RecentScriptsDialog({
  currentScripts,
  onScriptsLoad,
  onClose,
  ...props
}: Omit<DialogProps, 'onClose' | 'onKeyDown'> & {
  onClose: () => void
  currentScripts: FileScript[]
  onScriptsLoad: (scripts: FileScript[]) => void
}) {
  const { t } = useTranslation()
  const recentScripts = useRecentScripts()
  const updateRecentScripts = useUpdateRecentScripts()
  const {
    handleClose: handleCloseContextMenu,
    handleContextMenu,
    contextMenu,
    open: isContextMenuOpen,
  } = useContextMenu()
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
    onScriptsLoad(scriptsToLoad)
    clearScriptsToLoad()
  }

  const onDialogEnter = useKey('Enter', () => {
    if (A.isEmpty(scriptsToLoad)) return

    onScriptsLoad(scriptsToLoad)
    clearScriptsToLoad()
  })

  return (
    <Dialog
      aria-describedby="recent-scripts-content"
      aria-labelledby="recent-scripts-title"
      fullScreen
      onClose={handleOnClose}
      onKeyDown={onDialogEnter}
      {...props}
    >
      <Toolbar className="p-0">
        <DialogTitle className="grow" id="recent-scripts-title">
          {t('dialog.recentFiles.title')}
        </DialogTitle>
        <FormGroup id="recent-scripts-content">
          <FormControlLabel
            disabled={pipe(
              O.fromNullable(recentScripts.data),
              O.map(A.isEmpty),
              O.getOrElse(() => false),
            )}
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
                <List className="overflow-x-hidden" onContextMenu={handleContextMenu}>
                  <RecentScriptsDialogContextMenu
                    open={isContextMenuOpen}
                    anchorPosition={
                      isSome(contextMenu)
                        ? { top: contextMenu.value.mouseY, left: contextMenu.value.mouseX }
                        : undefined
                    }
                    onClose={handleCloseContextMenu}
                    onAll={() => {
                      addScriptsToLoad(recentScripts)
                    }}
                    onNone={() => {
                      clearScriptsToLoad()
                    }}
                    onInvert={() => {
                      pipe(
                        recentScripts,
                        (scripts) => ({
                          toAdd: scripts.filter((script) => !pipe(scriptsToLoad, isFileScriptInArray(script))),
                          toRemove: scripts.filter((script) => pipe(scriptsToLoad, isFileScriptInArray(script))),
                        }),
                        ({ toAdd, toRemove }) => {
                          addScriptsToLoad(toAdd)
                          removeScriptToLoad(toRemove)
                        },
                      )
                    }}
                    onClear={async () => {
                      await updateRecentScripts.mutateAsync({
                        recentScripts: [],
                        override: true,
                      })
                      handleCloseContextMenu()
                    }}
                    onDetails={() => {
                      setMoreDetails((v) => !v)
                      handleCloseContextMenu()
                    }}
                    onLoad={() => {
                      handleCloseContextMenu()
                      handleOnLoad()
                    }}
                    detailsText={t(isMoreDetails ? 'common.lessDetails' : 'common.moreDetails')}
                    scriptsToLoad={scriptsToLoad}
                    disabled={{
                      all: A.size(scriptsToLoad) === A.size(recentScripts),
                      none: A.isEmpty(scriptsToLoad),
                      clear: A.isEmpty(recentScripts),
                      load: A.isEmpty(scriptsToLoad),
                      details: A.isEmpty(recentScripts),
                    }}
                  />
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
