import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppHeader from './Shared/components/AppHeader'

import { HomePage } from './HomePage'
import { AuthorizationPage } from './AuthorizationPage'
import { LocationPage } from './LocationPage'
import { RegistrationPage } from './RegistrationPage'
import { MeasurementPage } from './MeasurementPage'
import { ManagementPage } from './ManagementPage'

import { configureHttpInterceptor } from '../services/httpInterceptor'

import {
  CoordinateContextProvider,
  defaultCoordinates,
} from './Shared/context/coordinateContext'

import { theme } from '../theme'
import { TOKEN_ID } from '../constants'
import {
  defaultUserContext,
  UserContextProvider,
} from './Shared/context/userContext'
import { ProtectedRoute } from './ProtectedRoute'

configureHttpInterceptor()

const useStyles = makeStyles(({ spacing }) => ({
  app: {
    // ...theme.footerBar, TODO: do we need this?
    height: '100vh',
    backgroundColor: '#fff',
  },
  body: {
    margin: '0 auto',
    paddingRight: spacing(2),
    paddingLeft: spacing(2),
  },
}))

function App() {
  const tokenId = window.localStorage.getItem(TOKEN_ID)
  const isLoggedIn = tokenId !== null && tokenId !== undefined

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles()

  //TODO is logged in and is org set are different and route to different places
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider
        isLoggedIn={isLoggedIn}
        role={defaultUserContext.role}
        org={defaultUserContext.org}
      >
        <CoordinateContextProvider
          longitude={defaultCoordinates.longitude}
          latitude={defaultCoordinates.latitude}
        >
          <div className={classes.app} data-testid="app">
            <AppHeader />
            <div className={classes.body}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <ProtectedRoute
                    exact
                    path="/registration"
                    component={RegistrationPage}
                  />
                  <ProtectedRoute
                    exact
                    path="/authorization"
                    component={AuthorizationPage}
                  />
                  <ProtectedRoute
                    exact
                    path="/location"
                    component={LocationPage}
                  />
                  <ProtectedRoute
                    exact
                    path="/measurement"
                    component={MeasurementPage}
                  />
                  <ProtectedRoute
                    exact
                    path="/management"
                    component={ManagementPage}
                  />
                </Switch>
              </Router>
            </div>
          </div>
        </CoordinateContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
