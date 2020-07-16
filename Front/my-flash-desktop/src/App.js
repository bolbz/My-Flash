import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Provider } from "react-redux";
import Notifications from "react-notify-toast";
import store from "./store";
import setAuthToken from './components/authentication/setAuthToken';
import { setCurrentUser, logoutUser, setCurrentAdmin, logoutAdmin } from './actions/authentication';
import Formulaires from "./components/authentication/Formulaires";
import LegalMentions from "./components/LegalMentions";
import HomePage from "./components/HomePage";
import Connection from "./components/authentication/Connection";
import WhatIsThisDesktop from "./components/WhatIsThisDesktop";
import Profile from "./components/Profile/Profile";
import OthersProfile from "./components/Profile/OthersProfile";
import Settings from "./components/Settings";
import ForgotPassword from './components/forgotAndResetPassword/ForgotPassword';
import ConfirmEmail from "./components/authentication/Confirm-email";
import MailWasSend from "./components/authentication/MailWasSend";
import ConfirmEmailFail from "./components/authentication/ConfirmEmailFail";
import ResetPassword from "./components/forgotAndResetPassword/ResetPassword";
import ConnectAdmin from "./components/AdminProfil/ConnectAdmin";
import Admin from "./components/AdminProfil/Admin";
import Footer from "./components/Footer1";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}


/********** Session pour rester conencter partie Admin  **************/

if(localStorage.jwtAdminToken) {
  setAuthToken(localStorage.jwtAdminToken);
  const decoded = jwt_decode(localStorage.jwtAdminToken);
  store.dispatch(setCurrentAdmin(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutAdmin());
  }
}
/**********************************************************************/


class App extends React.Component {
  
  render() {
    return (
      // Provider permet de relier notre store à notre application react
      <Provider store={store}>
        <Notifications />
        <Router>
          <div className="App">
            <Route path="/" exact component={HomePage} />
            <Route path="/connection" component={Connection} />
            <Route path="/connection-admin" component={ConnectAdmin} />
            <Route path="/editer-profile" component={Profile} />
            <Route path="/editer-profile-general" component={Profile} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/inscription" component={Formulaires} />
            <Route path="/legalMentions" component={LegalMentions} />
            <Route path="/description" component={WhatIsThisDesktop} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/confirm/:token" component={ConfirmEmail} />
            <Route path="/mailwassend" component={MailWasSend} />
            <Route path="/confirmemailfail" component={ConfirmEmailFail} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route path='/admin' component={Admin} />
            <Route path="/chip/:chipId" component={OthersProfile} />
          </div>
        </Router>
        {!window.location.pathname.includes("admin") &&
          <Footer />
        }
      </Provider>
    );
  }
}

export default App;

