import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignIn from "./Screens/Login";
import { Provider } from "react-redux";
import store from "./store";
import SplashScreen from "./Screens/SplashScreen";
import Home from "./Screens/Home";
import { setUser } from "./Actions/AuthActions";
import Notfound from "./Screens/404";
import ForgotPassword from "./Screens/ForgotPassword";
import DatePickerPage from "./Screens/Test";
import Dashboard from "./Screens/Dashboard";
import OfferList from "./Screens/OfferList";
import OfferDashboard from "./Screens/OfferDashboard";

export default class App extends Component {
  state = {
    isLogin: null
  };

  componentDidMount() {
    const user = localStorage.getItem("currentUser");

    if (user) {
      store.dispatch(setUser(JSON.parse(user)));
      setTimeout(() => {
        this.setState({ isLogin: true });
      }, 1000);
    } else {
      this.setState({ isLogin: false });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {this.state.isLogin == null ? (
              <Route exact path="/" component={SplashScreen} />
            ) : !this.state.isLogin ? (
              <Route exact path="/" component={SignIn} />
            ) : (
              <Route exact path="/" component={Dashboard} />
            )}
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/test" component={DatePickerPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/offers" component={OfferDashboard} />
            <Route exact component={Notfound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
