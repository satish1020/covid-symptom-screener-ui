import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MeasurementPage } from '../index'
import { MemoryRouter } from 'react-router-dom'
import * as temperaturesService from '../../../services/temperatures'
import { CoordinateContext } from '../../Shared/context/coordinateContext'
import { UserContext } from '../../Shared/context/userContext'

const defaultCoords = {
  longitude: 11.111,
  latitude: 22.222,
}

const defaultUserState = {
  loggedIn: true,
  organization: {
    org_name: 'My Test Organization',
    authorization_code: 'foo',
  },
}

const renderComponent = (
  userState = defaultUserState,
  coords = defaultCoords
) =>
  render(
    <UserContext.Provider value={[userState]}>
      <CoordinateContext.Provider value={[coords]}>
        <MeasurementPage />
      </CoordinateContext.Provider>
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  )

describe('MeasurementPage', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders', () => {
    const { getByText, getByTestId } = renderComponent()

    getByText('Assessment Submission')
    getByText('My Test Organization')
    expect(getByTestId('submit-button')).toBeDisabled()
  })

  it('should enable the the submit button', () => {
    const { getByTestId } = renderComponent()
    expect(getByTestId('submit-button')).toBeDisabled()

    userEvent.type(getByTestId('temperature-input'), '95')
    expect(getByTestId('submit-button')).toBeEnabled()

    userEvent.type(getByTestId('temperature-input'), '105')
    expect(getByTestId('submit-button')).toBeEnabled()
  })

  it('should disable the the submit button', () => {
    const { getByTestId } = renderComponent()

    userEvent.type(getByTestId('temperature-input'), '94')
    expect(getByTestId('submit-button')).toBeDisabled()

    userEvent.type(getByTestId('temperature-input'), '106')
    expect(getByTestId('submit-button')).toBeDisabled()
  })

  it('should submit the form', async () => {
    const { getByTestId, getByText } = renderComponent()
    const getCurrentDate = () => new Date(Date.now()).toISOString()

    const submitMock = jest
      .spyOn(temperaturesService, 'submitTemperatures')
      .mockResolvedValue({})

    Date.now = jest.fn(() => new Date('2020-04-06T07:00:00.000Z'))

    userEvent.type(getByTestId('temperature-input'), '95')
    userEvent.click(getByTestId('submit-button'))

    await wait(() =>
      expect(submitMock).toHaveBeenCalledWith('foo', [
        {
          ...defaultCoords,
          temperature: '95',
          timestamp: getCurrentDate(),
        },
      ])
    )

    await waitForElement(() => getByText('Success! Entry submitted'))
  })

  it('should show an error when the submit request fails', async () => {
    const { getByTestId, findByTestId } = renderComponent()

    jest
      .spyOn(temperaturesService, 'submitTemperatures')
      .mockRejectedValue(new Error('foo'))

    console.error = jest.fn()

    userEvent.type(getByTestId('temperature-input'), '95')
    userEvent.click(getByTestId('submit-button'))

    await findByTestId('error-message')
  })
})
