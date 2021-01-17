import "../styles/App.css";
import "../styles/Navbar.css";
import React from "react";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch"
import PrivateRoute from "./PrivateRoute"
import Sports from "../components/Sports";
import SportTeams from "../components/SportTeams";

export default function Header({ isLoggedIn, setLoginStatus, loginMsg }) {

  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/sports">
            Sports
          </NavLink>
        </li>
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/teams">
                Teams
              </NavLink>
            </li>
          </React.Fragment>
        {roles.includes("admin") && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/admin">
                Admin
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li>
          <NavLink activeClassName="selected" to="/login">
            {loginMsg}
          </NavLink>
        </li>
        {!isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li style={{ float: "right", color: "white", marginRight: "20px" }}>
          {user}
          <br />
          {roles}
        </li>
      </ul>

      <Switch>
      {/* for deployment */}
        <Route path="/frontend-exam">
          <Redirect to="/" />
        </Route>

        <Route path="/sports">
          <Sports roles={roles}/>
        </Route>

        <Route path="/teams">
          <SportTeams roles={roles}/>
        </Route>

        <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login
            setLoginStatus={setLoginStatus}
            isLoggedIn={isLoggedIn}
            loginMsg={loginMsg}
          />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route>
           <NoMatch />
        </Route>

      </Switch>
    </div>
  );
}
