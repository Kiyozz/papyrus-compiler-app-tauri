/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import Button from '@mui/material/Button'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { useKey } from 'App/Hook/UseKey'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { GroupZod } from 'App/Lib/Form/GroupForm'
import { O, pipe, S, TO } from 'App/Lib/FpTs'
import { type FileScript } from 'App/Lib/Conf/ConfDecoder'
import cx from 'classnames'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

const AddGroupDialog = ({
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  defaultScripts,
  TransitionProps,
  ...props
}: Omit<DialogProps, 'onSubmit' | 'onKeyDown'> & {
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
  defaultScripts: O.Option<FileScript[]>
}) => {
  const { trackEvent } = useMatomo()
  const {
    scripts,
    add: addScripts,
    remove: removeScripts,
    clear: clearScripts,
    reset: resetScripts,
  } = useScriptsList({
    initialScripts: [] as FileScript[],
  })

  useEffect(() => {
    if (O.isSome(defaultScripts)) {
      resetScripts(defaultScripts.value)
    }
  }, [defaultScripts, resetScripts])

  const onDialogEnter = useKey('Enter', () => {
    if (actionsDisabled || actionsIsLoading || !formState.isValid) {
      return
    }

    const name = getValues('name')

    pipe(
      name,
      O.fromPredicate((name) => !S.isEmpty(name)),
      TO.fromOption,
      TO.chain((name) =>
        TO.tryCatch(async () => {
          await onSubmit(scripts, name)
        }),
      ),
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
    onClose()
  }

  return (
    <Dialog
      aria-describedby="group-content"
      aria-labelledby="group-title"
      fullScreen
      onClose={handleDialogClose}
      onKeyDown={onDialogEnter}
      TransitionProps={{
        ...TransitionProps,
        onExited: (node) => {
          resetDialog()
          TransitionProps?.onExited?.(node)
        },
      }}
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
              void onSubmit(scripts, name)
              resetDialog()
            }),
          )
        })}
      >
        <Toolbar className="p-0">
          <DialogTitle className="grow" id="group-title">
            <TextField
              autoFocus
              autoComplete="off"
              fullWidth
              placeholder={t('dialog.group.name.label')}
              {...register('name')}
            />
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
              onRemove={(scriptToRemove) => {
                removeScripts([scriptToRemove])
              }}
            />
          ) : (
            <DialogContentText className="py-12">{t('dialog.group.dropScripts')}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <SearchScriptButton
            className="mr-auto px-3 py-2"
            color="inherit"
            onFileSelect={(files, reason) => {
              addScripts(files)
              trackEvent({
                category: 'Group',
                action: 'Add scripts',
                name: reason,
              })
            }}
            disabled={actionsDisabled}
          >
            {t('common.searchScripts')}
          </SearchScriptButton>
          <Button
            disabled={actionsDisabled}
            onClick={() => {
              handleDialogClose()
            }}
            color="inherit"
          >
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
