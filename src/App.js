import React from 'react';
import Navbar from './components/layout/Navbar';
import Main from './components/main/Main';
import UserProfile from './components/profile/UserProfile';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { orange, deepPurple, grey } from '@material-ui/core/colors';
import {
  
} from '@material-ui/core';
import GetMe from './getMe';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: grey
  },
  status: {
    danger: orange
  },
  root: {
  }
})

const useStyles = makeStyles(theme => ({
    root: {
      padding: '15px'
    }
}));


function App() {
    const classes = useStyles();

    return (
      <div className = {classes.root}>
        <Router>
          <MuiThemeProvider theme={theme}>
          <Navbar />
          <AnimatePresence exitBeforeEnter>
            <Switch>
                <ProtectedRoute exact path="/" component={Main} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/get" component={GetMe} />
            </Switch>
          </AnimatePresence>
          </MuiThemeProvider>
        </Router>
      </div>

  );
}

export default App;
