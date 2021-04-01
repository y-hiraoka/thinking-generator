import { Redirect, Route, RouteProps } from "react-router-dom";
import { useIsAlreadySignedIn } from "../state/user";

export const PrivateRoute: React.VFC<RouteProps> = ({ children, ...props }) => {
  const userIsSignedIn = useIsAlreadySignedIn();

  return (
    <Route
      {...props}
      children={userIsSignedIn ? children : <Redirect to="/signin" />}
    />
  );
};
