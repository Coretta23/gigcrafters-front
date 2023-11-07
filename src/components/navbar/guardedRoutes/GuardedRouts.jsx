import { Route, Redirect } from "react-router-dom";

function GuardedRoutes({ component: Component, allowedRoles, userRoles, ...rest }) {
    return (
        <Route
          {...rest}
          render={(props) => {
            if (userRoles.some((role) => allowedRoles.includes(role))) {
              return <Component {...props} />;
            } else if (!userRoles) {
                return <Redirect to="/login" />;
            } else {
              return <Redirect to="/unauthorized" />;
            }
          }}
        />
      );
};

export default GuardedRoutes;
