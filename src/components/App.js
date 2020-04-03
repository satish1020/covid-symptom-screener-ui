import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppHeader from './Shared/components/AppHeader'

import { HomePage } from './HomePage'
import { AdminSignInPage } from './AdminSignInPage'
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false) // TODO: figure out how to set a users status as admin

  const classes = useStyles()

  //TODO is logged in and is org set are different and route to different places
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CoordinateContextProvider
        longitude={defaultCoordinates.longitude}
        latitude={defaultCoordinates.latitude}
      >
        <div className={classes.app} data-testid="app">
          <AppHeader setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <div className={classes.body}>
            <Router>
              {!isLoggedIn && (
                <Switch>
                  <Route exact path="/">
                    <HomePage setIsLoggedIn={setIsLoggedIn} />
                  </Route>
                  <Route exact path="/admin">
                    <AdminSignInPage setIsLoggedIn={setIsLoggedIn} />
                  </Route>
                  <Route exact path="/registration">
                    <RegistrationPage />
                  </Route>
                </Switch>
              )}
              {isLoggedIn && (
                <Switch>
                  {isAdmin && (
                    <Route exact path="/admin/management">
                      <ManagementPage />
                    </Route>
                  )}
                  <Route exact path="/">
                    <AuthorizationPage />
                  </Route>
                  <Route path="/registration">
                    <RegistrationPage />
                  </Route>
                  <Route exact path="/authorization">
                    <AuthorizationPage />
                  </Route>
                  <Route exact path="/location">
                    <LocationPage />
                  </Route>
                  <Route exact path="/measurement">
                    <MeasurementPage />
                  </Route>
                  <Route path="/management">
                    <ManagementPage />
                  </Route>
                </Switch>
              )}
            </Router>
          </div>
        </div>
      </CoordinateContextProvider>
    </ThemeProvider>
  )
}

export default App
