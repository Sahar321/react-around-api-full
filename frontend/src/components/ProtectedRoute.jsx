import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from './Loading';
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        !props.isAppInit ? (
          props.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        ) : (
          <Loading />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
