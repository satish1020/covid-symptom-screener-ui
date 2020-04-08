import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { OrganizationsSection } from '../OrganizationsSection'
import { DIRECTION_DESC } from '../../../../constants'

import * as organizationService from '../../../../services/organizations'

describe('OrganizationsSection', () => {
  const setup = () => {
    const data = [
      {
        org_name: 'Org 1',
        contact_name: 'Mary',
        contact_job_title: 'Doctor',
        contact_email: 'test@email.com',
        contact_phone: '(111) 111-1111',
        sector: 'sector',
        approval_status: 'APPLIED',
      },
    ]

    const fetchOrganizationsSpy = jest
      .spyOn(organizationService, 'getOrganizations')
      .mockResolvedValue({
        results: data,
        total: data.length,
      })

    const utils = render(<OrganizationsSection />)

    return {
      ...utils,
      fetchOrganizationsSpy,
      data,
    }
  }

  it('renders a table', async () => {
    const {
      queryByTestId,
      getByTestId,
      getByText,
      data,
      fetchOrganizationsSpy,
    } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    expect(fetchOrganizationsSpy).toHaveBeenCalledWith(
      {
        direction: DIRECTION_DESC,
        orderBy: 'org_name',
        page: 0,
        perPage: 20,
      },
      { approvalStatus: '' }
    )

    // table headers
    getByText('Organization')
    getByText('Name')
    getByText('Job Title')
    getByText('Phone')
    getByText('Status')

    // table data
    getByText(data[0].org_name)
    getByText(data[0].contact_name)
    getByText(data[0].contact_job_title)
    getByText(data[0].contact_email)
    getByText(data[0].contact_phone)
    getByText(data[0].approval_status)
  })

  it('gets organizations by approval status', async () => {
    const {
      queryByTestId,
      getByTestId,
      getByText,
      fetchOrganizationsSpy,
    } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    expect(fetchOrganizationsSpy).toHaveBeenCalledWith(
      {
        direction: DIRECTION_DESC,
        orderBy: 'org_name',
        page: 0,
        perPage: 20,
      },
      { approvalStatus: '' }
    )

    await wait(() => {
      userEvent.click(getByText('All'))
    })

    await wait(() => {
      userEvent.click(getByText('Approved'))
    })

    expect(fetchOrganizationsSpy).toHaveBeenCalledWith(
      {
        direction: DIRECTION_DESC,
        orderBy: 'org_name',
        page: 0,
        perPage: 20,
      },
      { approvalStatus: 'APPROVED' }
    )
  })
})
