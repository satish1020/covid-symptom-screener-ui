import React from 'react'
import propTypes from 'prop-types'

import { TableHead, TableRow } from '@material-ui/core'

import { EnhancedTableCell } from './EnhancedTableCell'

import { DIRECTION_ASC, DIRECTION_DESC } from '../../../../constants'

export const EnhancedTableHead = ({
  fieldList,
  direction,
  orderBy,
  onSort,
}) => {
  const createRequestSort = (field) => () => {
    if (onSort) {
      onSort(field)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {fieldList.map((field, index) => {
          const { key, label, hasSort } = field
          const active = key === orderBy
          return (
            <EnhancedTableCell
              key={key || index}
              label={label}
              hasSort={hasSort}
              active={active}
              direction={direction}
              onClick={createRequestSort(field)}
            >
              {label}
            </EnhancedTableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  fieldList: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      label: propTypes.string.isRequired,
      hasSort: propTypes.bool.isRequired,
      formatCell: propTypes.func,
    })
  ).isRequired,
  direction: propTypes.oneOf([DIRECTION_DESC, DIRECTION_ASC]).isRequired,
  orderBy: propTypes.string,
  onSort: propTypes.func,
}
