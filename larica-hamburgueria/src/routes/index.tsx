import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";

import Ecommerce from "../pages/Ecommerce";

const Routes: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Ecommerce} />
    </Switch>
  );
};

export default Routes;
