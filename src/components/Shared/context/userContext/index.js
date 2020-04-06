import React, { createContext, useState } from 'react'
import { string, element, bool, object } from 'prop-types'
import { TOKEN_ID } from '../../../../constants'

export const defaultUserContext = {
  role: null,
  org: null,
}

export const UserContext = createContext(defaultUserContext)

export const UserContextProvider = ({ role, org, children }) => {
  const tokenId = window.localStorage.getItem(TOKEN_ID)
  const isLoggedIn = tokenId !== null && tokenId !== undefined

  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const [userRole, setUserRole] = useState(role)
  const [organization, setOrganization] = useState(org)

  const userState = {
    loggedIn,
    userRole,
    organization,
  }
  const userActions = {
    setLoggedIn,
    setUserRole,
    setOrganization,
  }
  return (
    <UserContext.Provider value={[userState, userActions]}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  role: string,
  isLoggedIn: bool,
  organization: object,
  children: element.isRequired,
}
