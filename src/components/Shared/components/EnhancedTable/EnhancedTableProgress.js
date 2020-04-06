import React from 'react'
import { number } from 'prop-types'

import { TableRow, TableCell, LinearProgress } from '@material-ui/core'

export const EnhancedTableProgress = ({ colSpan }) => {
  return (
    <TableRow data-testid="table-progress">
      <TableCell colSpan={colSpan}>
        <LinearProgress />
      </TableCell>
    </TableRow>
  )
}

EnhancedTableProgress.propTypes = {
  colSpan: number.isRequired,
}
