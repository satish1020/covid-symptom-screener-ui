import React from 'react'
import { render } from '@testing-library/react'

import { UserContext } from '../../../context/userContext'
import AppHeader from '../index'

describe('AppHeader', () => {
  const userState = {
    loggedIn: true,
  }
  const userActions = {
    setLoggedIn: jest.fn(),
  }

  it('removes token from storage on sign out', async () => {
    const { getByText } = render(
      <UserContext.Provider value={[userState, userActions]}>
        <AppHeader />
      </UserContext.Provider>
    )

    getByText('Sign Out')
  })
})
