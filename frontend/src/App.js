import { ThemeProvider } from "@mui/material";
import lang from 'i18next'
import { initReactI18next } from 'react-i18next'
import { grey } from '@mui/material/colors';
import Posts from './pages/Posts'
import Add from './pages/Add'
import Start from './pages/Start'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import NotFound from './pages/not-found'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React, { Suspense, Component } from 'react'
import { createTheme } from '@mui/material/styles'


import authService from "./services/auth-service";
import translationsPl from "./language/translationPl.json"
import translationsEn from "./language/translationEn.json"


lang
  .use(initReactI18next)
  .init( {
    resources: {
      pl: { translation: translationsPl },
      en: { translation: translationsEn }
    },
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: { escapeValue: false }
  });

const theme = createTheme({
  palette: {
    primary: {
      main: grey[100],
    },
    secondary: {
      main: grey[800],
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.state = {
      loggedIn: authService.loggedIn(),
      language: ""
    };
    lang.changeLanguage(localStorage.getItem("lang"))
  }

  onChangeLanguage(e) {
    e.preventDefault();
    localStorage.setItem("lang", e.target.value)
    window.location.reload();
  }

  render() {
    return(
      <Suspense fallback="Loading..." >
      <>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.loggedIn ? <Redirect to="/posts" /> : <Start />}
            </Route>
            <Route path="/login">
              {this.state.loggedIn ? <Redirect to="/profile" /> : <Login />}
            </Route>
            <Route path="/sign-up">
              {this.state.loggedIn ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/contact-us">
              <ContactUs />
            </Route>
            <Route path="/add">
              {!this.state.loggedIn ? <Redirect to="/login" /> : <Add />}
            </Route>
            <Route path="/profile">
              {!this.state.loggedIn ? <Redirect to="/" /> : <Profile />}
            </Route>
            <Route path="/profileedit">
              {!this.state.loggedIn ? <Redirect to="/" /> : <ProfileEdit />}
            </Route>
            <Route path="/posts">
              {!this.state.loggedIn ? <Redirect to="/" /> : <Posts />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
        <select defaultValue={'DEFAULT'} name="language" onChange={this.onChangeLanguage}>
          <option value="pl">Polski</option>
          <option value="en">English</option>
          <option disabled value="DEFAULT">{lang.t('selectLang')} </option>
        </select>
      </ThemeProvider>
    </>
    </Suspense>
    );
  }
}
