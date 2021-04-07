import { useUser } from "../state/user";
import { Redirect } from "./Redirect";

export const AuthRequired: React.FC = ({ children }) => {
  const user = useUser();

  if (user === undefined) return <div>loading...</div>;

  if (user === null) return <Redirect to="/signin" />;

  return <>{children}</>;
};
