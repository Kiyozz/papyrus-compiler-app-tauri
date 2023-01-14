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
import { A, O, pipe, TO } from 'App/Lib/FpTs'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { GroupWithId } from 'App/Type/GroupWithId'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 } from 'uuid'

function GroupsPage() {
  const { t } = useTranslation()
  const updateGroups = useUpdateGroups()
  const removeGroup = useRemoveGroup()
  const groups = useGroups()
  const [groupToEdit, setGroupToEdit] = useState<O.Option<GroupWithId>>(O.none)
  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false)

  const [isMoreDetails, setMoreDetails] = useState(false)
  const [groupToRemove, setGroupToRemove] = useState<O.Option<GroupWithId>>(O.none)

  const closeDialogs = () => {
    setGroupDialogOpen(false)
    setGroupToRemove(O.none)
    setGroupToEdit(O.none)
  }

  return (
    <>
      <RemovingGroupDialog
        groupToRemove={groupToRemove}
        onConfirm={async () => {
          await pipe(
            groupToRemove,
            O.map((group) => removeGroup.mutateAsync(group.id)),
            TO.fromOption,
          )()

          closeDialogs()
        }}
        onCancel={() => {
          closeDialogs()
        }}
      />

      {groups.isSuccess ? (
        <>
          <AddGroupDialog
            open={isGroupDialogOpen}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
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
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
          />
          <EditGroupDialog
            group={groupToEdit}
            onClose={closeDialogs}
            onSubmit={async (scripts, name) => {
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

              closeDialogs()
            }}
            actionsDisabled={updateGroups.isLoading}
            actionsIsLoading={updateGroups.isLoading}
          />
        </>
      ) : null}

      <PageAppBar title={t('page.groups.appBar.title')}>
        <Button
          className="px-3 py-2"
          color="inherit"
          disabled={updateGroups.isLoading}
          startIcon={<CreateIcon />}
          onClick={() => setGroupDialogOpen(true)}
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
            {!groups.isLoading && Object.keys(groups.data ?? {}).length === 0 && (
              <Typography gutterBottom variant="h6" className="pt-6">
                {t('page.groups.createGroupText')}
              </Typography>
            )}
            {groups.isSuccess
              ? pipe(
                  groups.data,
                  groupRecordToArray,
                  O.fromPredicate(A.isNonEmpty),
                  O.match(
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
                          onTryRemove={(group) => setGroupToRemove(O.some(group))}
                          onClickEdit={(group) => {
                            setGroupToEdit(O.some(group))
                          }}
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
