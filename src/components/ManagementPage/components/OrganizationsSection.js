import React, { useEffect, useState } from 'react'

import { SectionTitle } from './SectionTitle'

import { EnhancedTable } from '../../Shared/components/EnhancedTable'
import { useTable } from '../../Shared/components/EnhancedTable/useTable'

import { getOrganizations } from '../../../services/organizations'
import { DIRECTION_DESC } from '../../../constants'

const fieldList = [
  {
    key: 'org_name',
    label: 'Organization',
    hasSort: true,
  },
  {
    key: 'contact_name',
    label: 'Name',
    hasSort: true,
  },
  {
    key: 'contact_job_title',
    label: 'Job Title',
    hasSort: false,
  },
  {
    key: 'contact_email',
    label: 'Email',
    hasSort: false,
  },
  {
    key: 'contact_phone',
    label: 'Phone',
    hasSort: false,
  },
  {
    key: 'approval_status',
    label: 'Status',
    hasSort: true,
  },
]

const initialTableState = {
  page: 0,
  perPage: 20,
  direction: DIRECTION_DESC,
  orderBy: 'org_name',
}
export const OrganizationsSection = () => {
  const table = useTable(initialTableState)

  const [organizations, setOrganizations] = useState([])
  const [totalOrgs, setTotalOrgs] = useState(0)
  const [pending, setPending] = useState(false)

  const fetchOrgs = async ({ page, perPage, orderBy, direction }) => {
    setPending(true)
    const { results, total } = await getOrganizations({
      page,
      perPage,
      orderBy,
      direction,
    })

    setTotalOrgs(total)
    setOrganizations(results)
    setPending(false)
  }

  useEffect(() => {
    fetchOrgs(table.state)
  }, [table.state])

  return (
    <div>
      <SectionTitle total={totalOrgs} title="Organizations" />

      <EnhancedTable
        data={organizations}
        fieldList={fieldList}
        isLoading={pending}
        total={totalOrgs}
        page={table.state.page}
        rowsPerPage={table.state.perPage}
        direction={table.state.direction}
        orderBy={table.state.orderBy}
        onRequestSort={table.actions.sort}
        onRequestChangePage={table.actions.changePage}
        onRequestChangeRowsPerPage={table.actions.changePerPage}
      />
    </div>
  )
}
