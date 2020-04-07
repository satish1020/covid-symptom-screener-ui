import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { SectionTitle } from './SectionTitle'

import { EnhancedTable } from '../../Shared/components/EnhancedTable'
import { useTable } from '../../Shared/components/EnhancedTable/useTable'
import { AdminUserDialog } from '../Dialogs/AdminUserDialog'

import { getUsers, deleteUser } from '../../../services/users'
import { DIRECTION_DESC } from '../../../constants'

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryAction: {
    ...theme.buttonPrimary,
  },
}))

const initialTableState = {
  page: 0,
  perPage: 20,
  direction: DIRECTION_DESC,
  orderBy: 'email_address',
}

export const AdminUserSection = () => {
  const classes = useStyles()
  const table = useTable(initialTableState)

  const [adminUsers, setAdminUsers] = useState([])
  const [totalAdminUsers, setTotalAdminUsers] = useState(0)
  const [pending, setPending] = useState(false)
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)

  const fieldList = [
    {
      key: 'email_address',
      label: 'Email',
      hasSort: true,
      formatCell(item) {
        return (
          <div className={classes.flexContainer}>
            <Typography>{item.email_address}</Typography>
            <IconButton
              color="primary"
              data-testid="delete"
              aria-label={`delete ${item.email_address}`}
              onClick={handleDelete(item)}
            >
              <Delete />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const fetchUsers = async ({ page, perPage, orderBy, direction }) => {
    setPending(true)
    const { results, total } = await getUsers({
      page,
      perPage,
      orderBy,
      direction,
    })

    setTotalAdminUsers(total)
    setAdminUsers(results)
    setPending(false)
  }

  useEffect(() => {
    fetchUsers(table.state)
  }, [table.state, step])

  const handleRefreshTable = () => {
    setStep((prev) => prev + 1)
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleDelete = (item) => async () => {
    if (
      window.confirm(`Are you sure you want to delete ${item.email_address}?`)
    ) {
      await deleteUser({ email: item.email_address })
      handleRefreshTable()
    }
  }
  return (
    <div>
      <Grid container spacing={2} justify="flex-end" alignItems="center">
        <Grid item xs={12} sm={9}>
          <SectionTitle total={totalAdminUsers} title="Admin Users" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button className={classes.primaryAction} onClick={handleOpenDialog}>
            Add an admin user
          </Button>
        </Grid>
      </Grid>
      <EnhancedTable
        data={adminUsers}
        fieldList={fieldList}
        isLoading={pending}
        total={totalAdminUsers}
        aster
        page={table.state.page}
        rowsPerPage={table.state.perPage}
        direction={table.state.direction}
        orderBy={table.state.orderBy}
        onRequestSort={table.actions.sort}
        onRequestChangePage={table.actions.changePage}
        onRequestChangeRowsPerPage={table.actions.changePerPage}
      />
      <AdminUserDialog
        open={open}
        onRequestClose={handleCloseDialog}
        onRequestTableRefresh={handleRefreshTable}
      />
    </div>
  )
}
