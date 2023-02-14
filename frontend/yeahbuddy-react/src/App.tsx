import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { HomePage } from "./layouts/HomePage/HomePage";
import { MealsPage } from "./layouts/MealsPage/MealsPage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./auth/LoginWidget";
import { UserInfoForm } from "./layouts/UserInfoForm/UserInfoForm";
import { AddMealsPage } from "./layouts/AddMealPage/AddMealPage";
import { EditProfile } from "./layouts/Profile/EditProfile"
import { Profile } from "./layouts/Profile/Profile";


const oktaAuth = new OktaAuth(oktaConfig);

function App() {

  const customAuthHandler = () => {
    history.push("/login");
  };

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originUri: any) => {
    history.replace(toRelativeUrl(originUri || "/", window.location.origin));
  };

  return (
    <div
      className="cover-container d-flex flex-column min-vh-100"
      id="home-container"
    >
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage auth={oktaAuth}/>
            </Route>
            <Route path="/meals">
              <MealsPage />
            </Route>
            <Route path="/user-info">
              <UserInfoForm />
            </Route>
            <Route path="/add-meal">
              <AddMealsPage />
            </Route>
            <Route path="/edit-profile">
              <EditProfile auth={oktaAuth}/>
            </Route>
            <Route path="/profile">
              <Profile auth={oktaAuth}/>
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
