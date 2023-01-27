/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { useKey } from 'App/Hook/UseKey'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { O, pipe, S, TO } from 'App/Lib/FpTs'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

function AddGroupDialog({
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  ...props
}: Omit<DialogProps, 'onSubmit' | 'onKeyDown'> & {
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
}) {
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
  } = useScriptsList({
    initialScripts: [] as FileScript[],
  })

  const onDialogEnter = useKey('Enter', () => {
    if (actionsDisabled || actionsIsLoading || !formState.isValid) {
      return
    }

    const name = getValues('name')

    pipe(
      name,
      O.fromPredicate((name) => !S.isEmpty(name)),
      TO.fromOption,
      TO.chain((name) => TO.tryCatch(() => onSubmit(scripts, name))),
      TO.map(resetDialog),
    )
  })

  const { t } = useTranslation()
  const { register, reset, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      name: '',
    },
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

  return (
    <Dialog
      aria-describedby="group-content"
      aria-labelledby="group-title"
      fullScreen
      onClose={handleDialogClose}
      onKeyDown={onDialogEnter}
      {...props}
    >
      <form
        className="flex h-full flex-col"
        onSubmit={handleSubmit((data, evt) => {
          evt?.stopPropagation()

          pipe(
            data.name,
            O.fromPredicate((name) => name.length > 0),
            O.map((name) => {
              onSubmit(scripts, name)
              resetDialog()
            }),
          )
        })}
      >
        <Toolbar className="p-0">
          <DialogTitle className="grow" id="group-title">
            <TextField autoFocus fullWidth placeholder={t('dialog.group.name.label')} {...register('name')} />
          </DialogTitle>
        </Toolbar>
        <DialogContent
          className={cx('px-5', scripts.length === 0 && 'flex items-center justify-center')}
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
          <LoadingButton
            type="submit"
            disabled={actionsDisabled || !formState.isValid}
            color="inherit"
            loading={actionsIsLoading}
          >
            {t('common.create')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddGroupDialog
