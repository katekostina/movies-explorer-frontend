import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ redirectTo, hasPermission, children }) {
  return (
    <Route>
      {() => (hasPermission ? children : <Redirect to={redirectTo} />)}
    </Route>
  );
}

export default ProtectedRoute;
