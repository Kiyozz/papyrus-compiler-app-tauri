/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import AddIcon from '@mui/icons-material/Add'
import Button, { ButtonProps } from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { A, O, pipe } from 'App/Lib/FpTs'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { GroupWithId } from 'App/Type/GroupWithId'
import { useState } from 'react'

function GroupChooseButton({
  onGroupClick,
  ...props
}: Omit<ButtonProps, 'onClick'> & { onGroupClick: (group: GroupWithId) => void }) {
  const groups = useGroups()
  const [anchor, setAnchor] = useState<O.Option<HTMLElement>>(O.none)

  if (!groups.data) return null

  const nonEmptyGroups = pipe(
    groupRecordToArray(groups.data),
    A.filter((group) => A.isNonEmpty(group.scripts)),
  )

  const isOpen = O.isSome(anchor)

  return (
    <>
      {nonEmptyGroups.length > 0 && (
        <Button
          aria-controls={isOpen ? 'group-loader-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-haspopup="true"
          startIcon={<AddIcon />}
          onClick={(e) => setAnchor(O.some(e.currentTarget))}
          {...props}
        />
      )}
      <Menu
        id="group-loader-menu"
        anchorEl={O.toNullable(anchor)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{
          list: 'min-w-[100px]',
        }}
        open={isOpen}
        onClose={() => setAnchor(O.none)}
      >
        {pipe(
          nonEmptyGroups,
          A.map((group) => (
            <MenuItem
              key={group.id}
              className="justify-center"
              onClick={() => {
                onGroupClick(group)
                setAnchor(O.none)
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
