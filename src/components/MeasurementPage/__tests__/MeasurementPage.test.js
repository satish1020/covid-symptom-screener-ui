import React from 'react'
import { render, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MeasurementPage } from '../index'
import { MemoryRouter } from 'react-router-dom'
import * as temperaturesService from '../../../services/temperatures'
import * as questionsService from '../../../services/questions'
import { CoordinateContext } from '../../Shared/context/coordinateContext'
import { UserContext } from '../../Shared/context/userContext'
import { ENABLED } from '../../../constants'

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
) => {
  const questions = [
    { id: '1111', display_value: 'foo question', status: 'ENABLED' },
    { id: '2222', display_value: 'bar question', status: 'ENABLED' },
    { id: '3333', display_value: 'test question', status: 'ENABLED' },
    { id: '4444', display_value: 'fizz question', status: 'ENABLED' },
  ]

  var getQuestionsSpy = jest
    .spyOn(questionsService, 'getQuestions')
    .mockResolvedValue(questions)

  const utils = render(
    <UserContext.Provider value={[userState]}>
      <CoordinateContext.Provider value={[coords]}>
        <MeasurementPage />
      </CoordinateContext.Provider>
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  )

  return {
    ...utils,
    getQuestionsSpy,
    questions,
  }
}

describe('MeasurementPage', () => {
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders', async () => {
    const {
      getByText,
      getByTestId,
      findByText,
      getQuestionsSpy,
    } = renderComponent()
    expect(getQuestionsSpy).toHaveBeenCalledWith(ENABLED)

    getByText('Assessment Submission')
    getByText('My Test Organization')
    expect(getByTestId('submit-button')).toBeDisabled()

    await findByText('foo question')
    await findByText('bar question')
    await findByText('test question')
    await findByText('fizz question')
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

  it('should submit the form and reset values', async () => {
    const { container, getByTestId, getByText, questions } = renderComponent()
    const getCurrentDate = () => new Date(Date.now()).toISOString()

    const submitMock = jest
      .spyOn(temperaturesService, 'submitTemperatures')
      .mockResolvedValue({})

    Date.now = jest.fn(() => new Date('2020-04-06T07:00:00.000Z'))

    await wait()

    userEvent.type(getByTestId('temperature-input'), '95')
    userEvent.click(getByTestId('2222'))
    userEvent.click(getByTestId('4444'))
    userEvent.click(getByTestId('submit-button'))

    expect(submitMock).toHaveBeenCalledWith('foo', [
      {
        ...defaultCoords,
        temperature: 95,
        timestamp: getCurrentDate(),
        question_answers: [
          {
            question: questions[0],
            answer: false,
          },
          {
            question: questions[1],
            answer: true,
          },
          {
            question: questions[2],
            answer: false,
          },
          {
            question: questions[3],
            answer: true,
          },
        ],
      },
    ])

    await wait()

    getByText('Success! Entry submitted')

    // reset form values
    expect(getByTestId('temperature-input').value).toBe('')
    expect(
      container.querySelector('[data-testid="1111-display-value"]').innerHTML
    ).toBe('No')
    expect(
      container.querySelector('[data-testid="2222-display-value"]').innerHTML
    ).toBe('No')
    expect(
      container.querySelector('[data-testid="3333-display-value"]').innerHTML
    ).toBe('No')
    expect(
      container.querySelector('[data-testid="4444-display-value"]').innerHTML
    ).toBe('No')
  })

  it('should show an error when the submit request fails', async () => {
    const { getByTestId, findByTestId } = renderComponent()

    jest
      .spyOn(temperaturesService, 'submitTemperatures')
      .mockRejectedValue(new Error('foo'))

    userEvent.type(getByTestId('temperature-input'), '95')
    userEvent.click(getByTestId('submit-button'))

    await findByTestId('error-message')
  })
})
