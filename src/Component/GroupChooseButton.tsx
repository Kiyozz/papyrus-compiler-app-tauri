/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AddIcon from '@mui/icons-material/Add'
import Button, { type ButtonProps } from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { type Groups } from 'App/Lib/Conf/ConfZod'
import { A, pipe } from 'App/Lib/FpTs'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { type GroupWithId } from 'App/Type/GroupWithId'
import { useState } from 'react'
import { None, type Option, Some } from 'ts-results'

function GroupChooseButton({
  onGroupClick,
  groups,
  ...props
}: Omit<ButtonProps, 'onClick'> & { groups: Groups; onGroupClick: (group: GroupWithId) => void }) {
  const [anchor, setAnchor] = useState<Option<HTMLElement>>(None)

  const nonEmptyGroups = pipe(
    groupRecordToArray(groups),
    A.filter((group) => A.isNonEmpty(group.scripts)),
  )

  const isOpen = anchor.some

  return (
    <>
      {A.isNonEmpty(nonEmptyGroups) && (
        <Button
          aria-controls={isOpen ? 'group-loader-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-haspopup="true"
          startIcon={<AddIcon />}
          onClick={(e) => {
            setAnchor(Some(e.currentTarget))
          }}
          {...props}
        />
      )}
      <Menu
        id="group-loader-menu"
        anchorEl={anchor.unwrapOr(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{
          list: 'min-w-[100px]',
        }}
        open={isOpen}
        onClose={() => {
          setAnchor(None)
        }}
      >
        {pipe(
          nonEmptyGroups,
          A.map((group) => (
            <MenuItem
              key={group.id}
              className="justify-center"
              onClick={() => {
                onGroupClick(group)
                setAnchor(None)
              }}
            >
              {group.name}
            </MenuItem>
          )),
        )}
      </Menu>
    </>
  )
}

export default GroupChooseButton
