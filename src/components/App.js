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

import { theme } from '../theme'

const useStyles = makeStyles(() => ({
  app: {
    borderBottom: '20px solid #1a2d44',
    height: '100vh',
  },
  body: {
    margin: '0 auto',
    maxWidth: '500px',
  },
}))

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app} data-testid="app">
        <AppHeader />
        <div className={classes.body}>
          <Router>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
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
            </Switch>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
