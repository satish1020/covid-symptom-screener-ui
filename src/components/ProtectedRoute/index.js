import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../Shared/context/userContext'
import { ManagementPage } from '../ManagementPage'
import { currentUserRole, isRoleAdmin } from '../../services/users'

export const ProtectedRoute = (props) => {
  const [userState, userActions] = useContext(UserContext)

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const orgGetResp = await currentUserRole()
        if (orgGetResp !== undefined) {
          userActions.setUserRole(orgGetResp)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (userState.loggedIn && !userState.userRole) {
      getUserRole()
    }
  }, [userState, userActions])

  const renderComponent = () => {
    const { component: Component } = props
    return <Component {...props} />
  }

  if (!userState.loggedIn) {
    return <Redirect to="/" />
  }

  if (!userState.userRole) {
    return null
  }

  if (props.component === ManagementPage && !isRoleAdmin(userState.userRole)) {
    // TODO send them here or to an unauthorized page?
    return <Redirect to="/authorization" />
  }

  return <Route {...props.rest} render={renderComponent} />
}
