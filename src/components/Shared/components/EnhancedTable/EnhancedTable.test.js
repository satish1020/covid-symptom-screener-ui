import React from 'react'
import { render } from '@testing-library/react'

import { EnhancedTable } from './index'

import { DIRECTION_DESC } from '../../../../constants'

describe('EnhancedTable', () => {
  const getProps = ({ isLoading = false } = {}) => ({
    data: [
      { name: 'Rose', org_name: 'Org 1' },
      { name: 'Bill', org_name: 'Org 2' },
    ],
    fieldList: [
      {
        key: 'name',
        label: 'Label Name',
        hasSort: false,
      },
      {
        key: 'org_name',
        label: 'Organization',
        hasSort: true,
        formatCell(item) {
          return item.org_name.toUpperCase()
        },
      },
    ],
    isLoading,
    total: 2,
    page: 0,
    rowsPerPage: 20,
    orderBy: 'org_name',
    direction: DIRECTION_DESC,
    onRequestSort: jest.fn(),
    onRequestChangePage: jest.fn(),
    onRequestChangeRowsPerPage: jest.fn(),
  })

  it('renders', () => {
    const props = getProps()

    const { getByText } = render(<EnhancedTable {...props} />)
    getByText(props.fieldList[0].label)
    getByText(props.data[0].name)
    getByText(props.data[0].org_name.toUpperCase())

    // column 2
    getByText(props.fieldList[1].label)
    getByText(props.data[1].name)
    getByText(props.data[1].org_name.toUpperCase())
  })

  it('renders a loading bar when props.isLoading is true', () => {
    const props = getProps({ isLoading: true })

    const { getByTestId } = render(<EnhancedTable {...props} />)

    getByTestId('table-progress')
  })

  it('does not render a rows per page menu if props.onRequestChangeRowsPerPage is not provided', () => {
    const props = getProps()
    delete props.onRequestChangeRowsPerPage

    const { queryByText } = render(<EnhancedTable {...props} />)

    expect(queryByText('Rows per page')).toBeNull()
  })
})
