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
import { type GroupWithId } from 'App/Type/GroupWithId'
import cx from 'classnames'
import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

const EditGroupDialog = ({
  group = O.none,
  onClose,
  onSubmit,
  actionsDisabled = false,
  actionsIsLoading = false,
  TransitionProps,
  ...props
}: Omit<DialogProps, 'onSubmit' | 'onKeyDown'> & {
  group: O.Option<GroupWithId>
  onClose: () => void
  onSubmit: (scripts: FileScript[], name: string) => Promise<void>
  actionsDisabled?: boolean
  actionsIsLoading?: boolean
}) => {
  const { trackEvent } = useMatomo()
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

  const onDialogPressEnter = useKey('Enter', () => {
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
    defaultValues: pipe(
      group,
      O.map((group) => ({
        name: group.name,
      })),
      O.toUndefined,
    ),
    resolver: zodResolver(GroupZod),
  })
  const textFieldNameRef = useRef<HTMLInputElement>(null)

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
  }, [addScripts, clearScripts, group, reset])

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
      onKeyDown={onDialogPressEnter}
      TransitionProps={{
        ...TransitionProps,
        onEnter: (...params) => {
          TransitionProps?.onEnter?.(...params)
          textFieldNameRef.current?.focus()
        },
        onExited: (...params) => {
          TransitionProps?.onExited?.(...params)
          resetDialog()
        },
      }}
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
            <TextField
              autoFocus
              autoComplete="off"
              fullWidth
              placeholder={t('dialog.group.name.label')}
              {...register('name')}
              inputRef={textFieldNameRef}
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
