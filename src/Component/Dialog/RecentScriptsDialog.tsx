/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Alert from '@mui/material/Alert'
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
import Snackbar from '@mui/material/Snackbar'
import Toolbar from '@mui/material/Toolbar'
import RecentScriptsDialogContextMenu from 'App/Component/Dialog/RecentScriptsDialog/RecentScriptsDialogContextMenu'
import { useRecentScripts } from 'App/Hook/RecentScripts/UseRecentScripts'
import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useContextMenu } from 'App/Hook/UseContextMenu'
import { useDialogOpen } from 'App/Hook/UseDialogOpen'
import { useKey } from 'App/Hook/UseKey'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { pipe, A, O, flow, B, isSome, TE, isLeft } from 'App/Lib/FpTs'
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
  const { trackEvent } = useMatomo()
  const { t } = useTranslation()
  const recentScripts = useRecentScripts({
    refetchOnWindowFocus: false,
  })
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
  const { open, isOpen, close, TransitionProps, state } = useDialogOpen<Error>({
    defaultState: O.none,
  })

  const effectiveClearScriptsToLoad = flow(recentScripts.refetch, clearScriptsToLoad)

  const handleOnClose = () => {
    onClose()
    effectiveClearScriptsToLoad()
  }

  const handleOnLoad = () => {
    onScriptsLoad(scriptsToLoad)
    effectiveClearScriptsToLoad()
    trackEvent({
      category: 'Recent Scripts',
      action: 'Load',
    })
  }

  const onDialogEnter = useKey('Enter', () => {
    if (A.isEmpty(scriptsToLoad)) return

    handleOnLoad()
  })

  const removeScriptFromRecentScripts = async (script: FileScript) => {
    if (!recentScripts.data) return

    const res = await TE.tryCatch(
      () =>
        updateRecentScripts.mutateAsync({
          recentScripts: pipe(
            recentScripts.data,
            A.filter((s) => s.path !== script.path),
            A.map((s) => s.path),
          ),
          override: true,
        }),
      (reason) => new Error(t('common.removeRecentScriptsError', { error: reason })),
    )()

    if (isLeft(res)) {
      open(res.left)
    }
  }

  return (
    <>
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
                flow((recentScripts) => {
                  const notInCurrentScripts = recentScripts.filter(
                    (script) => !isFileScriptInArray(script)(currentScripts),
                  )

                  return (
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
                          addScriptsToLoad(notInCurrentScripts)
                        }}
                        onNone={() => {
                          clearScriptsToLoad()
                        }}
                        onInvert={() => {
                          pipe(
                            notInCurrentScripts,
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
                                onClick={async () => {
                                  await removeScriptFromRecentScripts(script)
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
                  )
                }),
              ),
            ),
            O.toNullable,
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} tabIndex={4} color="inherit">
            {t('common.close')}
          </Button>
          <Button disabled={A.isEmpty(scriptsToLoad)} onClick={handleOnLoad} tabIndex={3} color="inherit">
            {t('dialog.recentFiles.actions.load')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar TransitionProps={TransitionProps} open={isOpen} onClose={close} autoHideDuration={2_000}>
        <Alert severity="error">{isSome(state) && state.value.message}</Alert>
      </Snackbar>
    </>
  )
}

export default RecentScriptsDialog
