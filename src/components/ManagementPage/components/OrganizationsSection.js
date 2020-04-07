import React, { useEffect, useState } from 'react'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  makeStyles,
} from '@material-ui/core'

import { SectionTitle } from './SectionTitle'

import { EnhancedTable } from '../../Shared/components/EnhancedTable'
import { useTable } from '../../Shared/components/EnhancedTable/useTable'

import OrganizationDialog from '../Dialogs/OrganizationDialog'

import { getOrganizations } from '../../../services/organizations'
import { DIRECTION_DESC, APPROVAL_STATUSES } from '../../../constants'

const useStyles = makeStyles((theme) => ({
  flexRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    width: '16%',
  },
  chip: {
    backgroundColor: theme.palette.primaryBlue,
    color: '#FFF',
  },
}))

const initialTableState = {
  page: 0,
  perPage: 20,
  direction: DIRECTION_DESC,
  orderBy: 'org_name',
}
export const OrganizationsSection = () => {
  const classes = useStyles()

  const table = useTable(initialTableState)

  const [status, setStatus] = useState('')
  const [organizations, setOrganizations] = useState([])
  const [totalOrgs, setTotalOrgs] = useState(0)
  const [pending, setPending] = useState(false)
  const [dialogData, setDialogData] = useState({ open: false })
  const [step, setStep] = useState(0)

  const fieldList = [
    {
      key: 'org_name',
      label: 'Organization',
      hasSort: true,
    },
    {
      key: 'sector',
      label: 'Sector',
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
      formatCell: (item) => (
        <Chip
          className={classes.chip}
          label={item.approval_status}
          onClick={() => {
            setDialogData({ open: true, organization: item })
          }}
        />
      ),
    },
  ]

  const fetchOrgs = async (
    { page, perPage, orderBy, direction },
    { approvalStatus }
  ) => {
    setPending(true)
    const { results, total } = await getOrganizations(
      {
        page,
        perPage,
        orderBy,
        direction,
      },
      { approvalStatus }
    )

    setTotalOrgs(total)
    setOrganizations(results)
    setPending(false)
  }

  //this makes a state change so we refresh the data
  const refreshTable = () => {
    setStep((prev) => prev + 1)
  }

  useEffect(() => {
    fetchOrgs(table.state, { approvalStatus: status })
  }, [table.state, status, step])

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  return (
    <div>
      <Grid container spacing={2} justify="flex-end" alignItems="center">
        <Grid item xs={12} sm={9}>
          <SectionTitle total={totalOrgs} title="Organizations" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="application-status">Application Status</InputLabel>
            <Select
              displayEmpty
              labelId="application-status"
              id="status-menu"
              onChange={handleChange}
              value={status}
            >
              <MenuItem value="">All</MenuItem>
              {APPROVAL_STATUSES.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
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
      {dialogData.open && (
        <OrganizationDialog
          dialogData={dialogData}
          setDialogData={setDialogData}
          refreshTable={refreshTable}
        />
      )}
    </div>
  )
}
