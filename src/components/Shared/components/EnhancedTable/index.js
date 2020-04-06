import React from 'react'
import propTypes from 'prop-types'

import { TableContainer, Table, TablePagination } from '@material-ui/core'

import { EnhancedTableHead } from './EnhancedTableHead'
import { EnhancedTableBody } from './EnhancedTableBody'

import { DIRECTION_ASC, DIRECTION_DESC } from '../../../../constants'

/**
 * fieldList - Configuration for table columns
 * [
 *   {
 *     key: string - property on data object,
 *     label: string - display name for key,
 *     hasSort: boolean - sortable column header,
 *     formatCell: func(item) - custom function to render a cell,
 *   }
 * ]
 */

export const EnhancedTable = ({
  data,
  fieldList,
  isLoading,
  total,
  page,
  rowsPerPage,
  direction,
  orderBy,
  onRequestSort,
  onRequestChangePage,
  onRequestChangeRowsPerPage,
}) => {
  // hide rows per page if the onChange handler is not provided
  const rowsPerPageValues = onRequestChangeRowsPerPage
    ? [5, 10, 20, 50, 100]
    : []
  return (
    <>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            fieldList={fieldList}
            direction={direction}
            orderBy={orderBy}
            onSort={onRequestSort}
          />
          <EnhancedTableBody
            data={data}
            fieldList={fieldList}
            isLoading={isLoading}
          />
        </Table>
      </TableContainer>
      {onRequestChangePage && (
        <TablePagination
          page={page}
          data-testid="table-pagination"
          component="div"
          labelRowsPerPage={<label>Rows per page:</label>}
          count={total}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageValues}
          onChangePage={onRequestChangePage}
          onChangeRowsPerPage={onRequestChangeRowsPerPage}
        />
      )}
    </>
  )
}

EnhancedTable.propTypes = {
  data: propTypes.arrayOf(propTypes.object).isRequired,
  fieldList: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      label: propTypes.string.isRequired,
      hasSort: propTypes.bool.isRequired,
      formatCell: propTypes.func,
    })
  ).isRequired,
  isLoading: propTypes.bool.isRequired,
  total: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
  rowsPerPage: propTypes.number.isRequired,
  direction: propTypes.oneOf([DIRECTION_DESC, DIRECTION_ASC]).isRequired,
  orderBy: propTypes.string.isRequired,
  onRequestSort: propTypes.func,
  onRequestChangePage: propTypes.func,
  onRequestChangeRowsPerPage: propTypes.func,
}
