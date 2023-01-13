/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { O, pipe } from 'App/Lib/FpTs'
import { FileScript, Group } from 'App/Lib/Conf/ConfDecoder'
import cx from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

function AddOrEditGroupDialog({
  initialGroup = O.none,
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  ...props
}: Omit<DialogProps, 'onSubmit'> & {
  initialGroup: O.Option<Group>
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => void
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
}) {
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
  } = useScriptsList({
    initialScripts: pipe(
      initialGroup,
      O.map((group) => group.scripts),
      O.getOrElse(() => [] as FileScript[]),
    ),
  })

  const { t } = useTranslation()
  const { register, reset, handleSubmit, formState } = useForm({
    defaultValues: pipe(
      initialGroup,
      O.map((group) => ({
        name: group.name,
      })),
      O.toUndefined,
    ),
    resolver: zodResolver(GroupZod),
  })

  const resetDialog = () => {
    reset()
    clearScripts()
  }

  const handleDialogClose = () => {
    resetDialog()
    onClose()
  }

  const isEdit = false

  return (
    <Dialog
      aria-describedby="group-content"
      aria-labelledby="group-title"
      fullScreen
      onClose={handleDialogClose}
      {...props}
    >
      <form
        className="flex h-full flex-col"
        onSubmit={handleSubmit((data) => {
          pipe(
            O.Do,
            O.bind('name', () => {
              return pipe(
                data.name,
                O.fromPredicate((name) => name.length > 0),
              )
            }),
            O.map(({ name }) => {
              onSubmit(scripts, name)
              resetDialog()
            }),
          )
        })}
      >
        <Toolbar className="p-0">
          <DialogTitle className="grow" id="group-title">
            <TextField autoFocus fullWidth placeholder={t<string>('dialog.group.name.label')} {...register('name')} />
          </DialogTitle>
        </Toolbar>
        <DialogContent
          className={cx('flex px-5', scripts.length === 0 && 'items-center justify-center')}
          dividers
          id="group-content"
        >
          {scripts.length > 0 ? (
            <FileScriptsList
              className="w-full"
              scripts={scripts}
              onRemove={(scriptToRemove) => removeScripts([scriptToRemove])}
            />
          ) : (
            <DialogContentText className="py-12">{t('dialog.group.dropScripts')}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <SearchScriptButton
            className="mr-auto px-3 py-2"
            color="inherit"
            onFileSelect={addScripts}
            disabled={actionsDisabled}
          >
            {t('common.searchScripts')}
          </SearchScriptButton>
          <Button disabled={actionsDisabled} onClick={() => handleDialogClose()} color="inherit">
            {t('common.cancel')}
          </Button>
          <Button type="submit" disabled={actionsDisabled || !formState.isValid} color="inherit">
            {actionsIsLoading && <CircularProgress size="inherit" variant="indeterminate" />}
            {isEdit ? t('common.edit') : t('common.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddOrEditGroupDialog
