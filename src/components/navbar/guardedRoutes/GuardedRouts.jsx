import { Route, useNavigate } from "react-router-dom";

function GuardedRoutes({ component: Component, allowedRoles, userRole, ...rest }) {
    const navigate = useNavigate();

    return (
        <Route
          {...rest}
          render={(props) => {
            if (allowedRoles.includes(userRole)) {
              return <Component {...props} />;
            } else if (!userRole) {
                navigate("/login")
                return null;
            } else {
                navigate("/unauthorized")
                return null;
            }
          }}
        />
      );
};

export default GuardedRoutes;
