import React, { useState } from 'react'
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
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return isLoggedIn ? (
                      <AuthorizationPage />
                    ) : (
                      <HomePage setIsLoggedIn={setIsLoggedIn} />
                    )
                  }}
                />
                <Route path="/registration">
                  <RegistrationPage />
                </Route>
                <Route path="/authorization">
                  <AuthorizationPage />
                </Route>
                <Route path="/location">
                  <LocationPage />
                </Route>
                <Route path="/measurement">
                  <MeasurementPage />
                </Route>
                <Route path="/management">
                  <ManagementPage />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </CoordinateContextProvider>
    </ThemeProvider>
  )
}

export default App
