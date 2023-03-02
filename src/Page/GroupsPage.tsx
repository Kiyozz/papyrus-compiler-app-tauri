/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AddGroupDialog from 'App/Component/Dialog/AddGroupDialog'
import EditGroupDialog from 'App/Component/Dialog/EditGroupDialog'
import RemovingGroupDialog from 'App/Component/Dialog/RemovingGroupDialog'
import GroupMoreDetailsCheckbox from 'App/Component/Groups/GroupMoreDetailsCheckbox'
import GroupsList from 'App/Component/Groups/GroupsList'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useRemoveGroup } from 'App/Hook/Group/UseRemoveGroup'
import { useUpdateGroups } from 'App/Hook/Group/UseUpdateGroups'
import { useDialogOpen } from 'App/Hook/UseDialogOpen'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { createLogs } from 'App/Lib/CreateLog'
import { A, flow, none, O, pipe, R, TO } from 'App/Lib/FpTs'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { GroupWithId } from 'App/Type/GroupWithId'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'
import { v4 } from 'uuid'

const logs = createLogs('GroupsPage')

function GroupsPage() {
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
    defaultState: none as O.Option<GroupWithId>,
  })
  const {
    isOpen: isEditGroupDialogOpen,
    open: openEditGroupDialog,
    state: groupToEdit,
    close: closeEditGroupDialog,
    TransitionProps: editDialogTransitionProps,
  } = useDialogOpen({
    defaultState: none as O.Option<GroupWithId>,
  })
  const {
    isOpen: isAddGroupDialogOpen,
    open: openAddGroupDialog,
    state: addGroupDefaultScripts,
    close: closeAddGroupDialog,
    TransitionProps: addDialogTransitionProps,
  } = useDialogOpen({
    defaultState: none as O.Option<FileScript[]>,
  })

  useEffectOnce(() => {
    pipe(
      location.state as { scripts: FileScript[] },
      O.fromNullable,
      O.map(({ scripts }) => scripts),
      (scripts) => {
        if (O.isSome(scripts)) {
          logs.debug('add group from compilation page scripts list')()
          openAddGroupDialog(scripts.value)
        }
      },
    )
  })

  const closeDialogs = flow(
    closeAddGroupDialog,
    closeRemoveGroupDialog,
    closeEditGroupDialog,
    logs.trace('closeDialogs'),
  )

  return (
    <>
      <RemovingGroupDialog
        open={isRemoveGroupDialogOpen}
        groupToRemove={groupToRemove}
        onConfirm={async () => {
          await pipe(
            groupToRemove,
            O.map((group) => removeGroup.mutateAsync(group.id)),
            TO.fromOption,
          )()

          void closeDialogs()
        }}
        onCancel={closeDialogs}
        TransitionProps={removeDialogTransitionProps}
      />

      {groups.isSuccess ? (
        <>
          <AddGroupDialog
            open={isAddGroupDialogOpen}
            defaultScripts={addGroupDefaultScripts}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
              void logs.debug('add group', name)()

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

              void closeDialogs()
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
            TransitionProps={addDialogTransitionProps}
          />
          <EditGroupDialog
            open={isEditGroupDialogOpen}
            group={groupToEdit}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
              void logs.debug('edit group', name)()

              await pipe(
                groupToEdit,
                TO.fromOption,
                TO.chain((group) => {
                  return TO.tryCatch(() =>
                    updateGroups.mutateAsync({
                      [group.id]: {
                        name,
                        scripts: scripts.map(({ id, name, path }) => ({
                          id,
                          name,
                          path,
                        })),
                      },
                    }),
                  )
                }),
              )()

              void closeDialogs()
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
            TransitionProps={editDialogTransitionProps}
          />
        </>
      ) : null}

      <PageAppBar title={t('page.groups.appBar.title')}>
        <Button
          className="px-3 py-2"
          color="inherit"
          disabled={updateGroups.isLoading}
          startIcon={<CreateIcon />}
          onClick={() => {
            openAddGroupDialog()
          }}
        >
          {t('common.create')}
        </Button>
      </PageAppBar>

      <Page className="pt-0">
        <Fade in={groups.isLoading} unmountOnExit>
          <CircularProgress className="mt-6" variant="indeterminate" />
        </Fade>
        <Fade in={groups.isSuccess}>
          <div className="h-full w-full justify-center gap-4 text-lg">
            {!groups.isLoading && R.size(groups.data ?? {}) === 0 && (
              <Typography gutterBottom variant="h6" className="pt-6">
                {t('page.groups.createGroupText')}
              </Typography>
            )}
            {groups.isSuccess
              ? pipe(
                  groups.data,
                  groupRecordToArray,
                  A.match(
                    () => <Typography variant="body2">{t('page.groups.whatIsAGroup')}</Typography>,
                    (groups) => (
                      <>
                        <Toolbar className="p-0">
                          <GroupMoreDetailsCheckbox
                            className="ml-auto"
                            checked={isMoreDetails}
                            onChange={(checked) => setMoreDetails(checked)}
                          />
                        </Toolbar>
                        <GroupsList
                          groups={groups}
                          isMoreDetails={isMoreDetails}
                          onTryRemove={openRemoveGroupDialog}
                          onClickEdit={openEditGroupDialog}
                        />
                      </>
                    ),
                  ),
                )
              : null}
          </div>
        </Fade>
      </Page>
    </>
  )
}

export default GroupsPage
