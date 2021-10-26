import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/LoginRegister/Login";
import SignUp from "./pages/LoginRegister/SignUp";
import Header from "./components/Header";
import TodoBoard from "./pages/TodoBoard/TodoBoard";

type PrivateRouteProps = {
  component: JSX.Element;
  authed: boolean;
  path: string;
  redirect: string;
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <Header />
      <TodoBoard />
    </>
  );
};

const PrivateRoute = ({
  authed,
  component,
  path,
  redirect,
}: PrivateRouteProps) => {
  return (
    <Route
      render={() =>
        authed === true ? component : <Redirect to={{ pathname: redirect }} />
      }
      path={path}
    />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <div style={{ fontFamily: "roboto" }}>
          <PrivateRoute
            authed={sessionStorage.getItem("jwt") === null}
            path="/signup"
            redirect="/"
            component={<SignUpPage />}
          />
          <PrivateRoute
            authed={sessionStorage.getItem("jwt") === null}
            path="/login"
            redirect="/"
            component={<LoginPage />}
          />
          <PrivateRoute
            authed={sessionStorage.getItem("jwt") !== null}
            path="/"
            redirect="/login"
            component={<MainPage />}
          />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
