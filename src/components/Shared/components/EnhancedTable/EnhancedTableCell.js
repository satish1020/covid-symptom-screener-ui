import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableSortLabel } from '@material-ui/core'
import { DIRECTION_DESC, DIRECTION_ASC } from '../../../../constants'

export const EnhancedTableCell = ({
  hasSort,
  onClick,
  direction,
  active,
  children,
}) => {
  if (hasSort && onClick) {
    return (
      <TableCell>
        <TableSortLabel
          data-element="table-sortable-cell"
          onClick={onClick}
          active={active}
          direction={direction}
        >
          {children}
        </TableSortLabel>
      </TableCell>
    )
  }

  return <TableCell data-element="table-cell">{children}</TableCell>
}

EnhancedTableCell.propTypes = {
  hasSort: propTypes.bool,
  onClick: propTypes.func,
  direction: propTypes.oneOf([DIRECTION_DESC, DIRECTION_ASC]),
  active: propTypes.bool,
  children: propTypes.any,
}
