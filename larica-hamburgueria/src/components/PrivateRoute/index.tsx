import React, { useEffect, useRef } from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  component: any;
  path: any;
  rest?: any;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  path,
  ...rest
}) => {
  const { currentUser }: any = useAuth();

  return (
    <Route
      {...rest}
      path={path}
      render={(props): any => {
        return currentUser && currentUser.admin ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
