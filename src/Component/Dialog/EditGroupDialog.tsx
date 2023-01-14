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
import { GroupWithId } from 'App/Type/GroupWithId'
import cx from 'classnames'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

function EditGroupDialog({
  group = O.none,
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  ...props
}: Omit<DialogProps, 'onSubmit' | 'open' | 'onKeyDown'> & {
  group: O.Option<GroupWithId>
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
    initialScripts: pipe(
      group,
      O.map((group) => group.scripts),
      O.getOrElse(() => [] as FileScript[]),
    ),
  })

  const onDialogEnter = useKey('Enter', {
    onEnter: () => {
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
    },
  })

  const { t } = useTranslation()
  const { register, reset, handleSubmit, formState, getValues } = useForm({
    defaultValues: pipe(
      group,
      O.map((group) => ({
        name: group.name,
      })),
      O.toUndefined,
    ),
    resolver: zodResolver(GroupZod),
  })

  useLayoutEffect(() => {
    pipe(
      group,
      O.map((group) => {
        reset({
          name: group.name,
        })
        clearScripts()
        addScripts(group.scripts)
      }),
    )
  }, [group])

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
      open={O.isSome(group)}
      onKeyDown={onDialogEnter}
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
            O.map(async ({ name }) => {
              await onSubmit(scripts, name)
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
          <Button disabled={actionsDisabled} onClick={handleDialogClose} color="inherit">
            {t('common.cancel')}
          </Button>
          <LoadingButton
            type="submit"
            disabled={actionsDisabled || !formState.isValid}
            color="inherit"
            loading={actionsIsLoading}
          >
            {t('common.edit')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditGroupDialog
