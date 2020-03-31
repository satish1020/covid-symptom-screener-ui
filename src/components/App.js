import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Home } from "./Home";
import { SignUp } from "./SignUp";

import { theme } from "../theme";
console.log({ theme });
const useStyles = makeStyles(({ spacing }) => ({
  app: {
    padding: spacing(2)
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
