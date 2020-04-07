import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { updateOrganization } from '../../../services/organizations'

export default function OrganizationDialog(props) {
  const classes = useStyles()
  const open = props.dialogData.open
  let organization = { ...props.dialogData.organization }

  const editOrgStatus = async (status) => {
    organization.approval_status = status
    try {
      await updateOrganization(organization)
      props.setDialogData({ open: false })
      props.refreshTable()
    } catch (e) {
      console.error(e)
    }
  }

  let orgModalOptions = {
    title: '',
    subText: '',
    primaryAction: undefined,
    secondaryAction: undefined,
  }

  if (organization.approval_status === 'APPLIED') {
    orgModalOptions = {
      title: 'Review Applicant',
      subText: 'A unique ID will be generated on approval',
      primaryAction: (
        <Button
          onClick={() => {
            editOrgStatus('APPROVED')
          }}
          className={classes.primaryAction}
        >
          Approve
        </Button>
      ),
      secondaryAction: (
        <Button
          onClick={() => {
            editOrgStatus('REJECTED')
          }}
          className={classes.secondaryAction}
        >
          Deny
        </Button>
      ),
    }
  } else if (organization.approval_status === 'APPROVED') {
    orgModalOptions = {
      title: 'Review Organization',
      subText:
        'Suspending an organization will cause their PIN to no longer work',
      primaryAction: (
        <Button
          onClick={() => {
            editOrgStatus('SUSPENDED')
          }}
          className={classes.primaryAction}
        >
          Suspend
        </Button>
      ),
      secondaryAction: (
        <Button
          onClick={() => {
            props.setDialogData({ open: false })
          }}
          className={classes.secondaryAction}
        >
          Cancel
        </Button>
      ),
    }
  } else if (organization.approval_status === 'SUSPENDED') {
    orgModalOptions = {
      title: 'Review Organization',
      subText: 'Approving this organization will allow their PIN to work',
      primaryAction: (
        <Button
          onClick={() => {
            editOrgStatus('APPROVED')
          }}
          className={classes.primaryAction}
        >
          Approve
        </Button>
      ),
      secondaryAction: (
        <Button
          onClick={() => {
            props.setDialogData({ open: false })
          }}
          className={classes.secondaryAction}
        >
          Cancel
        </Button>
      ),
    }
  } else if (organization.approval_status === 'REJECTED') {
    orgModalOptions = {
      title: 'Review Organization',
      subText:
        'If rejection was corrected, move organization back to Applied status',
      primaryAction: (
        <Button
          onClick={() => {
            editOrgStatus('APPLIED')
          }}
          className={classes.primaryAction}
        >
          Re-Apply
        </Button>
      ),
      secondaryAction: (
        <Button
          onClick={() => {
            props.setDialogData({ open: false })
          }}
          className={classes.secondaryAction}
        >
          Cancel
        </Button>
      ),
    }
  }

  return (
    <Dialog classes={{ paperScrollPaper: classes.dialog }} open={open}>
      <DialogTitle classes={{ root: classes.dialogTitle }}>
        <div>
          <Typography className={classes.modalTitle}>
            {orgModalOptions.title}
          </Typography>
          <Typography>{orgModalOptions.subText}</Typography>
        </div>
        <IconButton
          className={classes.closeButton}
          onClick={() => {
            props.setDialogData({ open: false })
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Table className={classes.dialogTable}>
          <TableBody>
            <TableRow>
              <TableCell
                classes={{ root: classes.tableCell }}
                className={classes.boldLabel}
                align="right"
              >
                Organization
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.org_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell classes={{ root: classes.tableCell }} align="right">
                Tax ID
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.tax_id}
              </TableCell>
            </TableRow>
            <TableRow className={classes.spacerRow}></TableRow>
            <TableRow>
              <TableCell
                classes={{ root: classes.tableCell }}
                className={classes.boldLabel}
                align="right"
              >
                Point of Contact
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.contact_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell classes={{ root: classes.tableCell }} align="right">
                Job Title
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.contact_job_title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell classes={{ root: classes.tableCell }} align="right">
                Email
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.contact_email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell classes={{ root: classes.tableCell }} align="right">
                Phone
              </TableCell>
              <TableCell classes={{ root: classes.tableCell }} align="left">
                {organization.contact_phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        {orgModalOptions.secondaryAction}
        {orgModalOptions.primaryAction}
      </DialogActions>
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '2rem',
  },
  dialogTitle: {
    padding: '0px',
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  dialogContent: {
    borderTop: '2px solid #cbcbcb',
    borderBottom: '2px solid #cbcbcb',
    marginTop: '16px',
    marginBottom: '16px',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '900',
  },
  dialogTable: {
    MuiTableCell: {
      padding: '0px',
    },
  },
  tableCell: {
    padding: '0.5rem',
    borderBottom: '0',
  },
  boldLabel: {
    fontWeight: '700',
  },
  spacerRow: {
    height: '2rem',
  },
  primaryAction: {
    ...theme.buttonPrimary,
    width: '50%',
  },
  secondaryAction: {
    width: '50%',
    textTransform: 'none',
  },
}))
