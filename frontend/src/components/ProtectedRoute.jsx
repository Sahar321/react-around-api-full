import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { loginState } from '../constant/enums/loginState';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
{/*       loggedIn === loginState.LOGGED_IN && <Component {...props} />; loggedIn
      === loginState.LOGGED_OUT && <Redirect to="/signin" />; loggedIn ===
      loginState.PENDING && <Loading />; */}
         {() =>
    
          props.loggedIn ===  loginState.LOGGED_IN ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        
      }
    </Route>
  );
};

export default withRouter(ProtectedRoute);
