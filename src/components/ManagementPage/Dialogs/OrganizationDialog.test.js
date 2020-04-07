import React from 'react'
import {
  render,
  fireEvent,
  wait
} from '@testing-library/react'

import OrganizationDialog from './OrganizationDialog'

import * as organizationService from '../../../services/organizations'

describe('OrganizationsDialog', () => {
  const data = [
    {
      org_name: 'Org 1',
      contact_name: 'Applied',
      contact_job_title: 'Doctor',
      contact_email: 'test@email.com',
      contact_phone: '(111) 111-1111',
      approval_status: 'APPLIED',
    },
    {
      org_name: 'Org 1',
      contact_name: 'Approved',
      contact_job_title: 'Doctor',
      contact_email: 'test@email.com',
      contact_phone: '(111) 111-1111',
      approval_status: 'APPROVED',
    },
    {
      org_name: 'Org 1',
      contact_name: 'Suspended',
      contact_job_title: 'Doctor',
      contact_email: 'test@email.com',
      contact_phone: '(111) 111-1111',
      approval_status: 'SUSPENDED',
    },
    {
      org_name: 'Org 1',
      contact_name: 'Rejected',
      contact_job_title: 'Doctor',
      contact_email: 'test@email.com',
      contact_phone: '(111) 111-1111',
      approval_status: 'REJECTED',
    },
  ]

  const putOrganizationSpy = jest
    .spyOn(organizationService, 'updateOrganization')
    .mockResolvedValue({})

    it.each`
    data       | status                     | buttonText    | updatedStatus
    ${data[0]} | ${data[0].approval_status} | ${'Approve'}  | ${'APPROVED'} 
    ${data[1]} | ${data[1].approval_status} | ${'Suspend'}  | ${'SUSPENDED'} 
    ${data[2]} | ${data[2].approval_status} | ${'Approve'}  | ${'APPROVED'} 
    ${data[3]} | ${data[3].approval_status} | ${'Re-Apply'} | ${'APPLIED'} 
  `(
    'renders org data with the approval status of $status and a button of $buttonText',
    // eslint-disable-next-line no-unused-vars
    async ({ data, status, buttonText, updatedStatus }) => { // status is used for the jest readout
      const setDialogDataMock = jest.fn()
      const refreshTableMock = jest.fn()

      const { getByText, getAllByRole } = render(
        <OrganizationDialog
          dialogData={{ open: true, organization: data }}
          setDialogData={setDialogDataMock}
          refreshTable={refreshTableMock}
        />
      )

      const buttons = getAllByRole('button')
      expect(buttons.length).toBe(3)
      getByText(buttonText)
      fireEvent.click(buttons[2]) //click the primary button
      let outData = {...data}
      outData.approval_status = updatedStatus
      await wait(() => {
        expect(putOrganizationSpy).toHaveBeenCalledWith(outData)
        expect(setDialogDataMock).toHaveBeenCalled()
        expect(refreshTableMock).toHaveBeenCalled()
      })
    }
  )
})
