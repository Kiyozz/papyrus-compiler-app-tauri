/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlusCircleIcon } from '@heroicons/react/24/solid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import is from '@sindresorhus/is'
import AddGroupDialog from 'App/Component/Dialog/AddGroupDialog'
import EditGroupDialog from 'App/Component/Dialog/EditGroupDialog'
import RemovingGroupDialog from 'App/Component/Dialog/RemovingGroupDialog'
import GroupMoreDetailsCheckbox from 'App/Component/Groups/GroupMoreDetailsCheckbox'
import GroupsList from 'App/Component/Groups/GroupsList'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import * as Button from 'App/Component/UI/Button'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useRemoveGroup } from 'App/Hook/Group/UseRemoveGroup'
import { useUpdateGroups } from 'App/Hook/Group/UseUpdateGroups'
import { useDialogOpen } from 'App/Hook/UseDialogOpen'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { createLogs } from 'App/Lib/CreateLog'
import { enterPageAnimate, fadeAnimate } from 'App/Lib/Framer'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { fromNullable } from 'App/Lib/TsResults'
import { type GroupWithId } from 'App/Type/GroupWithId'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { None, type Option, Result, Some } from 'ts-results'
import { useEffectOnce } from 'usehooks-ts'
import { v4 } from 'uuid'

const logs = createLogs('GroupsPage')

function GroupsPage() {
  const { trackEvent } = useMatomo()
  const location = useLocation()
  const { t } = useTranslation()
  const updateGroups = useUpdateGroups()
  const removeGroup = useRemoveGroup()
  const groups = useGroups()

  const [isMoreDetails, setMoreDetails] = useState(false)

  const {
    isOpen: isRemoveGroupDialogOpen,
    open: openRemoveGroupDialog,
    state: groupToRemove,
    close: closeRemoveGroupDialog,
    TransitionProps: removeDialogTransitionProps,
  } = useDialogOpen({
    defaultState: None as Option<GroupWithId>,
  })
  const {
    isOpen: isEditGroupDialogOpen,
    open: openEditGroupDialog,
    state: groupToEdit,
    close: closeEditGroupDialog,
    TransitionProps: editDialogTransitionProps,
  } = useDialogOpen({
    defaultState: None as Option<GroupWithId>,
  })
  const {
    isOpen: isAddGroupDialogOpen,
    open: openAddGroupDialog,
    state: addGroupDefaultScripts,
    close: closeAddGroupDialog,
  } = useDialogOpen({
    defaultState: None as Option<FileScript[]>,
  })

  useEffectOnce(() => {
    const scripts = fromNullable(location.state as { scripts: FileScript[] }).map(({ scripts }) => scripts)

    if (scripts.some) {
      logs.debug('add group from compilation page scripts list')
      openAddGroupDialog(scripts.val)
    }
  })

  const closeDialogs = () => {
    closeAddGroupDialog()
    closeRemoveGroupDialog()
    closeEditGroupDialog()
    logs.trace('closeDialogs')
  }

  const groupsAsArray = groups.isSuccess ? Some(groupRecordToArray(groups.data)) : None

  return (
    <>
      <RemovingGroupDialog
        open={isRemoveGroupDialogOpen}
        groupToRemove={groupToRemove}
        onConfirm={async () => {
          if (groupToRemove.some) {
            const res = await Result.wrapAsync(async () => {
              await removeGroup.mutateAsync(groupToRemove.val.id)
            })

            if (res.err) {
              logs.error('cannot remove group', res.val)

              console.error(res.val)
            }
          }

          closeDialogs()
        }}
        onCancel={closeDialogs}
      />

      {groups.isSuccess ? (
        <>
          <AddGroupDialog
            open={isAddGroupDialogOpen}
            defaultScripts={addGroupDefaultScripts}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
              logs.debug('add group', name)

              await updateGroups.mutateAsync({
                [v4()]: {
                  name,
                  scripts: scripts.map(({ id, name, path }) => ({
                    id,
                    name,
                    path,
                  })),
                },
              })

              closeDialogs()
              trackEvent({
                category: 'Group',
                action: 'Create',
              })
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
          />
          <EditGroupDialog
            open={isEditGroupDialogOpen}
            group={groupToEdit}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
              logs.debug('edit group', name)

              if (groupToEdit.some) {
                const res = await Result.wrapAsync(async () => {
                  await updateGroups.mutateAsync({
                    [groupToEdit.val.id]: {
                      name,
                      scripts: scripts.map(({ id, name, path }) => ({
                        id,
                        name,
                        path,
                      })),
                    },
                  })
                })

                if (res.err) {
                  logs.error('cannot edit group', res.val)

                  console.error(res.val)
                }

                trackEvent({
                  category: 'Group',
                  action: 'Edit',
                })
              }

              closeDialogs()
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
          />
        </>
      ) : null}

      <PageAppBar title={t('page.groups.appBar.title')}>
        <Button.Root
          disabled={updateGroups.isLoading}
          startIcon={<PlusCircleIcon />}
          onClick={() => {
            openAddGroupDialog()
          }}
        >
          {t('common.create')}
        </Button.Root>
      </PageAppBar>

      <Page>
        <div className="container mx-auto">
          <AnimatePresence>
            {groups.isLoading && (
              <motion.div {...fadeAnimate}>
                <CircularProgress className="mt-6" variant="indeterminate" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {groups.isSuccess && (
              <motion.div className="h-full w-full justify-center gap-4 text-lg" {...enterPageAnimate}>
                {Object.keys(groups.data).length === 0 && (
                  <Typography gutterBottom variant="h6" className="pt-6">
                    {t('page.groups.createGroupText')}
                  </Typography>
                )}
                {groupsAsArray
                  .map((groups) => {
                    /* eslint-disable react/jsx-key */
                    if (is.emptyArray(groups)) {
                      return <Typography variant="body2">{t('page.groups.whatIsAGroup')}</Typography>
                    }

                    return (
                      <div className="flex flex-col space-y-3">
                        <GroupMoreDetailsCheckbox
                          className="ml-auto"
                          checked={isMoreDetails}
                          onChange={setMoreDetails}
                        />
                        <GroupsList
                          groups={groups}
                          isMoreDetails={isMoreDetails}
                          onTryRemove={openRemoveGroupDialog}
                          onClickEdit={openEditGroupDialog}
                        />
                      </div>
                    )
                    /* eslint-enable react/jsx-key */
                  })
                  .unwrapOr(null)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Page>
    </>
  )
}

export default GroupsPage
