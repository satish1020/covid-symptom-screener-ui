import React from 'react'
import propTypes from 'prop-types'

import { TableBody, TableRow, TableCell } from '@material-ui/core'

import { EnhancedTableProgress } from './EnhancedTableProgress'
import { EnhancedTableCell } from './EnhancedTableCell'

export const EnhancedTableBody = ({ data, fieldList, isLoading }) => {
  const colSpan = fieldList.length
  return (
    <TableBody>
      {isLoading && <EnhancedTableProgress colSpan={colSpan} />}
      {!isLoading && data?.length === 0 && (
        <TableRow>
          <TableCell data-testid="table-not-found" colSpan={colSpan}>
            No results found.
          </TableCell>
        </TableRow>
      )}
      {!isLoading &&
        data?.length > 0 &&
        data.map((rowItem, index) => {
          return (
            <TableRow hover key={index}>
              {fieldList.map((field, idx) => {
                const { formatCell, key } = field

                let content
                if (formatCell && typeof formatCell === 'function') {
                  content = formatCell(rowItem)
                } else {
                  // @ts-ignore
                  content = rowItem[key]
                }

                return (
                  <EnhancedTableCell key={idx}>{content}</EnhancedTableCell>
                )
              })}
            </TableRow>
          )
        })}
    </TableBody>
  )
}

EnhancedTableBody.propTypes = {
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
}
