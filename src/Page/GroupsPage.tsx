/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Typography from '@mui/material/Typography'
import is from '@sindresorhus/is'
import CreateOrEditGroupDialog from 'App/Component/Dialog/CreateOrEditGroupDialog'
import RemovingGroupDialog from 'App/Component/Dialog/RemovingGroupDialog'
import GroupMoreDetailsCheckbox from 'App/Component/Groups/GroupMoreDetailsCheckbox'
import GroupsList from 'App/Component/Groups/GroupsList'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import Spinner from 'App/Component/Spinner'
import * as Button from 'App/Component/UI/Button'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useRemoveGroup } from 'App/Hook/Group/UseRemoveGroup'
import { useUpdateGroups } from 'App/Hook/Group/UseUpdateGroups'
import { useDialog } from 'App/Hook/UseDialog'
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
  } = useDialog({
    defaultState: None as Option<GroupWithId>,
  })
  const {
    isOpen: isGroupDialogOpen,
    open: openGroupDialog,
    state: groupDialogState,
    close: closeGroupDialog,
  } = useDialog<{
    group: Option<GroupWithId>
    defaultScripts: FileScript[]
  }>({
    defaultState: None,
  })

  useEffectOnce(() => {
    const scripts = fromNullable(location.state as { scripts: FileScript[] } | undefined).map(({ scripts }) => scripts)

    if (scripts.some) {
      logs.debug('add group from compilation page scripts list')
      openGroupDialog({ group: None, defaultScripts: scripts.val })
    }
  })

  const closeDialogs = () => {
    // closeAddGroupDialog()
    closeRemoveGroupDialog()
    // closeEditGroupDialog()
    closeGroupDialog()
    logs.trace('closeDialogs')
  }

  const groupToEdit = groupDialogState.andThen((state) => state.group)
  const groupDefaultScripts = groupDialogState.map((state) => state.defaultScripts)
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
          <CreateOrEditGroupDialog
            open={isGroupDialogOpen}
            group={groupToEdit}
            onSubmit={async (scripts, name) => {
              logs.debug(groupToEdit.some ? 'edit group' : 'add group', name)

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
              } else {
                const res = await Result.wrapAsync(async () => {
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
                })

                if (res.err) {
                  logs.error('cannot add group', res.val)

                  console.error(res.val)
                }

                trackEvent({
                  category: 'Group',
                  action: 'Create',
                })
              }

              closeDialogs()
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
            defaultScripts={groupDefaultScripts}
            onClose={closeGroupDialog}
          />
        </>
      ) : null}

      <PageAppBar title={t('page.groups.appBar.title')}>
        <Button.Root
          disabled={updateGroups.isLoading}
          onClick={() => {
            openGroupDialog({
              group: None,
              defaultScripts: [],
            })
          }}
        >
          <Button.Icon edge="start">
            <PlusCircleIcon />
          </Button.Icon>
          {t('common.create')}
        </Button.Root>
      </PageAppBar>

      <Page>
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence>
            {groups.isLoading && (
              <motion.div {...fadeAnimate}>
                <Spinner />
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
                      <div className="flex flex-col space-y-4">
                        <GroupMoreDetailsCheckbox
                          className="ml-auto"
                          checked={isMoreDetails}
                          onChange={setMoreDetails}
                        />
                        <GroupsList
                          groups={groups}
                          isMoreDetails={isMoreDetails}
                          onTryRemove={openRemoveGroupDialog}
                          onClickEdit={(group) => {
                            openGroupDialog({
                              group: Some(group),
                              defaultScripts: group.scripts,
                            })
                          }}
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
