import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardAdmin from "./components/DashboardAdmin";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import Login from "./components/Login";

const App = () => {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
